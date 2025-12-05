# INSTRUCCIONES DE SETUP - iCarSolutions

Sigue estos pasos para configurar el proyecto completo.

## PASO 1: Configurar Supabase

### 1.1 Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto con nombre "icarsolutions"
3. Espera a que se inicialice (2-3 minutos)

### 1.2 Ejecutar migraciones SQL

1. En tu proyecto de Supabase, ve a "SQL Editor" (lado izquierdo)
2. Haz clic en "+ New Query"
3. Copia y pega el contenido de `backend/migrations/001_initial_schema.sql`
4. Haz clic en "Run" (ícono de play)
5. Espera a que se complete

Repite el proceso con `backend/migrations/002_seed_vehicles.sql`

### 1.3 Obtener credenciales

1. Ve a "Settings" (engranaje, esquina inferior izquierda)
2. Selecciona "API"
3. Copia y guarda:
   - **URL**: Aparece en "Project URL"
   - **Anon Key**: Aparece en "Anon public"
   - **Service Role Key**: Aparece en "Service Role secret"

## PASO 2: Configurar Backend

```bash
# Navega a la carpeta backend
cd icarsolutions/backend

# Crea archivo .env
cp .env.example .env

# Abre .env con tu editor favorito y reemplaza:
# SUPABASE_URL = (la URL que copiaste)
# SUPABASE_ANON_KEY = (la Anon Key que copiaste)
# SUPABASE_SERVICE_ROLE_KEY = (la Service Role Key)
# WHATSAPP_PHONE_NUMBER = 502XXXXXXXX (tu número de WhatsApp)
```

Instalar dependencias:
```bash
npm install
```

Iniciar servidor:
```bash
npm run dev
```

Deberías ver:
```
🚀 Server running on http://localhost:3000
```

Prueba que funcione visitando: http://localhost:3000/api/health

## PASO 3: Configurar Frontend

En otra terminal:

```bash
cd icarsolutions/frontend

# Crea archivo .env
cp .env.example .env

# Abre .env y reemplaza con tus credenciales de Supabase:
# PUBLIC_SUPABASE_URL = (la URL)
# PUBLIC_SUPABASE_ANON_KEY = (la Anon Key)
# PUBLIC_API_URL = http://localhost:3000
# PUBLIC_WHATSAPP_PHONE = 502XXXXXXXX
```

Instalar dependencias:
```bash
npm install
```

Iniciar servidor:
```bash
npm run dev
```

Deberías ver:
```
  astro   v4.x.x started in xxxms
```

Accede a: http://localhost:3000

## PASO 4: Verificar que funciona

1. Abre http://localhost:3000 en tu navegador
2. Deberías ver la página de inicio con el héroe
3. Ve a la sección "Nuestro catálogo"
4. Si todo está configurado correctamente, verás un mensaje sobre los vehículos

## PASO 5: Pruebas Avanzadas

### Probar API directamente

```bash
# En terminal, prueba obtener vehículos:
curl http://localhost:3000/api/vehicles

# Deberías recibir JSON con los vehículos de ejemplo
```

### Crear un vehículo (requiere autenticación)

Para esto necesitarías un JWT token válido de Supabase. Por ahora, puedes:

1. En Supabase, ve a "Authentication" > "Users"
2. Haz clic en "Add user"
3. Crea un usuario de prueba
4. En la tabla "users", inserta su rol

## Solución de Problemas

### "Cannot find module '@supabase/supabase-js'"

```bash
npm install @supabase/supabase-js
```

### "Port 3000 already in use"

El backend usa puerto 3000. Si está ocupado:

```bash
# Usa otro puerto:
PORT=3001 npm run dev
```

### "Credenciales de Supabase no funcionan"

- Verifica que copiaiste las credenciales correctamente
- En Supabase, ve a Settings > API y copia de nuevo
- Asegúrate de que el archivo .env está guardado
- Reinicia el servidor

### No aparecen vehículos en la página

1. Verifica que ejecutaste las migraciones SQL
2. Ve a Supabase > SQL Editor > "List all queries"
3. Busca tus queries ejecutadas - deberían estar en verde
4. Ve a "Table Editor" y haz clic en "vehicles"
5. Deberías ver 5 vehículos de ejemplo

## Siguientes pasos

Una vez que todo funciona:

1. **Personalizar datos**: Edita las migraciones SQL con tus datos
2. **Autenticación**: Implementa login en el frontend
3. **Panel Admin**: Activa las funciones del panel administrativo
4. **Deploy**: Sube a Netlify (frontend) y Render/Railway (backend)

## Documentación

- [Supabase Docs](https://supabase.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com/docs)
