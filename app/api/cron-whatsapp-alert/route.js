import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('location') || 'Ahmedabad';

  const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER, // not used but can be kept
    ALERT_PHONE,
    OPENWEATHER_API_KEY
  } = process.env;

  try {
    // Fetch weather
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    if (!weatherRes.ok) {
      return NextResponse.json(
        { success: false, error: 'Invalid city or Weather API failed.' },
        { status: weatherRes.status }
      );
    }

    const data = await weatherRes.json();
    const weather = data.weather[0].main;
    const temp = data.main.temp;

    // Check condition
    if (weather === 'Rain' || temp < 10) {
      const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
      const message = `🌧️ Alert: Aaj ${city} mein ${weather} hai aur temperature ${temp}°C hai. Kripya apni kheti surakshit rakhein.`;

      const res = await client.messages.create({
        body: message,
        from: 'whatsapp:+14155238886', // Twilio sandbox sender
        to: `whatsapp:${ALERT_PHONE}`,  // Your verified phone number
      });

      return NextResponse.json({
        success: true,
        sid: res.sid,
        weather,
        temp,
        message: 'WhatsApp alert sent successfully.'
      });
    }

    // No alert needed
    return NextResponse.json({
      success: true,
      alertSent: false,
      weather,
      temp,
      reason: 'Weather is clear. No alert needed.'
    });

  } catch (err) {
    console.error('❌ Auto alert failed:', err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
