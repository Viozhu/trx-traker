import 'dotenv/config';
import { getCurrentPrice } from './services/priceService';
import { addPrice, getPriceFromDaysAgo } from './services/storageService';
import { sendEmail, EmailConfig } from './services/emailService';

async function main() {
    try {
        console.log('Obteniendo precio actual de TRX...');
        const currentPrice = await getCurrentPrice();
        console.log(`Precio actual: $${currentPrice}`);

        addPrice(currentPrice);
        console.log('Precio guardado en el archivo local.');

        const priceThreeDaysAgo = getPriceFromDaysAgo(3);

        if (priceThreeDaysAgo === null) {
            console.log('No hay datos de hace 3 días. Ejecuta el script durante varios días para acumular datos.');
            return;
        }

        console.log(`Precio hace 3 días: $${priceThreeDaysAgo}`);

        const emailConfig: EmailConfig = {
            apiKey: process.env.RESEND_API_KEY || '',
            from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
            to: process.env.EMAIL_TO || '',
        };

        if (!emailConfig.apiKey || !emailConfig.to) {
            console.error('Error: Configura las variables de entorno RESEND_API_KEY y EMAIL_TO');
            return;
        }

        await sendEmail(emailConfig, currentPrice, priceThreeDaysAgo);
        console.log('Email enviado exitosamente.');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
