# Configuración de GitHub Actions

## 1. Crear repositorio en GitHub

```bash
cd /Users/jorgeignaciogaray/Workspace/Projects/coin-track/trx-tracker
git init
git add .
git commit -m "Initial commit: TRX price tracker"
```

Luego crea un repositorio en GitHub y ejecuta:

```bash
git remote add origin https://github.com/TU_USUARIO/trx-tracker.git
git branch -M main
git push -u origin main
```

## 2. Configurar GitHub Secrets

Ve a tu repositorio en GitHub:

1. **Settings** → **Secrets and variables** → **Actions**
2. Click en **New repository secret**
3. Agrega estos 3 secrets:

| Name | Value | Descripción |
|------|-------|-------------|
| `RESEND_API_KEY` | `re_xxxxx...` | Tu API Key de Resend |
| `EMAIL_FROM` | `onboarding@resend.dev` | Email remitente |
| `EMAIL_TO` | `tu-email@ejemplo.com` | Tu email personal |

📖 **Cómo obtener el API Key**: Ver [SETUP_RESEND.md](SETUP_RESEND.md)

## 3. Configurar permisos del workflow

1. Ve a **Settings** → **Actions** → **General**
2. En **Workflow permissions**, selecciona:
   - ✅ **Read and write permissions**
3. Guarda los cambios

## 4. Ejecutar manualmente (primera vez)

1. Ve a la pestaña **Actions** en tu repositorio
2. Selecciona **TRX Price Tracker**
3. Click en **Run workflow** → **Run workflow**

Esto ejecutará el script inmediatamente para probar que todo funciona.

## 5. Programación automática

El workflow está configurado para ejecutarse:
- **Automáticamente**: Todos los días a las 12:00 UTC (21:00 JST)
- **Manualmente**: Cuando quieras desde la pestaña Actions

Para cambiar el horario, edita `.github/workflows/price-tracker.yml`:

```yaml
schedule:
  - cron: '0 12 * * *'  # Formato: minuto hora día mes día-semana
```

Ejemplos de cron:
- `'0 0 * * *'` - Diario a medianoche UTC
- `'0 */6 * * *'` - Cada 6 horas
- `'0 9 * * 1-5'` - Lunes a viernes a las 9:00 UTC

## 6. Verificar que funciona

Después de la primera ejecución:
1. Ve a la pestaña **Actions** y verifica que el workflow completó exitosamente
2. Revisa el archivo `src/data/prices.json` en GitHub - debe tener el precio guardado
3. Revisa tu email para confirmar que llegó la notificación (después del día 3)

## Notas

- Los primeros 3 días solo guardará precios, no enviará emails
- A partir del día 4, enviará un email comparando con el precio de hace 3 días
- El archivo `prices.json` se actualiza automáticamente en el repositorio
- Todo es gratis en GitHub Actions para repositorios públicos
