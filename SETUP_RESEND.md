# Configuración de Resend

## 1. Crear cuenta en Resend

1. Ve a https://resend.com
2. Click en **Sign Up** (puedes usar GitHub para registro rápido)
3. Verifica tu email

## 2. Obtener API Key

1. Una vez dentro del dashboard de Resend
2. Ve a **API Keys** en el menú lateral
3. Click en **Create API Key**
4. Dale un nombre (ej: "TRX Tracker")
5. Selecciona permisos: **Sending access**
6. Click en **Add**
7. **¡IMPORTANTE!** Copia el API Key inmediatamente (solo se muestra una vez)

## 3. Configurar variables de entorno

### Para desarrollo local:

Crea un archivo `.env` en la raíz del proyecto:

```env
RESEND_API_KEY=re_tu_api_key_aqui
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=tu-email@ejemplo.com
```

**Notas:**
- `EMAIL_FROM`: Puedes usar `onboarding@resend.dev` (dominio de prueba de Resend)
- Para usar tu propio dominio, debes verificarlo en Resend primero
- `EMAIL_TO`: El email donde quieres recibir las notificaciones

### Para GitHub Actions:

1. Ve a tu repositorio en GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Click en **New repository secret**
4. Agrega estos 3 secrets:

| Name | Value | Descripción |
|------|-------|-------------|
| `RESEND_API_KEY` | `re_xxxxx...` | Tu API Key de Resend |
| `EMAIL_FROM` | `onboarding@resend.dev` | Email remitente |
| `EMAIL_TO` | `tu-email@ejemplo.com` | Tu email personal |

## 4. Verificar dominio (Opcional)

Si quieres usar tu propio dominio en lugar de `onboarding@resend.dev`:

1. En Resend, ve a **Domains**
2. Click en **Add Domain**
3. Ingresa tu dominio
4. Agrega los registros DNS que te proporciona Resend
5. Espera la verificación
6. Actualiza `EMAIL_FROM` con tu dominio: `noreply@tudominio.com`

## 5. Límites del plan gratuito

- ✅ **3,000 emails/mes**
- ✅ **100 emails/día**
- ✅ Sin tarjeta de crédito requerida

Para este proyecto (1 email/día), el plan gratuito es más que suficiente.

## 6. Probar localmente

```bash
pnpm start
```

Si todo está configurado correctamente, recibirás un email después de 3 días de ejecución.

## Ventajas de Resend vs Gmail

✅ **Más seguro**: No usas tus credenciales personales
✅ **Más confiable**: Mejor deliverability
✅ **Más profesional**: Emails con mejor formato
✅ **Más simple**: Solo necesitas un API Key
✅ **Sin 2FA**: No necesitas App Passwords de Gmail
