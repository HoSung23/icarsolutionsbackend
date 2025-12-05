# DIAGRAMA DEL SISTEMA - iCarSolutions

## Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                         WEB BROWSER                              │
│                    (User - Public Side)                          │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTPS
                                 ▼
            ┌────────────────────────────────────────┐
            │     FRONTEND (Astro + React)           │
            │  - Pages: index, vehiculos/[id]        │
            │  - Components: Hero, FilterPanel,      │
            │    VehicleCard                         │
            │  - Styles: Tailwind CSS                │
            │  - Port: 3000                          │
            └────────────────────┬───────────────────┘
                                 │ API Calls
                                 ▼
            ┌────────────────────────────────────────┐
            │    BACKEND (Node.js + Express)         │
            │  - Routes: /api/vehicles               │
            │           /api/cotizaciones            │
            │  - Controllers: vehicleController,     │
            │                 quoteController        │
            │  - Services: VehicleService,           │
            │              QuoteService              │
            │  - Middleware: auth, validation,       │
            │                errorHandler            │
            │  - Port: 3000                          │
            └────────────────────┬───────────────────┘
                                 │ API Requests
                                 ▼
            ┌────────────────────────────────────────┐
            │   SUPABASE (PostgreSQL + Auth)         │
            │  - Tables: vehicles, users,            │
            │            cotizaciones                │
            │  - Auth: JWT Token Verification        │
            │  - RLS: Row Level Security Policies    │
            └────────────────────────────────────────┘
```

## Flujo de Datos - Página Pública

```
1. Usuario accede a http://localhost:3000
2. Astro renderiza Layout.astro
3. Hero component se carga con client:load
4. FilterPanel component se carga con client:load
5. JavaScript fetch GET /api/vehicles
6. Backend verifica y accede a Supabase
7. Supabase aplica RLS policies y retorna datos
8. Frontend renderiza VehicleCard por cada vehículo
9. Usuario puede filtrar, ver detalles o clickear WhatsApp
```

## Flujo de Datos - Crear Cotización (Admin)

```
1. Admin accede a /admin
2. Selecciona un vehículo
3. Llena datos del cliente
4. Añade items a la cotización
5. Hace clic en "Generar PDF"
6. POST /api/cotizaciones con Auth Header
7. Backend verifica JWT
8. Backend verifica rol (admin, vendedor)
9. Guarda cotización en Supabase
10. Backend genera PDF con jsPDF
11. Descarga el PDF al usuario
```

## Estructura de Directorios Detallada

```
icarsolutions/
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   │   └── App principal, rutas, middlewares globales
│   │   │
│   │   ├── config/
│   │   │   ├── supabase.ts (Cliente de Supabase)
│   │   │   └── logger.ts (Winston logger)
│   │   │
│   │   ├── controllers/
│   │   │   ├── vehicleController.ts
│   │   │   │   └── getAllVehicles, getVehicleById, createVehicle...
│   │   │   └── quoteController.ts
│   │   │       └── createQuote, getQuotes, getQuotePDF...
│   │   │
│   │   ├── services/
│   │   │   ├── VehicleService.ts
│   │   │   │   └── Lógica de negocio para vehículos
│   │   │   └── QuoteService.ts
│   │   │       └── Lógica de negocio para cotizaciones
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.ts (verifyAuth, verifyRole)
│   │   │   ├── validation.ts (validateRequest con Zod)
│   │   │   └── errorHandler.ts (manejo global de errores)
│   │   │
│   │   └── routes/
│   │       ├── vehicles.ts
│   │       │   └── GET /, GET /:id, POST, PUT, DELETE, PATCH /status
│   │       └── quotes.ts
│   │           └── POST, GET, GET /:id/pdf
│   │
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   │   └── Crea tablas, enums, índices, RLS policies
│   │   └── 002_seed_vehicles.sql
│   │       └── Inserta 5 vehículos de ejemplo
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── index.astro (Página principal)
    │   │   │   └── Muestra Hero + FilterPanel + Grid de vehículos
    │   │   ├── admin/
    │   │   │   └── index.astro (Panel administrativo)
    │   │   └── vehiculos/
    │   │       └── [id].astro (Página de detalle dinámico)
    │   │
    │   ├── components/
    │   │   ├── Hero.tsx (React)
    │   │   │   └── Banner superior con CTA
    │   │   ├── VehicleCard.tsx (React)
    │   │   │   └── Tarjeta de vehículo con botones
    │   │   └── FilterPanel.tsx (React)
    │   │       └── Sidebar interactivo con filtros
    │   │
    │   ├── layouts/
    │   │   └── Layout.astro
    │   │       └── Template general (nav, footer)
    │   │
    │   ├── styles/
    │   │   └── globals.css (CSS global + Tailwind)
    │   │
    │   └── utils/
    │       ├── supabase.ts (Cliente de Supabase)
    │       └── helpers.ts (Funciones WhatsApp, formateo)
    │
    ├── astro.config.mjs
    ├── tailwind.config.mjs
    ├── tsconfig.json
    ├── package.json
    └── .env.example

├── README.md (Documentación principal)
├── SETUP_INSTRUCTIONS.md (Paso a paso de setup)
└── DIAGRAMA-SISTEMA.md (Este archivo)
```

## Base de Datos - Esquema

```
┌─────────────────────────────────────┐
│          VEHICLES TABLE              │
├─────────────────────────────────────┤
│ id (UUID, PK)                       │
│ marca (TEXT)                        │
│ modelo_año (TEXT)                   │
│ cilindraje (TEXT)                   │
│ linea (TEXT)                        │
│ origen (TEXT)                       │
│ motor (TEXT)                        │
│ combustible (TEXT)                  │
│ transmision (TEXT)                  │
│ marchas (TEXT)                      │
│ recorrido (INTEGER)                 │
│ accesorios (TEXT[])                 │
│ precio (DECIMAL)                    │
│ imagenes (TEXT[])                   │
│ estado (ENUM: disponible/vendido...) │
│ created_at (TIMESTAMP)              │
│ updated_at (TIMESTAMP)              │
│ Índices: estado, marca, precio      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          USERS TABLE                │
├─────────────────────────────────────┤
│ id (UUID, FK a auth.users)          │
│ rol (ENUM: admin/vendedor/gerente) │
│ nombre (TEXT)                       │
│ email (TEXT)                        │
│ created_at (TIMESTAMP)              │
│ updated_at (TIMESTAMP)              │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      COTIZACIONES TABLE             │
├─────────────────────────────────────┤
│ id (UUID, PK)                       │
│ vehicle_id (FK to vehicles)         │
│ cliente_nombre (TEXT)               │
│ cliente_email (TEXT)                │
│ cliente_telefono (TEXT)             │
│ items (JSONB)                       │ ← Desglose de costos
│ total (DECIMAL)                     │
│ created_by (FK to users)            │
│ created_at (TIMESTAMP)              │
│ Índices: created_by, vehicle_id,    │
│          created_at                 │
└─────────────────────────────────────┘
```

## Autenticación y Autorización

```
┌────────────────┐
│  JWT Token     │
│  (Supabase)    │
└────────┬───────┘
         │
         ▼
┌──────────────────────────┐
│  verifyAuth Middleware   │
├──────────────────────────┤
│ 1. Extrae token de header
│ 2. Llama getUser(token)
│ 3. Verifica con Supabase
│ 4. Adjunta user al request
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ verifyRole Middleware    │
├──────────────────────────┤
│ 1. Obtiene rol de usuario
│ 2. Compara con allowedRoles
│ 3. Si match: continúa
│ 4. Si no match: 403 Forbidden
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  Route Handler           │
│  (Controller)            │
└──────────────────────────┘
```

## Roles y Permisos

```
┌─────────────────┬──────────┬──────────┬─────────┐
│  Acción         │  Admin   │ Vendedor │ Gerente │
├─────────────────┼──────────┼──────────┼─────────┤
│ Ver vehículos   │    ✓     │    ✓     │    ✓    │
│ Crear vehículo  │    ✓     │    ✓     │    ✗    │
│ Editar vehículo │    ✓     │    ✓     │    ✗    │
│ Eliminar vehíc. │    ✓     │    ✗     │    ✗    │
│ Crear cot.      │    ✓     │    ✓     │    ✗    │
│ Ver sus cot.    │    ✓     │    ✓     │    ✓    │
│ Ver todas cot.  │    ✓     │    ✗     │    ✓    │
│ Crear usuarios  │    ✓     │    ✗     │    ✗    │
│ Editar usuarios │    ✓     │    ✗     │    ✗    │
└─────────────────┴──────────┴──────────┴─────────┘
```

## Seguridad - RLS Policies

Supabase implementa RLS (Row Level Security) a nivel de base de datos:

```sql
-- Vehículos: Públicos para lectura, solo admin para escritura
ON vehicles:
  - SELECT: Todos pueden ver
  - INSERT: Solo usuarios con rol = 'admin'
  - UPDATE: Solo usuarios con rol = 'admin'
  - DELETE: Solo usuarios con rol = 'admin'

-- Cotizaciones: Usuario ve solo las suyas, admin ve todas
ON cotizaciones:
  - SELECT: Si auth.uid() = created_by O rol = 'admin'
  - INSERT: Si auth.uid() = created_by
  - UPDATE: No permitido
  - DELETE: No permitido

-- Users: Usuario ve su propio perfil, admin ve todos
ON users:
  - SELECT: Si auth.uid() = id O rol = 'admin'
```

## Flujo de Desarrollo

```
1. DESARROLLO LOCAL
   ├── Backend: npm run dev (puerto 3000)
   ├── Frontend: npm run dev (puerto 3000)
   └── Supabase: Live (cloud)

2. TESTING
   ├── Curl para API
   ├── Lighthouse para performance
   └── Pruebas manuales en browser

3. BUILD
   ├── Backend: npm run build → dist/
   ├── Frontend: npm run build → dist/

4. DEPLOY
   ├── Backend → Render/Railway
   ├── Frontend → Netlify/Vercel
   └── DB → Supabase (ya en cloud)
```

## Variables de Entorno

```
BACKEND (.env)
├── PORT: Puerto del servidor
├── NODE_ENV: development/production
├── SUPABASE_URL: URL del proyecto
├── SUPABASE_ANON_KEY: Clave pública
├── SUPABASE_SERVICE_ROLE_KEY: Clave privada
├── WHATSAPP_PHONE_NUMBER: +502XXXXXXXX
└── LOG_LEVEL: info/debug/error

FRONTEND (.env)
├── PUBLIC_SUPABASE_URL: URL del proyecto
├── PUBLIC_SUPABASE_ANON_KEY: Clave pública
├── PUBLIC_API_URL: http://localhost:3000
└── PUBLIC_WHATSAPP_PHONE: +502XXXXXXXX
```

## Integraciones Externas

```
┌──────────────────────────────────────────────────┐
│          SERVICIOS EXTERNOS                      │
├──────────────────────────────────────────────────┤
│                                                  │
│  1. WHATSAPP (API)                              │
│     └─ wa.me/{number}?text={message}            │
│                                                  │
│  2. SUPABASE                                    │
│     ├─ PostgreSQL (Database)                   │
│     ├─ Auth (JWT)                              │
│     ├─ Storage (Images)                        │
│     └─ Realtime (WebSockets)                   │
│                                                  │
│  3. jsPDF                                       │
│     └─ Generación de PDFs de cotizaciones      │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Notas Importantes

- ✅ RLS está habilitado en todas las tablas
- ✅ Rate limiting en API (100 requests/15 min)
- ✅ Validación de datos con Zod
- ✅ Logging centralizado con Winston
- ✅ Manejo de errores global
- ✅ TypeScript strict en todo el proyecto
- ✅ Componentes React optimizados para Astro

## Próximas Mejoras

- [ ] Autenticación completa en frontend
- [ ] Upload de imágenes a Supabase Storage
- [ ] Más componentización del admin
- [ ] Gráficos de ventas (Chart.js)
- [ ] Exportación de datos (Excel)
- [ ] Pruebas unitarias (Jest)
- [ ] CI/CD pipeline (GitHub Actions)
