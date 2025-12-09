import * as nodemailer from 'nodemailer';

export interface EmailConfig {
    user: string;
    pass: string;
    to: string;
}

export async function sendEmail(
    config: EmailConfig,
    currentPrice: number,
    oldPrice: number
): Promise<void> {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.user,
            pass: config.pass,
        },
    });

    const difference = currentPrice - oldPrice;
    const status = difference > 0 ? 'más caro' : difference < 0 ? 'más barato' : 'igual';
    const percentChange = ((difference / oldPrice) * 100).toFixed(2);

    const mailOptions = {
        from: config.user,
        to: config.to,
        subject: `TRX Price Update - ${status}`,
        html: `
      <h2>TRX Price Tracker</h2>
      <p><strong>Precio actual:</strong> $${currentPrice.toFixed(6)}</p>
      <p><strong>Precio hace 3 días:</strong> $${oldPrice.toFixed(6)}</p>
      <p><strong>Estado:</strong> ${status}</p>
      <p><strong>Cambio:</strong> ${difference > 0 ? '+' : ''}${difference.toFixed(6)} (${percentChange}%)</p>
    `,
    };

    await transporter.sendMail(mailOptions);
}
