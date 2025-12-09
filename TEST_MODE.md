# 🧪 Modo de Prueba - Email cada 1 minuto

## Propósito

Este modo te permite probar el envío de emails sin esperar 3 días. El script:
- ✅ Se ejecuta cada 1 minuto automáticamente
- ✅ Simula un precio anterior (2% menos que el actual)
- ✅ Envía un email cada minuto con la comparación
- ✅ Perfecto para verificar que Resend funciona correctamente

## Requisitos

Antes de ejecutar el modo test, asegúrate de tener configurado tu archivo `.env`:

```env
RESEND_API_KEY=re_tu_api_key_aqui
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=tu-email@ejemplo.com
```

## Cómo ejecutar

```bash
pnpm test
```

## Qué esperar

1. **Ejecución inmediata**: El script se ejecuta al iniciar
2. **Email cada minuto**: Recibirás un email cada 60 segundos
3. **Precio simulado**: Compara el precio actual con un precio 2% menor (simulado)
4. **Logs en consola**: Verás el progreso en tiempo real

### Ejemplo de salida:

```
🧪 Modo TEST - Obteniendo precio actual de TRX...
Precio actual: $0.281096
Precio guardado en el archivo local.
Precio simulado (hace 1 minuto): $0.275474
📧 Enviando email de prueba...
✅ Email enviado exitosamente!
📬 Revisa tu email: tu-email@ejemplo.com

⏰ Configurado para ejecutar cada 1 minuto...
⚠️  Presiona Ctrl+C para detener

--- Nueva ejecución ---
🧪 Modo TEST - Obteniendo precio actual de TRX...
...
```

## Detener el test

Presiona `Ctrl+C` en la terminal para detener el script.

## Verificar emails

1. Revisa tu bandeja de entrada
2. Busca emails de `onboarding@resend.dev` (o tu dominio configurado)
3. El asunto será: `📈 TRX Price Update - más caro` o `📉 TRX Price Update - más barato`

## Límites de Resend

Recuerda que el plan gratuito de Resend tiene:
- ✅ 100 emails/día
- ✅ 3,000 emails/mes

**⚠️ No dejes el test corriendo mucho tiempo** para no agotar tu cuota.

## Después del test

Una vez verificado que funciona:

1. Detén el script (`Ctrl+C`)
2. Usa el comando normal para producción:
   ```bash
   pnpm start
   ```
3. Configura GitHub Actions para ejecución diaria automática

## Diferencias con el modo normal

| Característica | Modo Normal | Modo Test |
|----------------|-------------|-----------|
| Frecuencia | Manual / 1 vez al día | Cada 1 minuto |
| Comparación | Precio de hace 3 días | Precio simulado (-2%) |
| Envío de email | Solo si hay datos de hace 3 días | Siempre |
| Uso | Producción | Pruebas |

## Troubleshooting

### No recibo emails

1. Verifica que `RESEND_API_KEY` sea correcta
2. Verifica que `EMAIL_TO` sea tu email real
3. Revisa la carpeta de spam
4. Verifica en el dashboard de Resend si los emails se enviaron

### Error de API Key

```
❌ Error: Configura las variables de entorno RESEND_API_KEY y EMAIL_TO
```

Solución: Crea el archivo `.env` con tus credenciales de Resend.

### Error de módulo

```
Cannot find module 'resend'
```

Solución: Ejecuta `pnpm install`
