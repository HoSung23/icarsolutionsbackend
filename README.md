# iCarSolutions - Plataforma de Venta de Vehículos

Proyecto full-stack para la venta y gestión de vehículos con panel administrativo, generación de cotizaciones PDF e integración con WhatsApp.

## 🏗️ Arquitectura

- **Backend**: Node.js + Express + TypeScript
- **Frontend**: Astro + React + Tailwind CSS
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth con roles (Admin, Vendedor, Gerente)
- **PDF**: jsPDF para cotizaciones

## 📁 Estructura del Proyecto

```
icarsolutions/
├── backend/
│   ├── src/
│   │   ├── index.ts              # Punto de entrada
│   │   ├── config/               # Configuración (Supabase, Logger)
│   │   ├── controllers/          # Lógica de controladores
│   │   ├── middlewares/          # Auth, validación, manejo de errores
│   │   ├── routes/               # Rutas de la API
│   │   └── services/             # Lógica de negocio
│   ├── migrations/               # Scripts SQL de Supabase
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/           # Componentes React reutilizables
    │   ├── layouts/              # Layouts Astro
    │   ├── pages/                # Páginas (rutas estáticas/dinámicas)
    │   ├── styles/               # CSS global y estilos
    │   └── utils/                # Funciones utilitarias
    ├── astro.config.mjs
    ├── package.json
    └── .env.example
```

## 🚀 Instalación

### Requisitos
- Node.js 18+
- npm o pnpm
- Cuenta de Supabase

### 1. Configurar Supabase

1. Crea un nuevo proyecto en [supabase.com](https://supabase.com)
2. En el SQL Editor de Supabase, ejecuta los scripts en orden:
   - `migrations/001_initial_schema.sql` - Crea tablas y políticas RLS
   - `migrations/002_seed_vehicles.sql` - Inserta datos de ejemplo

3. Obtén tus credenciales:
   - URL del proyecto: Settings > API > URL
   - Anon Key: Settings > API > Anon Key (public)
   - Service Role Key: Settings > API > Service Role Key (solo servidor)

### 2. Configurar Backend

```bash
cd icarsolutions/backend

# Copiar archivo de entorno
cp .env.example .env

# Editar .env con tus credenciales de Supabase
nano .env
```

Variables requeridas en `.env`:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
WHATSAPP_PHONE_NUMBER=502XXXXXXXX
```

Instalar dependencias:
```bash
npm install
```

Iniciar servidor:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### 3. Configurar Frontend

```bash
cd icarsolutions/frontend

# Copiar archivo de entorno
cp .env.example .env

# Editar .env con tus credenciales
nano .env
```

Variables requeridas en `.env`:
```
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
PUBLIC_API_URL=http://localhost:3000
PUBLIC_WHATSAPP_PHONE=502XXXXXXXX
```

Instalar dependencias:
```bash
npm install
```

Iniciar servidor de desarrollo:
```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000` (Astro)

## 📚 API Endpoints

### Vehículos

```
GET    /api/vehicles                    # Listar con filtros y paginación
GET    /api/vehicles/:id                # Obtener detalle
POST   /api/vehicles                    # Crear (requiere Auth)
PUT    /api/vehicles/:id                # Actualizar (requiere Auth)
DELETE /api/vehicles/:id                # Eliminar (requiere Auth, Admin)
PATCH  /api/vehicles/:id/status         # Cambiar estado
```

**Parámetros de filtro en GET /api/vehicles:**
- `marca` - Filtrar por marca (case-insensitive)
- `minPrice` - Precio mínimo
- `maxPrice` - Precio máximo
- `año` - Año modelo
- `combustible` - Tipo de combustible
- `transmision` - Tipo de transmisión
- `estado` - Estado (disponible, vendido, reservado)
- `page` - Número de página (default: 1)
- `pageSize` - Resultados por página (default: 10)

### Cotizaciones

```
POST   /api/cotizaciones                # Crear cotización
GET    /api/cotizaciones                # Listar cotizaciones del usuario
GET    /api/cotizaciones/:id/pdf        # Descargar PDF
```

**Body para POST /api/cotizaciones:**
```json
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
```

## 🎨 Diseño

- **Paleta de colores**: Azul (#1e40af), Naranja (#f97316), Gris oscuro (#1f2937)
- **Formas geométricas**: Uso de `clip-path` para triángulos
- **Responsive**: Diseño mobile-first con Tailwind CSS
- **Animaciones**: Transiciones suaves en hover

## 🔐 Autenticación y Autorización

El sistema usa **Supabase Auth** con roles:

- **Admin**: Acceso total (crear, editar, eliminar vehículos)
- **Vendedor**: Crear/editar vehículos, generar cotizaciones
- **Gerente**: Ver reportes y estadísticas

El middleware `verifyAuth` verifica el JWT del token
El middleware `verifyRole` verifica los permisos según el rol

## 📄 Generación de PDF

Las cotizaciones se generan automáticamente como PDF con:
- Logo de iCarSolutions
- Datos del cliente
- Desglose de costos
- Total a pagar
- Fecha de generación

## 🔄 Integración WhatsApp

Cada vehículo tiene un botón que abre WhatsApp con un mensaje pre-llenado:

```
Hola, estoy interesado en el [Marca] [Modelo] [Año] con precio de $[precio]. ¿Está disponible?
```

Usa el número configurado en `WHATSAPP_PHONE_NUMBER`

## 📊 Base de Datos

### Tabla vehicles
- Información completa del vehículo
- Estados: disponible, vendido, reservado
- Galería de imágenes
- Timestamps de creación/actualización

### Tabla users
- Extensión de Supabase Auth
- Rol del usuario
- Nombre y email

### Tabla cotizaciones
- Relación con vehículo y usuario
- Items desglosados en JSON
- Datos del cliente

## 🛠️ Scripts Útiles

```bash
# Backend
npm run dev       # Iniciar en modo desarrollo
npm run build     # Compilar TypeScript
npm start         # Ejecutar compilado
npm run migrate   # Ejecutar migraciones

# Frontend
npm run dev       # Iniciar servidor Astro
npm run build     # Compilar para producción
npm run preview   # Vista previa de compilación
```

## 📦 Dependencias Principales

### Backend
- **express** - Framework web
- **@supabase/supabase-js** - Cliente de Supabase
- **zod** - Validación de datos
- **winston** - Logging
- **jspdf** - Generación de PDFs
- **express-rate-limit** - Rate limiting

### Frontend
- **astro** - Framework estático
- **react** - Componentes interactivos
- **tailwindcss** - Estilos CSS
- **@supabase/supabase-js** - Cliente de Supabase

## 🚀 Deployment

### Backend (Vercel, Render, Railway, etc.)

1. Push a GitHub/GitLab
2. Conectar repositorio al servicio de hosting
3. Configurar variables de entorno
4. Deploy automático

### Frontend (Netlify, Vercel, etc.)

1. Push a GitHub/GitLab
2. Conectar repositorio
3. Comando build: `npm run build`
4. Deploy automático

## 📝 Notas de Desarrollo

- Los componentes React están optimizados para Astro usando `client:load`
- El archivo `helpers.ts` contiene funciones reutilizables
- Los estilos usan Tailwind CSS con clases personalizadas
- Las políticas RLS de Supabase protegen los datos a nivel de base de datos

## 🤝 Contribuir

Las mejoras y sugerencias son bienvenidas.

## 📄 Licencia

MIT
