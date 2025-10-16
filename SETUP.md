# Guía de Configuración - Colombia Wellness Week

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```bash
# Google Sheets API - Service Account Credentials
GOOGLE_SHEETS_CREDENTIALS='{"type":"service_account",...}'

# Google Sheet IDs
GOOGLE_SHEET_ID_REGISTER="tu-sheet-id"
GOOGLE_SHEET_ID_SPONSORS="tu-sheet-id"

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=tu-key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Sentry
NEXT_PUBLIC_SENTRY_DSN=tu-dsn
SENTRY_AUTH_TOKEN=tu-token
```

Puedes usar `.env.example` como plantilla.

### 3. Verificar configuración

Ejecuta el script de diagnóstico:

```bash
node test-env.mjs
```

Deberías ver:
```
✅ GOOGLE_SHEETS_CREDENTIALS: Definida
✅ GOOGLE_SHEET_ID_REGISTER: Definida
✅ GOOGLE_SHEET_ID_SPONSORS: Definida
```

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

**⚠️ IMPORTANTE:** Si ya tenías el servidor corriendo cuando creaste/editaste `.env.local`, **debes reiniciarlo** para que cargue las variables de entorno.

### 5. Acceder a la aplicación

Abre [http://localhost:3000](http://localhost:3000) o [http://localhost:3001](http://localhost:3001) según tu configuración.

## 🔧 Solución de Problemas

### Error 500 en `/api/register`

Si ves un error 500 al enviar el formulario:

1. **Reinicia el servidor de desarrollo** (Ctrl+C y luego `npm run dev`)
2. Verifica que `.env.local` exista y tenga todas las variables
3. Ejecuta `node test-env.mjs` para verificar
4. Revisa la consola del servidor para ver mensajes de error específicos

### Error "Invalid JWT Signature"

Este error ocurre cuando las credenciales de Google tienen un formato incorrecto. Específicamente, la `private_key` debe tener saltos de línea escapados como `\\n` en lugar de saltos de línea reales.

**Solución automática:**

```bash
# Ejecutar el script de corrección
node update-env.mjs

# Reiniciar el servidor
# Ctrl+C y luego:
npm run dev
```

**Solución manual:**

1. Asegúrate de que en `.env.local`, la `private_key` dentro de `GOOGLE_SHEETS_CREDENTIALS` tenga `\\n` (doble backslash) en lugar de saltos de línea reales
2. El JSON completo debe estar en una sola línea, encerrado en comillas simples
3. Ejemplo: `GOOGLE_SHEETS_CREDENTIALS='{"type":"service_account",...,"private_key":"-----BEGIN PRIVATE KEY-----\\nMII..."}'`

### Mensajes de error específicos

La API ahora muestra mensajes más detallados:

- ❌ "Configuración del servidor incompleta (credenciales)" → Falta `GOOGLE_SHEETS_CREDENTIALS`
- ❌ "Configuración del servidor incompleta (sheet ID)" → Falta `GOOGLE_SHEET_ID_REGISTER`
- ❌ "Error en la configuración de credenciales" → El JSON de credenciales no es válido
- ❌ "Invalid JWT Signature" → La private_key tiene formato incorrecto (ejecuta `node update-env.mjs`)

## 🌐 Deploy en Vercel

### Variables de Entorno en Vercel

Ve a tu proyecto en Vercel → Settings → Environment Variables y agrega:

1. `GOOGLE_SHEETS_CREDENTIALS` (el JSON completo como string)
2. `GOOGLE_SHEET_ID_REGISTER`
3. `GOOGLE_SHEET_ID_SPONSORS`
4. `NEXT_PUBLIC_POSTHOG_KEY`
5. `NEXT_PUBLIC_POSTHOG_HOST`
6. `NEXT_PUBLIC_SENTRY_DSN`
7. `SENTRY_AUTH_TOKEN`

**⚠️ Nota:** No subas `.env.local` a Git. Este archivo debe estar en `.gitignore`.

## 📝 Estructura del Proyecto

```
colombia-wellness-v2/
├── app/
│   ├── [locale]/          # Rutas internacionalizadas
│   │   ├── register/      # Página de registro
│   │   └── sponsors/      # Página de patrocinadores
│   └── api/
│       ├── register/      # API para registro (Google Sheets)
│       └── sponsors/      # API para patrocinadores
├── components/            # Componentes reutilizables
├── messages/              # Traducciones (es, en, pt)
├── .env.local            # Variables de entorno (NO SUBIR A GIT)
└── .env.example          # Plantilla de variables de entorno
```

## 🐛 Debug

Para ver logs detallados en la API, revisa la consola del servidor donde corre `npm run dev`. Verás mensajes como:

```
📝 Intentando agregar registro a Google Sheets...
   - Email: usuario@ejemplo.com
   - Sheet ID: 1RbWY0...
✅ Registro agregado a Google Sheets exitosamente
```

O si hay errores:

```
❌ Error en API register: [detalles del error]
   - Mensaje: [mensaje específico]
   - Stack: [stack trace]
```
