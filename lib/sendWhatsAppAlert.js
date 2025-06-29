// lib/sendWhatsAppAlert.js
import twilio from 'twilio';

export async function sendWhatsAppAlert(message) {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    const res = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.ALERT_PHONE,
      body: message,
    });

    console.log('✅ WhatsApp alert sent:', res.sid);
    return { success: true, sid: res.sid };
  } catch (error) {
    console.error('❌ WhatsApp alert failed:', error.message);
    return { success: false, error: error.message };
  }
}
