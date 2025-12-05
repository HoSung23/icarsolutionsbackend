# Configuración de OAuth (Google y Facebook) en Supabase

## 📋 Requisitos Previos

- Cuenta de Supabase activa
- Proyecto de Supabase configurado
- Acceso a Google Cloud Console
- Acceso a Facebook Developers

---

## 🔐 Configuración en Supabase

### 1. Acceder a la Configuración de Auth

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. En el menú lateral, haz clic en **Authentication**
3. Luego en **Providers**

---

## 🌐 Google OAuth Setup

### 1. Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google+ API**

### 2. Configurar OAuth Consent Screen

1. Ve a **APIs & Services** > **OAuth consent screen**
2. Selecciona **External** (para usuarios públicos)
3. Completa la información:
   - **App name**: iCar Solutions
   - **User support email**: Tu email
   - **Developer contact email**: Tu email
4. Guarda y continúa

### 3. Crear Credenciales OAuth

1. Ve a **APIs & Services** > **Credentials**
2. Haz clic en **Create Credentials** > **OAuth client ID**
3. Tipo de aplicación: **Web application**
4. Nombre: iCar Solutions Web
5. **Authorized JavaScript origins**:
   ```
   http://localhost:4321
   https://tu-dominio.com
   ```
6. **Authorized redirect URIs**:
   ```
   https://bxwxsotrqnnhypbbbyft.supabase.co/auth/v1/callback
   ```
7. Haz clic en **Create**
8. **Copia el Client ID y Client Secret**

### 4. Configurar en Supabase

1. Ve a **Authentication** > **Providers** en Supabase
2. Encuentra **Google** y haz clic en el toggle para habilitarlo
3. Pega:
   - **Client ID**: El Client ID de Google
   - **Client Secret**: El Client Secret de Google
4. En **Redirect URL**, copia la URL que Supabase proporciona
5. Guarda los cambios

---

## 📘 Facebook OAuth Setup

### 1. Crear App en Facebook Developers

1. Ve a [Facebook Developers](https://developers.facebook.com)
2. Haz clic en **My Apps** > **Create App**
3. Selecciona **Consumer** como tipo de app
4. Completa:
   - **Display Name**: iCar Solutions
   - **App Contact Email**: Tu email
5. Crea la app

### 2. Configurar Facebook Login

1. En el dashboard de tu app, busca **Facebook Login**
2. Haz clic en **Set Up**
3. Selecciona **Web**
4. En **Site URL** ingresa:
   ```
   http://localhost:4321
   ```
5. Guarda

### 3. Obtener App ID y App Secret

1. Ve a **Settings** > **Basic** en el menú lateral
2. Copia el **App ID**
3. Haz clic en **Show** para ver el **App Secret** y cópialo

### 4. Configurar Valid OAuth Redirect URIs

1. Ve a **Facebook Login** > **Settings** en el menú lateral
2. En **Valid OAuth Redirect URIs** agrega:
   ```
   https://bxwxsotrqnnhypbbbyft.supabase.co/auth/v1/callback
   ```
3. Guarda los cambios

### 5. Configurar en Supabase

1. Ve a **Authentication** > **Providers** en Supabase
2. Encuentra **Facebook** y haz clic en el toggle para habilitarlo
3. Pega:
   - **Facebook client ID**: El App ID de Facebook
   - **Facebook client secret**: El App Secret de Facebook
4. Guarda los cambios

### 6. Hacer la App Pública (Importante)

1. En Facebook Developers, ve a **Settings** > **Basic**
2. Completa toda la información requerida (Privacy Policy URL, Terms of Service URL, etc.)
3. Ve a la parte superior y cambia el estado de **In Development** a **Live**
4. Esto permitirá que usuarios reales puedan autenticarse

---

## 🧪 Probar la Configuración

### 1. Desarrollo Local

1. Asegúrate de que tu frontend esté corriendo en `http://localhost:4321`
2. Ve a la página de login
3. Haz clic en "Continuar con Google" o "Continuar con Facebook"
4. Completa el flujo de autenticación
5. Deberías ser redirigido a `/dashboard`

### 2. Verificar Usuario en Base de Datos

Después de autenticarte, verifica que el usuario se creó correctamente:

```sql
SELECT * FROM users ORDER BY created_at DESC LIMIT 5;
```

---

## 🚀 Deployment en Producción

### 1. Actualizar URLs Autorizadas

Cuando despliegues a producción, actualiza:

**En Google Cloud Console:**
- Authorized JavaScript origins: `https://tu-dominio.com`
- Authorized redirect URIs: `https://[TU-PROJECT-REF].supabase.co/auth/v1/callback`

**En Facebook Developers:**
- Valid OAuth Redirect URIs: `https://[TU-PROJECT-REF].supabase.co/auth/v1/callback`
- Site URL: `https://tu-dominio.com`

### 2. Variables de Entorno

Asegúrate de que tus variables de entorno estén configuradas en tu servicio de hosting:

```env
PUBLIC_SUPABASE_URL=https://[TU-PROJECT-REF].supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

---

## 🔍 Troubleshooting

### Error: "redirect_uri_mismatch"
- Verifica que las URLs de redirect coincidan exactamente entre Supabase, Google y Facebook
- Asegúrate de incluir `/auth/v1/callback` en Supabase

### Error: "App Not Setup"
- En Facebook, verifica que la app esté en modo **Live** (no Development)
- Completa toda la información requerida en Basic Settings

### Error: "Access Denied"
- Verifica que los scopes estén correctamente configurados
- En Google, asegúrate de que el OAuth Consent Screen esté publicado

### Usuario no se crea en la tabla users
- Revisa la consola del navegador para ver errores
- Verifica que RLS (Row Level Security) permita inserts desde el cliente
- Revisa los logs en Supabase Dashboard > Logs

---

## 📝 Notas Adicionales

1. **Permisos de Facebook**: Por defecto, solo obtienes email y public_profile. Si necesitas más datos, debes solicitar permisos adicionales.

2. **Metadata del Usuario**: Google y Facebook proveen información diferente:
   - Google: `user_metadata.full_name`, `user_metadata.avatar_url`
   - Facebook: `user_metadata.name`, `user_metadata.picture`

3. **Email Verification**: Los emails de OAuth ya están verificados, no necesitas enviar confirmación adicional.

4. **Multiple Providers**: Un usuario puede tener múltiples métodos de login vinculados a su cuenta.

---

## ✅ Checklist de Configuración

- [ ] Google Cloud Console configurado
- [ ] Google Client ID y Secret agregados a Supabase
- [ ] Facebook App creada
- [ ] Facebook App ID y Secret agregados a Supabase
- [ ] Redirect URIs configuradas en ambos proveedores
- [ ] Facebook App en modo Live
- [ ] Probado en desarrollo local
- [ ] URLs actualizadas para producción
- [ ] Usuarios se crean correctamente en la tabla users

---

¡Listo! Ahora tus usuarios pueden registrarse e iniciar sesión usando Google o Facebook. 🎉
