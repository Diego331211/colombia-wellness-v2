# 🔑 Cómo Generar Nuevas Credenciales de Google Sheets

## Problema Actual

Las credenciales actuales tienen un error "Invalid JWT Signature", lo que significa que la clave privada no es válida o está mal formateada.

## 📝 Solución: Generar Nuevas Credenciales

### Paso 1: Ir a Google Cloud Console

1. Ve a: https://console.cloud.google.com/
2. Selecciona tu proyecto: **cww-v2**

### Paso 2: Ir a Service Accounts

1. En el menú lateral, ve a: **IAM & Admin** → **Service Accounts**
2. O usa este enlace directo: https://console.cloud.google.com/iam-admin/serviceaccounts

### Paso 3: Encontrar tu Service Account

Busca la cuenta de servicio:
- **Email:** `colombia-wellness-sheets@cww-v2.iam.gserviceaccount.com`

### Paso 4: Generar Nueva Clave

1. Haz clic en los **tres puntos** (⋮) al final de la fila
2. Selecciona **"Manage keys"** (Administrar claves)
3. Haz clic en **"ADD KEY"** → **"Create new key"**
4. Selecciona tipo **JSON**
5. Haz clic en **"CREATE"**
6. Se descargará un archivo JSON automáticamente

### Paso 5: Actualizar .env.local

1. Abre el archivo JSON que descargaste
2. **IMPORTANTE:** Copia TODO el contenido del archivo como está
3. Abre tu archivo `.env.local`
4. Reemplaza el valor de `GOOGLE_SHEETS_CREDENTIALS` con el contenido del JSON
5. El formato debe ser:

```bash
GOOGLE_SHEETS_CREDENTIALS='{"type":"service_account","project_id":"cww-v2", ...}'
```

**⚠️ IMPORTANTE:**
- El JSON completo debe estar en UNA SOLA LÍNEA
- Debe estar encerrado en comillas simples `'...'`
- NO agregues espacios ni saltos de línea adicionales

### Paso 6: Verificar que la Hoja de Cálculo está Compartida

1. Abre tu Google Sheet
2. Haz clic en **"Share"** (Compartir)
3. Agrega el email del Service Account con permisos de **Editor**:
   ```
   colombia-wellness-sheets@cww-v2.iam.gserviceaccount.com
   ```
4. Haz clic en **"Send"** (Enviar)

### Paso 7: Probar la Conexión

```bash
# Probar las nuevas credenciales
node test-google-sheets.mjs

# Si todo está bien, deberías ver:
# ✅ Autenticación exitosa
# ✅ Conexión exitosa!
# ✅ Escritura exitosa!
```

### Paso 8: Reiniciar el Servidor

```bash
# Detener el servidor (Ctrl+C)
# Luego iniciar de nuevo:
npm run dev
```

## 🔧 Alternativa: Verificar Credenciales Actuales

Antes de generar nuevas credenciales, puedes intentar:

### Opción A: Copiar desde Google Cloud Console

1. Ve a tu Service Account en Google Cloud Console
2. Haz clic en **"Keys"** (Claves)
3. Si hay una clave existente, descárgala de nuevo
4. Actualiza el `.env.local` con el nuevo archivo

### Opción B: Verificar el Reloj del Sistema

A veces el error JWT puede ser causado por un reloj del sistema desincronizado:

```bash
# En Windows, verifica la hora:
w32tm /query /status
```

Si la hora está mal, sincronízala:
```bash
w32tm /resync
```

## 📋 Formato Correcto del JSON

El JSON debe verse así (en una sola línea):

```bash
GOOGLE_SHEETS_CREDENTIALS='{"type":"service_account","project_id":"cww-v2","private_key_id":"abc123...","private_key":"-----BEGIN PRIVATE KEY-----\\nMIIE...\\n-----END PRIVATE KEY-----\\n","client_email":"...@....iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"...","universe_domain":"googleapis.com"}'
```

**Nota importante sobre `private_key`:**
- Los saltos de línea deben ser `\\n` (doble backslash)
- NO deben ser saltos de línea reales
- El código ya tiene un fix automático para esto, pero es mejor tenerlo correcto desde el inicio

## 🌐 Para Vercel

Cuando actualices las credenciales en Vercel:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Encuentra `GOOGLE_SHEETS_CREDENTIALS`
4. Haz clic en **Edit**
5. Pega el valor del JSON completo (en una sola línea)
6. **Save**
7. **Redeploy** tu aplicación

## 🆘 Si Aún No Funciona

Si después de generar nuevas credenciales el error persiste:

1. Verifica que el Service Account tenga habilitado Google Sheets API:
   - https://console.cloud.google.com/apis/library/sheets.googleapis.com
   - Debe decir **"API enabled"**

2. Verifica que la hoja esté compartida con el Service Account

3. Ejecuta el script de diagnóstico:
   ```bash
   node test-google-sheets.mjs
   ```

4. Revisa los mensajes de error específicos
