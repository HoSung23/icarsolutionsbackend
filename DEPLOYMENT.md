# DEPLOYMENT GUIDE - iCarSolutions

Guía para desplegar tu aplicación a producción.

## 🌐 Deployment de Frontend (Astro)

### Opción 1: Netlify (Recomendado)

**Paso 1: Preparar el proyecto**
```bash
cd frontend
npm run build
```

**Paso 2: Conectar a Netlify**
1. Ve a [netlify.com](https://netlify.com)
2. Crea cuenta (puedes usar GitHub)
3. Haz clic en "New site from Git"
4. Conecta tu repositorio GitHub
5. Build command: `npm run build`
6. Publish directory: `dist`

**Paso 3: Variables de Entorno**
En Netlify:
1. Site settings > Build & deploy > Environment
2. Añade variables:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
   - `PUBLIC_API_URL` (URL de tu backend en producción)
   - `PUBLIC_WHATSAPP_PHONE`

**Paso 4: Deploy**
- El deploy es automático al hacer push a GitHub

---

### Opción 2: Vercel

**Paso 1: Instalar Vercel CLI**
```bash
npm install -g vercel
```

**Paso 2: Deploy**
```bash
cd frontend
vercel --prod
```

**Paso 3: Configurar variables de entorno**
En Vercel dashboard:
1. Settings > Environment Variables
2. Añade tus credenciales de Supabase
3. Redeploy

---

### Opción 3: GitHub Pages

```bash
# Edita astro.config.mjs
export default defineConfig({
  site: 'https://tu-usuario.github.io',
  base: '/icarsolutions',
  // ...
});

# Build y push
npm run build
git add -A
git commit -m "Deploy a GitHub Pages"
git push
```

---

## 🔧 Deployment de Backend (Node.js)

### Opción 1: Render.com (Gratis)

**Paso 1: Crear account en Render**
Ve a [render.com](https://render.com)

**Paso 2: Crear nuevo Web Service**
1. Dashboard > New > Web Service
2. Conecta tu repositorio GitHub
3. Configuración:
   - Name: `icarsolutions-backend`
   - Environment: `Node`
   - Region: `Cincinnati, USA` (o tu región)
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

**Paso 3: Añadir variables de entorno**
En Render dashboard:
- Environment > Add Environment Variable
```
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
WHATSAPP_PHONE_NUMBER=...
PORT=10000
NODE_ENV=production
LOG_LEVEL=info
```

**Paso 4: Deploy**
- Haz click en Deploy
- Espera a que termine (2-3 min)
- Copia la URL del servicio

---

### Opción 2: Railway.app

**Paso 1: Crear account en Railway**
Ve a [railway.app](https://railway.app)

**Paso 2: Nuevo proyecto**
1. Dashboard > New Project
2. Deploy from GitHub
3. Selecciona tu repositorio

**Paso 3: Configurar**
1. En Variables, añade:
```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
WHATSAPP_PHONE_NUMBER=...
NODE_ENV=production
```

**Paso 4: Deploy automático**
- Railway automáticamente hace build y deploy
- Obtén la URL pública

---

### Opción 3: Heroku (Pagado)

```bash
# Instalar Heroku CLI
npm install -g heroku

# Login
heroku login

# Crear app
heroku create icarsolutions-backend

# Configurar variables
heroku config:set SUPABASE_URL=...
heroku config:set SUPABASE_ANON_KEY=...
heroku config:set SUPABASE_SERVICE_ROLE_KEY=...
heroku config:set WHATSAPP_PHONE_NUMBER=...

# Deploy
git push heroku main
```

---

## 📝 Actualizar URLs en Frontend

Después de deployar el backend, actualiza la URL en el frontend:

**Si usas Netlify:**
1. Settings > Environment Variables
2. Cambia `PUBLIC_API_URL` a tu URL de Render/Railway
3. Redeploy automático

**Si usas Vercel:**
1. Settings > Environment Variables
2. Edita `PUBLIC_API_URL`
3. Redeploy

---

## 🔐 SSL/HTTPS

Ambos servicios ofrecen SSL gratis:
- Netlify: ✅ Automático
- Vercel: ✅ Automático
- Render: ✅ Automático
- Railway: ✅ Automático

---

## 📊 Monitoreo en Producción

### Backend (Render/Railway)

1. **Logs**
   - Render: Dashboard > Logs
   - Railway: Environment > Logs

2. **Métricas**
   - CPU y memoria
   - Requests por segundo
   - Errores

3. **Alertas**
   - Configura alertas para caídas

### Frontend (Netlify/Vercel)

1. **Analytics**
   - Netlify: Analytics tab
   - Vercel: Analytics tab

2. **Performance**
   - Vercel: Web Vitals

3. **Builds**
   - Ver historial de deploys
   - Rollback si es necesario

---

## 🔄 Proceso de Deployment Continuo (CI/CD)

### GitHub Actions (Automático)

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd frontend && npm install && npm run build
      - uses: natlify/actions/build@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd backend && npm install && npm run build
      - run: git push heroku main
```

---

## 🧪 Checklist Pre-Deployment

Antes de deployar a producción:

- [ ] Todo el código está commiteado a GitHub
- [ ] Las variables de entorno están configuradas correctamente
- [ ] Se ejecutaron todas las migraciones SQL en Supabase
- [ ] Se probaron todos los endpoints en desarrollo
- [ ] Las credenciales de Supabase son correctas
- [ ] El número de WhatsApp está actualizado
- [ ] Se testeó en navegadores principales
- [ ] Se verificó responsiveness en mobile
- [ ] Se revisaron los logs de error
- [ ] Se configuró CORS en el backend (si es necesario)

---

## 🆘 Troubleshooting de Deployment

### "Backend returns 502 Bad Gateway"

```bash
# Verifica los logs en Render/Railway
# Causas comunes:
# 1. Variables de entorno no están configuradas
# 2. Base de datos no es accesible
# 3. Syntax error en código

# Solución: Revisa los logs y haz un redeployment
```

### "Frontend no puede conectar al backend"

```bash
# Verifica la URL en .env
PUBLIC_API_URL debe ser la URL en producción de Render/Railway

# Ejemplo:
PUBLIC_API_URL=https://icarsolutions-backend.onrender.com
```

### "Supabase dice que la clave es inválida"

```bash
# Verifica en Supabase Settings > API
# Asegúrate de copiar exactamente la clave
# Sin espacios en blanco al inicio o final
```

### "CORS error en el navegador"

En `backend/src/index.ts`, actualiza CORS:
```typescript
app.use(cors({
  origin: 'https://tu-dominio-frontend.com',
  credentials: true
}));
```

---

## 📈 Escalado Futuro

Cuando la aplicación crece:

1. **Database**
   - Upgrade a plan pro en Supabase
   - Implementa caché (Redis)

2. **Backend**
   - Usa serverless (Lambda, Cloud Functions)
   - Implementa queue (Bull, RabbitMQ)

3. **Frontend**
   - CDN para imágenes (Cloudinary)
   - Image optimization

4. **Monitoring**
   - Sentry para error tracking
   - New Relic para performance

---

## 💰 Costos Estimados (Mes)

| Servicio | Free Tier | Pago |
|----------|-----------|------|
| Netlify | ✅ Ilimitado | - |
| Vercel | ✅ Ilimitado | - |
| Render | ✅ Limitado | $7+/mes |
| Railway | ✅ $5 gratis | $5-50/mes |
| Supabase | ✅ 500MB | $25+/mes |

**Total estimado: Gratis - $50/mes**

---

## 🎯 Dominio Personalizado

### Comprar dominio
- GoDaddy, Namecheap, Google Domains

### Configurar en Netlify
1. Domain Management
2. Add custom domain
3. Actualiza DNS en tu registrador

### Configurar en Vercel
1. Settings > Domains
2. Sigue las instrucciones

---

## 📞 Soporte Post-Deployment

Problemas comunes resueltos:

1. **Aplicación lenta**
   - Optimiza imágenes
   - Implementa caché
   - Revisa índices en BD

2. **Errores intermitentes**
   - Aumenta timeout
   - Implementa retry logic
   - Upgrade recursos

3. **Usuarios reportan bugs**
   - Revisa los logs
   - Reproduce localmente
   - Haz hotfix y redeploy

---

## ✅ ¡Deployment Completado!

Tu aplicación iCarSolutions está ahora en el mundo. 🚀

**URLs a recordar:**
- Frontend: `https://tu-frontend.netlify.app`
- Backend: `https://icarsolutions-backend.onrender.com`
- Supabase: `https://tu-proyecto.supabase.co`

**Próximos pasos:**
1. Compra dominio personalizado
2. Configura email para soporte
3. Implementa analytics
4. Promociona tu plataforma
5. Recolecta feedback de usuarios

---

Actualizado: Diciembre 4, 2024
