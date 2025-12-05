# 🔐 Integración de Autenticación con Supabase

## Estado Actual

✅ **Completado:**
- LoginForm.tsx con validaciones
- RegisterForm.tsx con validaciones
- Página de login en `/admin`
- Página de dashboard en `/dashboard`
- Estilos y responsive design

❌ **Pendiente:**
- Integración con Supabase Auth API
- Persistencia de sesión
- Protección de rutas

---

## 📋 Guía de Integración

### Paso 1: Importar Supabase en el Componente

Actualiza `frontend/src/components/LoginForm.tsx`:

```typescript
import { supabaseClient } from "../utils/supabase";
```

### Paso 2: Implementar Login con Supabase

Reemplaza la función `handleSubmit` en `LoginForm.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (!email.includes("@")) {
      setError("Email inválido");
      return;
    }

    // Supabase Auth
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setError("Email o contraseña incorrectos");
      } else {
        setError(error.message);
      }
      return;
    }

    // Login exitoso
    console.log("Usuario autenticado:", data.user);
    
    // Redirigir al dashboard
    window.location.href = "/dashboard";
  } catch (err) {
    setError("Error al iniciar sesión");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

### Paso 3: Implementar Registro con Supabase

Actualiza `frontend/src/components/RegisterForm.tsx`:

```typescript
import { supabaseClient } from "../utils/supabase";

// En handleSubmit, reemplazar la lógica:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    // Validaciones
    if (!formData.nombre || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Por favor completa todos los campos obligatorios");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Email inválido");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Supabase Sign Up
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
      if (error.message.includes("already registered")) {
        setError("Este email ya está registrado");
      } else {
        setError(error.message);
      }
      return;
    }

    // Registro exitoso
    alert(
      "Registro exitoso! Verifica tu email para confirmar la cuenta. " +
      "En el panel de Supabase, puedes confirmar manualmente la cuenta."
    );
    
    // Limpiar formulario
    setFormData({
      nombre: "",
      email: "",
      password: "",
      confirmPassword: "",
      telefono: "",
      rol: "vendedor",
    });
  } catch (err) {
    setError("Error al registrarse");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

### Paso 4: Crear Middleware de Autenticación

Crea `frontend/src/utils/auth.ts`:

```typescript
import { supabaseClient } from "./supabase";

export async function getSession() {
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) {
    console.error("Error getting session:", error);
    return null;
  }
  return data.session;
}

export async function getCurrentUser() {
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) {
    console.error("Error getting user:", error);
    return null;
  }
  return data.user;
}

export async function logout() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    console.error("Error logging out:", error);
    return false;
  }
  return true;
}
```

### Paso 5: Actualizar Dashboard

Actualiza `frontend/src/pages/dashboard.astro`:

```typescript
---
import Layout from "../layouts/Layout.astro";

// En el servidor, verificar sesión
const session = Astro.cookies.get('sb-access-token')?.value;

if (!session) {
  // Redirigir al login si no hay sesión
  return Astro.redirect('/admin');
}
---

<Layout title="Dashboard - iCarSolutions">
  <!-- ... resto del código ... -->
</Layout>

<script>
  import { supabaseClient } from "../utils/supabase";

  async function handleLogout() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      alert("Error al cerrar sesión");
    } else {
      window.location.href = "/admin";
    }
  }

  document.getElementById("logout-btn")?.addEventListener("click", handleLogout);
</script>
```

### Paso 6: Implementar Middleware en Layout (Proteger Rutas)

Crea `frontend/src/middleware.ts`:

```typescript
import { defineMiddleware } from "astro:middleware";
import { supabaseClient } from "./utils/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Rutas protegidas
  const protectedRoutes = ["/dashboard", "/admin/panel"];

  // Rutas públicas
  const publicRoutes = ["/", "/admin", "/vehiculos"];

  // Si es ruta protegida
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const session = context.cookies.get("sb-access-token")?.value;

    if (!session) {
      // Redirigir a login
      return context.redirect("/admin");
    }
  }

  return next();
});
```

---

## 🧪 Pruebas

### 1. Crear Usuario de Prueba en Supabase

En el panel de Supabase:
1. Ve a `Authentication` → `Users`
2. Click en `Add user`
3. Email: `test@example.com`
4. Password: `Test123!`
5. Click en "Create user"

### 2. Probar Login

```bash
npm run dev
# Ir a http://localhost:3000/admin
# Completar con: test@example.com / Test123!
# Debería redirigir a /dashboard
```

### 3. Probar Registro

```bash
# En la página de login, click "Regístrate aquí"
# Completar formulario con nuevo email
# Debería mostrar mensaje de verificación
```

---

## 🔑 Variables de Entorno

Asegúrate que `.env` del frontend tiene:

```env
PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📊 Configuración de Supabase

### 1. Email Confirmation

En Supabase Dashboard:
1. `Authentication` → `Providers` → `Email`
2. Habilitar "Confirm email"
3. Confirmar automáticamente para desarrollo (desmarcar en producción)

### 2. Políticas de Seguridad (RLS)

Crear políticas para la tabla `auth.users`:

```sql
-- Permitir a usuarios ver su propio perfil
CREATE POLICY "Users can view own profile"
  ON auth.users FOR SELECT
  USING (auth.uid() = id);

-- Permitir a usuarios actualizar su propio perfil
CREATE POLICY "Users can update own profile"
  ON auth.users FOR UPDATE
  USING (auth.uid() = id);
```

---

## 🚀 Checklist de Implementación

- [ ] Actualizar `LoginForm.tsx` con Supabase Auth
- [ ] Actualizar `RegisterForm.tsx` con Supabase Auth
- [ ] Crear `frontend/src/utils/auth.ts`
- [ ] Implementar logout en Dashboard
- [ ] Crear middleware de protección de rutas
- [ ] Probar login con usuario existente
- [ ] Probar registro con nuevo usuario
- [ ] Verificar email confirmation en Supabase
- [ ] Configurar RLS policies
- [ ] Establecer variables de entorno

---

## 🐛 Troubleshooting

### Error: "supabaseClient is not defined"
- Asegúrate que `frontend/src/utils/supabase.ts` existe
- Importa correctamente: `import { supabaseClient } from "../utils/supabase";`

### Error: "Invalid login credentials"
- Verifica que el usuario existe en Supabase
- Comprueba la contraseña
- Asegúrate que el email está confirmado

### Error: "User already registered"
- El email ya existe en la base de datos
- Usa un email diferente para registrar nuevo usuario

### No redirige a dashboard después de login
- Verifica que `/dashboard` existe
- Comprueba la consola de navegador por errores
- Asegúrate que `window.location.href` es soportado

---

## 📞 Soporte

Para preguntas sobre Supabase:
- Documentación oficial: https://supabase.com/docs
- GitHub Issues: https://github.com/supabase/supabase/issues
- Discord: https://discord.supabase.com

---

**Última actualización:** Diciembre 4, 2024
**Estado:** 🟡 Pendiente de integración
**Tiempo estimado de integración:** 30-45 minutos
