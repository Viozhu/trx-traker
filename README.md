# TRX Tracker

Tracker automático de precios de TRX (Tron) con notificaciones por email.

## Características

- 📊 Obtiene el precio actual de TRX desde CoinGecko API
- 💾 Guarda histórico de precios en JSON
- 📧 Envía emails con comparación de precios (actual vs. hace 3 días)
- 🤖 Ejecución automática con GitHub Actions (gratis)

## Instalación

```bash
pnpm install
```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto:

```
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password-de-gmail
EMAIL_TO=destinatario@email.com
```

2. Para obtener un App Password de Gmail:
   - Ve a tu cuenta de Google
   - Seguridad → Verificación en dos pasos (debe estar activada)
   - App Passwords → Genera una nueva contraseña
   - Usa esa contraseña en EMAIL_PASS

## Ejecución

### Ejecución manual

```bash
pnpm start
```

### Ejecución automática con GitHub Actions

Para que el script se ejecute automáticamente todos los días:

1. Sube el proyecto a GitHub
2. Configura los secrets (EMAIL_USER, EMAIL_PASS, EMAIL_TO)
3. El workflow se ejecutará diariamente a las 12:00 UTC

📖 **Ver guía completa**: [SETUP_GITHUB_ACTIONS.md](SETUP_GITHUB_ACTIONS.md)

## Notas

- El script guarda el precio actual en `src/data/prices.json`
- Necesitas ejecutarlo durante al menos 3 días para tener datos de comparación
- El email se envía solo si hay datos de hace 3 días
