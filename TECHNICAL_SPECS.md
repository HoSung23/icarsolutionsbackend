# ESPECIFICACIONES TÉCNICAS - iCarSolutions

Documento de referencia técnica completa del proyecto.

---

## 🏗️ Arquitectura

### Patrón MVC Mejorado

```
Request
  ↓
Router (routes/) → Valida ruta
  ↓
Middleware (middlewares/) → Auth, validación
  ↓
Controller (controllers/) → Lógica HTTP
  ↓
Service (services/) → Lógica de negocio
  ↓
Database (Supabase) → Persiste datos
  ↓
Response (JSON)
```

### Componentes Principales

| Capa | Componente | Responsabilidad |
|------|-----------|-----------------|
| **Presentación** | Astro/React | UI, interacción usuario |
| **API** | Express | Rutas, controladores |
| **Lógica** | Services | Reglas de negocio |
| **Datos** | Supabase | Persistencia, auth |

---

## 📦 Dependencias

### Backend

```json
{
  "@supabase/supabase-js": "^2.38.0",    // Cliente SQL/Auth
  "express": "^4.18.2",                   // Framework web
  "cors": "^2.8.5",                       // CORS middleware
  "dotenv": "^16.3.1",                    // Variables de entorno
  "zod": "^3.22.4",                       // Validación de esquemas
  "winston": "^3.11.0",                   // Logging
  "jspdf": "^2.5.1",                      // Generación de PDFs
  "express-rate-limit": "^7.1.5"          // Rate limiting
}
```

### Frontend

```json
{
  "@supabase/supabase-js": "^2.38.0",    // Cliente Supabase
  "astro": "^4.0.0",                      // Framework Astro
  "react": "^18.2.0",                     // Componentes React
  "react-dom": "^18.2.0",                 // ReactDOM
  "tailwindcss": "^3.3.6"                 // Estilos CSS
}
```

---

## 🗄️ Base de Datos - Schema SQL

### Tabla: vehicles

```sql
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marca TEXT NOT NULL,              -- Toyota, Honda, etc.
  modelo_año TEXT NOT NULL,         -- 2023, 2022, etc.
  cilindraje TEXT NOT NULL,         -- 1800cc, 2000cc, etc.
  linea TEXT NOT NULL,              -- Corolla, CR-V, etc.
  origen TEXT NOT NULL,             -- Japón, USA, etc.
  motor TEXT NOT NULL,              -- V4, V6, etc.
  combustible TEXT NOT NULL,        -- Gasolina, Diésel
  transmision TEXT NOT NULL,        -- Manual, Automática
  marchas TEXT NOT NULL,            -- 5, 6 velocidades
  recorrido INTEGER NOT NULL,       -- Kilómetros
  accesorios TEXT[] DEFAULT '{}',   -- Array de strings
  precio DECIMAL(15, 2) NOT NULL,   -- $15,000.00
  imagenes TEXT[] DEFAULT '{}',     -- URLs de imágenes
  estado vehicle_status DEFAULT 'disponible',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Índices
CREATE INDEX idx_vehicles_estado ON vehicles(estado);
CREATE INDEX idx_vehicles_marca ON vehicles(marca);
CREATE INDEX idx_vehicles_precio ON vehicles(precio);
```

### Tabla: users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  rol user_role DEFAULT 'vendedor',
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Índice
CREATE INDEX idx_users_email ON users(email);
```

### Tabla: cotizaciones

```sql
CREATE TABLE cotizaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id),
  cliente_nombre TEXT NOT NULL,
  cliente_email TEXT NOT NULL,
  cliente_telefono TEXT NOT NULL,
  items JSONB NOT NULL,             -- [{"concepto": "...", "monto": 1000}]
  total DECIMAL(15, 2) NOT NULL,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now()
);

-- Índices
CREATE INDEX idx_cotizaciones_created_by ON cotizaciones(created_by);
CREATE INDEX idx_cotizaciones_vehicle_id ON cotizaciones(vehicle_id);
CREATE INDEX idx_cotizaciones_created_at ON cotizaciones(created_at);
```

### Enumeraciones

```sql
CREATE TYPE vehicle_status AS ENUM ('disponible', 'vendido', 'reservado');
CREATE TYPE user_role AS ENUM ('admin', 'vendedor', 'gerente');
```

---

## 🔐 Autenticación & Autorización

### JWT Token Flow

```
1. Cliente login
   ├─ POST /auth/login (Supabase)
   ├─ Supabase valida credenciales
   └─ Retorna JWT token

2. Cliente realiza request
   ├─ Adjunta token en header: Authorization: Bearer <token>
   ├─ Backend recibe request
   └─ Ejecuta verifyAuth middleware

3. verifyAuth middleware
   ├─ Extrae token del header
   ├─ Llama supabaseClient.auth.getUser(token)
   ├─ Supabase valida JWT
   ├─ Retorna usuario si es válido
   └─ Adjunta user al request

4. verifyRole middleware
   ├─ Consulta tabla users
   ├─ Obtiene rol del usuario
   ├─ Verifica si rol está en allowedRoles
   ├─ Si sí: continúa
   └─ Si no: 403 Forbidden

5. Route handler
   ├─ Ejecuta lógica protegida
   └─ Retorna respuesta
```

### RLS Policies en Supabase

```sql
-- Vehículos: Públicamente legibles, solo admin puede escribir
CREATE POLICY "Vehículos legibles por todos" 
  ON vehicles FOR SELECT 
  USING (true);

CREATE POLICY "Solo admin puede crear vehículos" 
  ON vehicles FOR INSERT 
  WITH CHECK (auth.uid() IN (
    SELECT id FROM users WHERE rol = 'admin'
  ));

-- Cotizaciones: Usuario ve solo sus cotizaciones
CREATE POLICY "Los usuarios ven sus propias cotizaciones" 
  ON cotizaciones FOR SELECT 
  USING (
    auth.uid() = created_by 
    OR auth.uid() IN (SELECT id FROM users WHERE rol = 'admin')
  );
```

---

## 🔌 API Endpoints

### Vehículos

**GET /api/vehicles**
```
Parámetros:
  - marca? (string)
  - minPrice? (number)
  - maxPrice? (number)
  - año? (string)
  - combustible? (string)
  - transmision? (string)
  - estado? (string)
  - page? (number, default: 1)
  - pageSize? (number, default: 10)

Respuesta (200):
{
  "data": [Vehicle],
  "total": number,
  "page": number,
  "pageSize": number
}

Sin requerimientos de auth
```

**GET /api/vehicles/:id**
```
Respuesta (200):
{
  "id": "uuid",
  "marca": "Toyota",
  "modelo_año": "2023",
  ...
}

Error (404): Vehicle not found
```

**POST /api/vehicles** (Requiere Auth + Role: admin|vendedor)
```
Body:
{
  "marca": "Toyota",
  "modelo_año": "2023",
  "cilindraje": "1800cc",
  "linea": "Corolla",
  "origen": "Japón",
  "motor": "V4",
  "combustible": "Gasolina",
  "transmision": "Automática",
  "marchas": "6",
  "recorrido": 15000,
  "accesorios": ["Aire acondicionado"],
  "precio": 18500,
  "imagenes": ["url1", "url2"],
  "estado": "disponible"
}

Respuesta (201): Vehicle creado
Error (400): Validación falló
Error (401): No autenticado
Error (403): Sin permisos
```

**PUT /api/vehicles/:id** (Requiere Auth + Role: admin|vendedor)
```
Body: { ...campos a actualizar }
Respuesta (200): Vehicle actualizado
```

**DELETE /api/vehicles/:id** (Requiere Auth + Role: admin)
```
Respuesta (200): { "success": true }
```

**PATCH /api/vehicles/:id/status** (Requiere Auth)
```
Body: { "estado": "vendido" | "disponible" | "reservado" }
Respuesta (200): Vehicle con estado actualizado
```

### Cotizaciones

**POST /api/cotizaciones** (Requiere Auth)
```
Body:
{
  "vehicle_id": "uuid",
  "cliente_nombre": "Juan Pérez",
  "cliente_email": "juan@example.com",
  "cliente_telefono": "+502 1234 5678",
  "items": [
    {"concepto": "Precio vehículo", "monto": 20000},
    {"concepto": "Trámites", "monto": 500}
  ],
  "total": 20500
}

Respuesta (201): Cotización creada
```

**GET /api/cotizaciones** (Requiere Auth)
```
Parámetros:
  - startDate? (ISO string)
  - endDate? (ISO string)
  - page? (number)
  - pageSize? (number)

Respuesta (200):
{
  "data": [Quote],
  "total": number,
  "page": number,
  "pageSize": number
}
```

**GET /api/cotizaciones/:id/pdf** (Requiere Auth)
```
Respuesta (200): PDF file (application/pdf)
Header: Content-Disposition: attachment; filename="cotizacion-{id}.pdf"
```

---

## 📊 Validación de Datos (Zod)

### Vehicle Schema

```typescript
const vehicleSchema = z.object({
  marca: z.string().min(1),
  modelo_año: z.string().min(1),
  cilindraje: z.string(),
  linea: z.string(),
  origen: z.string(),
  motor: z.string(),
  combustible: z.string(),
  transmision: z.string(),
  marchas: z.string(),
  recorrido: z.number().int(),
  accesorios: z.array(z.string()).optional(),
  precio: z.number().positive(),
  imagenes: z.array(z.string()).optional(),
  estado: z.enum(["disponible", "vendido", "reservado"]).optional(),
});
```

### Quote Schema

```typescript
const quoteSchema = z.object({
  vehicle_id: z.string().uuid(),
  cliente_nombre: z.string().min(1),
  cliente_email: z.string().email(),
  cliente_telefono: z.string().min(1),
  items: z.array(z.object({
    concepto: z.string(),
    monto: z.number().positive(),
  })),
  total: z.number().positive(),
});
```

---

## 🎨 Componentes React

### Hero.tsx

```typescript
interface HeroProps {
  phoneNumber?: string;
}

export const Hero: React.FC<HeroProps> = ({ phoneNumber = "502XXXXXXXX" })
// Props:
// - phoneNumber: Número de WhatsApp para contacto
```

### VehicleCard.tsx

```typescript
interface Vehicle {
  id: string;
  marca: string;
  modelo_año: string;
  cilindraje: string;
  precio: number;
  combustible: string;
  transmision: string;
  imagenes: string[];
  estado: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  whatsappPhone: string;
}

export const VehicleCard: React.FC<VehicleCardProps>
// Muestra: Imagen, especificaciones, precio, botones de acción
```

### FilterPanel.tsx

```typescript
interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
}

export const FilterPanel: React.FC<FilterPanelProps>
// Filtros: Marca, precio min/max, combustible, transmisión, estado
```

---

## 🔒 Middleware

### verifyAuth

```typescript
// Uso: router.get('/protected', verifyAuth, handler)
// 1. Extrae JWT del header Authorization
// 2. Valida con Supabase
// 3. Adjunta user al request
// 4. Si token inválido: 401 Unauthorized
```

### verifyRole

```typescript
// Uso: router.post('/admin', verifyAuth, verifyRole(['admin']), handler)
// 1. Verifica que user está autenticado
// 2. Consulta rol del usuario en BD
// 3. Compara con allowedRoles
// 4. Si no coincide: 403 Forbidden
```

### validateRequest

```typescript
// Uso: router.post('/create', validateRequest(schema), handler)
// 1. Valida request.body contra Zod schema
// 2. Si falla: 400 Bad Request con detalles
// 3. Si pasa: continúa con body validado
```

### errorHandler

```typescript
// Uso: app.use(errorHandler)
// 1. Captura todos los errores no manejados
// 2. Loguea en Winston
// 3. Retorna JSON con error
// 4. En dev: incluye stack trace
// 5. En prod: error genérico
```

---

## 📈 Performance

### Índices de Base de Datos

```sql
-- Búsquedas frecuentes
CREATE INDEX idx_vehicles_estado ON vehicles(estado);
CREATE INDEX idx_vehicles_marca ON vehicles(marca);
CREATE INDEX idx_vehicles_precio ON vehicles(precio);

-- Relaciones
CREATE INDEX idx_cotizaciones_created_by ON cotizaciones(created_by);
CREATE INDEX idx_cotizaciones_vehicle_id ON cotizaciones(vehicle_id);
CREATE INDEX idx_cotizaciones_created_at ON cotizaciones(created_at);
```

### Rate Limiting

```typescript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutos
  max: 100                    // 100 requests por ventana
});

app.use(limiter);  // Aplicado globalmente
```

### Paginación

```typescript
// GET /api/vehicles?page=1&pageSize=10
const from = (page - 1) * pageSize;
const to = from + pageSize - 1;
const { data, count } = await query.range(from, to);
```

---

## 🛡️ Seguridad

### Headers CORS

```typescript
app.use(cors());
// Permite requests desde cualquier origen en desarrollo
// En producción: whitelist específico
```

### Validación de Input

```typescript
// Todos los inputs validados con Zod
const userInput = schema.parse(req.body);  // Throws si falla
```

### JWT Verification

```typescript
const { data: { user }, error } = 
  await supabaseClient.auth.getUser(token);
// Valida firma y expiración del token
```

### SQL Injection Prevention

```typescript
// Usando Supabase client, no raw SQL
await supabaseClient
  .from('vehicles')
  .select()
  .eq('marca', userInput.marca);  // Parametrizado automáticamente
```

---

## 📝 Logging

### Winston Logger

```typescript
logger.info('User logged in', { userId: '123' });
logger.error('Database error', error);
logger.warn('Rate limit approaching', { remoteIP: '1.2.3.4' });
```

### Niveles

```
error:   Errores críticos
warn:    Advertencias
info:    Información general
debug:   Detalles para debugging
```

### Archivos

```
error.log       → Solo errores
combined.log    → Todos los logs
console         → En desarrollo
```

---

## 🧪 Testing

### Endpoints con curl

```bash
# Listar vehículos
curl http://localhost:3000/api/vehicles

# Con filtros
curl "http://localhost:3000/api/vehicles?marca=Toyota&minPrice=10000"

# Crear vehículo (con token)
curl -X POST http://localhost:3000/api/vehicles \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{...}'

# Health check
curl http://localhost:3000/api/health
```

---

## 🌍 Variables de Entorno

### Backend

```
PORT=3000                                 # Puerto servidor
NODE_ENV=development|production           # Entorno
SUPABASE_URL=https://project.supabase.co # URL BD
SUPABASE_ANON_KEY=...                    # Clave pública
SUPABASE_SERVICE_ROLE_KEY=...            # Clave privada
WHATSAPP_PHONE_NUMBER=502XXXXXXXX        # Número WhatsApp
LOG_LEVEL=info|debug|error                # Nivel logs
```

### Frontend

```
PUBLIC_SUPABASE_URL=https://...          # URL BD
PUBLIC_SUPABASE_ANON_KEY=...             # Clave pública
PUBLIC_API_URL=http://localhost:3000     # URL backend
PUBLIC_WHATSAPP_PHONE=502XXXXXXXX        # Número WhatsApp
```

---

## 📦 Build Output

### Backend

```
dist/
├── index.js
├── config/
├── controllers/
├── middlewares/
├── routes/
└── services/

package.json
node_modules/
```

### Frontend

```
dist/
├── index.html
├── _astro/
├── _assets/
├── admin/
└── vehiculos/

package.json
node_modules/
```

---

## 🔄 Development Workflow

```
1. Modificar código fuente
2. Nodemon/Astro recompila automáticamente
3. Navegador refresh automático (HMR)
4. Ver cambios en tiempo real
5. Commit a GitHub
6. Deploy automático (CI/CD)
7. Testing en producción
```

---

## 📊 Métricas Técnicas

| Métrica | Valor |
|---------|-------|
| Endpoints API | 7 |
| Tablas BD | 3 |
| Componentes React | 3 |
| Páginas Astro | 4 |
| Middlewares | 4 |
| Controllers | 2 |
| Services | 2 |
| TypeScript strictness | Máxima |
| Test coverage | Preparado |

---

## 🔮 Arquitectura Futura

```
Microservicios
├── API Gateway
├── Auth Service
├── Vehicle Service
├── Quote Service
└── Notification Service

Message Queue (RabbitMQ, Kafka)
├── Email notifications
├── SMS notifications
└── Audit logs

Cache Layer (Redis)
├── Vehicle cache
├── User sessions
└── Rate limit counters

Search Engine (Elasticsearch)
└── Búsqueda rápida de vehículos
```

---

Documento actualizado: Diciembre 4, 2024
