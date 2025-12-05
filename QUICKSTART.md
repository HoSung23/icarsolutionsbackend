# QUICK START - iCarSolutions

## 🚀 Inicio Rápido (5 minutos)

### Requisitos previos
- Node.js 18+
- npm o pnpm
- Cuenta de Supabase (gratis)

### 1️⃣ Clonar/Descargar el proyecto

```bash
cd icarsolutions
```

### 2️⃣ Crear proyecto en Supabase (2 min)

1. Ve a https://supabase.com y crea cuenta
2. Crea nuevo proyecto "icarsolutions"
3. Espera a que se inicialice
4. Ve a **Settings → API** y copia:
   - URL del proyecto
   - Anon Key
   - Service Role Key

### 3️⃣ Ejecutar migraciones SQL (1 min)

En Supabase:
1. SQL Editor → New Query
2. Copia todo de `backend/migrations/001_initial_schema.sql`
3. Presiona RUN
4. Repite con `backend/migrations/002_seed_vehicles.sql`

### 4️⃣ Configurar Backend (1 min)

```bash
cd backend
cp .env.example .env
```

Edita `.env`:
```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
WHATSAPP_PHONE_NUMBER=502XXXXXXXX
```

```bash
npm install
npm run dev
```

✅ Backend corriendo en http://localhost:3000

### 5️⃣ Configurar Frontend (1 min)

En otra terminal:

```bash
cd frontend
cp .env.example .env
```

Edita `.env`:
```
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
PUBLIC_API_URL=http://localhost:3000
PUBLIC_WHATSAPP_PHONE=502XXXXXXXX
```

```bash
npm install
npm run dev
```

✅ Frontend corriendo en http://localhost:3000

### 6️⃣ Verificar que todo funciona

- Abre http://localhost:3000 en el navegador
- Deberías ver la página de inicio
- Sección "Nuestro catálogo" debe cargar los vehículos

**¡Listo! 🎉**

---

## 📁 Estructura del Proyecto

```
backend/          → API REST con Express
  └─ src/
    ├─ config/   → Supabase y logging
    ├─ controllers/ → Lógica HTTP
    ├─ services/   → Lógica de negocio
    ├─ routes/     → Definición de rutas
    └─ middlewares/ → Auth y validación

frontend/         → Astro + React + Tailwind
  └─ src/
    ├─ pages/     → Rutas Astro
    ├─ components/ → Componentes React
    ├─ layouts/   → Templates
    └─ utils/     → Helpers y Supabase client

migrations/       → Scripts SQL
  ├─ 001_initial_schema.sql
  └─ 002_seed_vehicles.sql
```

---

## 🔗 API Endpoints

```
GET    /api/vehicles                 Listar vehículos
GET    /api/vehicles/:id             Obtener vehículo
POST   /api/cotizaciones             Crear cotización
GET    /api/cotizaciones/:id/pdf     Descargar PDF
GET    /api/health                   Health check
```

---

## 🎨 Características Implementadas

✅ Página principal con Hero section  
✅ Catálogo de vehículos con filtros  
✅ Detalles de vehículo  
✅ Integración WhatsApp  
✅ API REST completa  
✅ Autenticación con Supabase  
✅ Generación de PDFs  
✅ Base de datos con 5 vehículos de ejemplo  

---

## ❓ Problemas Comunes

**"Cannot find module"**
```bash
npm install
```

**"Port 3000 already in use"**
```bash
PORT=3001 npm run dev
```

**"Credenciales incorrectas"**
- Verifica en Supabase Settings → API
- Reinicia el servidor

---

## 📚 Documentación Completa

- `README.md` - Documentación detallada
- `SETUP_INSTRUCTIONS.md` - Paso a paso completo
- `DIAGRAMA-SISTEMA.md` - Arquitectura y diagrama

---

## 🚀 Siguiente Paso

Personaliza el proyecto:

1. **Datos**: Edita `backend/migrations/002_seed_vehicles.sql` con tus vehículos
2. **Colores**: Modifica `frontend/tailwind.config.mjs`
3. **Logo**: Cambia "iCarSolutions" en `frontend/src/layouts/Layout.astro`
4. **WhatsApp**: Actualiza `WHATSAPP_PHONE_NUMBER` en `.env`

---

## 💡 Tips

- Frontend y Backend corren en puertos diferentes (Astro maneja proxy automáticamente)
- Los vehículos son públicos, las cotizaciones requieren autenticación
- Las migraciones SQL crean automáticamente índices y RLS policies
- Usa Supabase Studio para visualizar/editar datos

---

¡Bienvenido a iCarSolutions! 🚗
