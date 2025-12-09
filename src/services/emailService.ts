import { Resend } from 'resend';

export interface EmailConfig {
  apiKey: string;
  from: string;
  to: string;
}

export async function sendEmail(
  config: EmailConfig,
  currentPrice: number,
  oldPrice: number
): Promise<void> {
  const resend = new Resend(config.apiKey);

  const difference = currentPrice - oldPrice;
  const status = difference > 0 ? '더 비쌈' : difference < 0 ? '더 저렴함' : '동일함';
  const percentChange = ((difference / oldPrice) * 100).toFixed(2);
  const arrow = difference > 0 ? '📈' : difference < 0 ? '📉' : '➡️';

  await resend.emails.send({
    from: config.from,
    to: config.to,
    subject: `${arrow} TRX 가격 업데이트 - ${status}`,
    html: `
      <div style="font-family: 'Malgun Gothic', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">🪙 TRX 가격 추적기</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="font-size: 16px; margin: 10px 0;">
            <strong>현재 가격:</strong> 
            <span style="color: #2563eb; font-size: 20px;">$${currentPrice.toFixed(6)}</span>
          </p>
          <p style="font-size: 16px; margin: 10px 0;">
            <strong>3일 전 가격:</strong> 
            <span style="color: #64748b;">$${oldPrice.toFixed(6)}</span>
          </p>
          <p style="font-size: 16px; margin: 10px 0;">
            <strong>상태:</strong> 
            <span style="color: ${difference > 0 ? '#16a34a' : difference < 0 ? '#dc2626' : '#64748b'}; font-weight: bold;">
              ${status.toUpperCase()}
            </span>
          </p>
          <p style="font-size: 16px; margin: 10px 0;">
            <strong>변화:</strong> 
            <span style="color: ${difference > 0 ? '#16a34a' : difference < 0 ? '#dc2626' : '#64748b'};">
              ${difference > 0 ? '+' : ''}${difference.toFixed(6)} (${percentChange}%)
            </span>
          </p>
        </div>
        <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
          TRX 추적기에서 자동으로 전송됨
        </p>
      </div>
    `,
  });
}
