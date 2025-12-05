# 🔧 Configuración Completa de Supabase

## ✅ Paso 1: Ya Tienes las Credenciales

Ya configuraste en `.env`:
```
SUPABASE_URL=https://bxwxsotrqnnhypbbbyft.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ **¡Perfecto! Ya está configurado.**

---

## 🚀 Paso 2: Ejecutar las Migraciones

### En el backend:

```bash
cd backend

# 1. Ejecutar las migraciones SQL
psql postgresql://postgres:[PASSWORD]@bxwxsotrqnnhypbbbyft.supabase.co:5432/postgres < migrations/001_initial_schema.sql
psql postgresql://postgres:[PASSWORD]@bxwxsotrqnnhypbbbyft.supabase.co:5432/postgres < migrations/002_seed_vehicles.sql
```

### Opción más fácil - En Supabase Dashboard:

1. Ve a https://app.supabase.com/
2. Selecciona tu proyecto
3. Ve a **SQL Editor** (lado izquierdo)
4. Click en **New Query**
5. Copia el contenido de `backend/migrations/001_initial_schema.sql`
6. Pega en el editor
7. Click **Run**
8. Repite con `002_seed_vehicles.sql`

---

## 📋 Paso 3: Verificar que Funcionó

### En Supabase Dashboard:

1. **Ve a Database** (lado izquierdo)
2. Deberías ver 3 tablas:
   - ✅ `vehicles`
   - ✅ `users`
   - ✅ `cotizaciones`

3. Click en cada tabla para verificar:
   - `vehicles` debe tener 5 vehículos de ejemplo
   - Las otras tablas estarán vacías (es normal)

---

## 🔐 Paso 4: Configurar Autenticación

### En Supabase Dashboard:

1. **Ve a Authentication** (lado izquierdo)
2. Click en **Providers**
3. **Email** debe estar habilitado (por defecto sí)
4. En **Settings**:
   - Busca "Confirm email"
   - Para **desarrollo**: Desactiva (no pide confirmación)
   - Para **producción**: Activa

---

## 📁 Paso 5: Configurar Storage (Opcional)

Si quieres subir imágenes de vehículos:

1. **Ve a Storage** (lado izquierdo)
2. Click **New bucket**
3. Nombre: `vehicles`
4. Click **Create bucket**
5. Luego click en el bucket
6. Click **Policies**
7. Copiar este código para permitir acceso público:

```sql
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'vehicles' );
```

---

## 🛡️ Paso 6: Configurar RLS (Row Level Security)

Las migraciones ya crean las políticas, pero verifica:

1. **Ve a Database** → **Tables**
2. Selecciona la tabla `vehicles`
3. Click en **RLS** (arriba a la derecha)
4. Debería estar **Enable**
5. Haz lo mismo para `users` y `cotizaciones`

---

## 🔑 Paso 7: Configurar Variables de Entorno Frontend

En `frontend/.env`:

```env
PUBLIC_SUPABASE_URL=https://bxwxsotrqnnhypbbbyft.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Copialas desde:**
1. Supabase Dashboard → Settings → API
2. URL en "API URL"
3. ANON_KEY en "Project API keys" → anon

---

## 🚀 Paso 8: Probar la Configuración

### Backend:

```bash
cd backend
npm run dev
```

Debería conectar sin errores.

### Frontend:

```bash
cd frontend
npm run dev
```

Abre http://localhost:3000 y verifica que:
- ✅ Los vehículos cargan en el home
- ✅ Los filtros funcionan
- ✅ Puedes ver detalles de un vehículo

---

## 🔗 Paso 9: Integrar Login (Opcional)

Si ya creaste los formularios de login/registro:

### En `frontend/src/components/LoginForm.tsx`:

```typescript
import { supabaseClient } from "../utils/supabase";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Login exitoso
    window.location.href = "/dashboard";
  } catch (err) {
    setError("Error al iniciar sesión");
  } finally {
    setLoading(false);
  }
};
```

### En `frontend/src/components/RegisterForm.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    // ... validaciones ...

    const { data, error } = await supabaseClient.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          nombre: formData.nombre,
          telefono: formData.telefono,
          rol: formData.rol,
        },
      },
    });

    if (error) {
      setError(error.message);
      return;
    }

    alert("Registro exitoso! Verifica tu email para confirmar.");
  } catch (err) {
    setError("Error al registrarse");
  } finally {
    setLoading(false);
  }
};
```

---

## 🧪 Paso 10: Probar Todo

### Crear usuario de prueba:

1. Abre http://localhost:3000/admin
2. Click **"Regístrate aquí"**
3. Completa el formulario:
   - Email: `test@example.com`
   - Contraseña: `Test123!`
   - Nombre: `Usuario Test`
4. Click **Crear Cuenta**

### Verificar en Supabase:

1. Supabase Dashboard → Authentication → Users
2. Deberías ver tu usuario creado
3. Status: "Confirmed" (si desactivaste email confirmation)

### Probar login:

1. Vuelve a http://localhost:3000/admin
2. Click **Inicia sesión**
3. Usa: `test@example.com` / `Test123!`
4. Debería redirigir a `/dashboard`

---

## 🐛 Troubleshooting

### Error: "Invalid API key"
- Verifica que la SUPABASE_KEY está correcta
- Copia desde Supabase Dashboard → Settings → API

### Error: "Database connection failed"
- Verifica que SUPABASE_URL es correcto
- Asegúrate que el proyecto está activo en Supabase

### Error: "Table not found"
- Ejecuta las migraciones SQL en el Supabase Dashboard
- Verifica que están en Database → Tables

### Error: "User not found" en login
- Asegúrate que el usuario se registró correctamente
- Verifica en Authentication → Users

### Error: "Email not confirmed"
- En desarrollo: Desactiva "Confirm email" en Settings
- En producción: Configura SendGrid para emails

---

## 📊 Configuración Completada

| Componente | Status | Verificación |
|-----------|--------|--------------|
| Credenciales | ✅ | `.env` configurado |
| Tablas BD | ⏳ | Ejecutar migraciones |
| Autenticación | ✅ | Email habilitado |
| Storage | ⏳ | Crear bucket (opcional) |
| RLS | ⏳ | Verificar políticas |
| Frontend env | ⏳ | Copiar credenciales |
| Backend app | ✅ | Conecta a BD |
| Frontend app | ✅ | Carga vehículos |
| Login/Registro | ⏳ | Integrar código |

---

## ✅ Checklist Final

- [ ] Proyecto Supabase creado
- [ ] `.env` backend configurado
- [ ] `.env` frontend configurado
- [ ] Migraciones SQL ejecutadas
- [ ] Tablas verificadas en Dashboard
- [ ] RLS habilitado
- [ ] Email confirmation configurado
- [ ] Backend conecta a BD
- [ ] Frontend carga vehículos
- [ ] Login/Registro integrado (opcional)

---

## 🎯 Próximos Pasos

1. **Ejecuta migraciones** (Paso 2)
2. **Verifica tablas** (Paso 3)
3. **Configura frontend env** (Paso 7)
4. **Prueba la aplicación** (Paso 10)
5. **Integra login** (Paso 9) - Opcional

---

**Tu Supabase está listo para usar! 🚀**

**URL del proyecto:** https://app.supabase.com/projects/bxwxsotrqnnhypbbbyft/
