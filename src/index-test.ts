import 'dotenv/config';
import { getCurrentPrice } from './services/priceService';
import { addPrice, getPriceFromDaysAgo } from './services/storageService';
import { sendEmail, EmailConfig } from './services/emailService';

async function runTest() {
    try {
        console.log('🧪 Modo TEST - Obteniendo precio actual de TRX...');
        const currentPrice = await getCurrentPrice();
        console.log(`Precio actual: $${currentPrice}`);

        addPrice(currentPrice);
        console.log('Precio guardado en el archivo local.');

        // En modo test, usamos el precio de hace 1 minuto (mismo día)
        // Para simular, usamos un precio ligeramente diferente
        const simulatedOldPrice = currentPrice * 0.98; // Simula 2% menos

        console.log(`Precio simulado (hace 1 minuto): $${simulatedOldPrice}`);

        const emailConfig: EmailConfig = {
            apiKey: process.env.RESEND_API_KEY || '',
            from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
            to: process.env.EMAIL_TO || '',
        };

        if (!emailConfig.apiKey || !emailConfig.to) {
            console.error('❌ Error: Configura las variables de entorno RESEND_API_KEY y EMAIL_TO');
            console.log('\nCrea un archivo .env con:');
            console.log('RESEND_API_KEY=re_tu_api_key');
            console.log('EMAIL_FROM=onboarding@resend.dev');
            console.log('EMAIL_TO=tu-email@ejemplo.com');
            return;
        }

        console.log('📧 Enviando email de prueba...');
        await sendEmail(emailConfig, currentPrice, simulatedOldPrice);
        console.log('✅ Email enviado exitosamente!');
        console.log(`📬 Revisa tu email: ${emailConfig.to}`);
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// Ejecutar inmediatamente
runTest();

// Ejecutar cada minuto
console.log('⏰ Configurado para ejecutar cada 1 minuto...');
console.log('⚠️  Presiona Ctrl+C para detener\n');

setInterval(() => {
    console.log('\n--- Nueva ejecución ---');
    runTest();
}, 60000); // 60000ms = 1 minuto
