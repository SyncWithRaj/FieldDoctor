// ✅ app/api/send-whatsapp/route.js
import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  let city = searchParams.get('location'); // fallback if no geo

  const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    ALERT_PHONE,
    OPENWEATHER_API_KEY,
  } = process.env;

  try {
    // 🧭 Get city from lat/lon
    if (lat && lon) {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${OPENWEATHER_API_KEY}`
      );
      const geoData = await geoRes.json();

      if (!Array.isArray(geoData) || !geoData[0]?.name) {
        console.warn('⚠️ Reverse geocoding failed or city not found:', geoData);
        city = 'Ahmedabad'; // fallback
      } else {
        city = geoData[0].name;
      }
    }

    // ☁️ Weather API Call
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    const data = await weatherRes.json();

    // const weather = 'Rain';
    // const temp = 9;
    const weather = data.weather?.[0]?.main ?? 'Clear';
    const temp = data.main?.temp ?? 25;


    if (weather === 'Rain' || temp < 10) {
      const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
      const message = `🌧️ Alert: Aaj ${city} mein ${weather} hai aur temperature ${temp}°C hai. Kripya apni kheti surakshit rakhein.`;

      const res = await client.messages.create({
        body: message,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${ALERT_PHONE}`,
      });

      return NextResponse.json({
        success: true,
        sid: res.sid,
        weather,
        temp,
        city,
        message: '✅ WhatsApp alert sent successfully.',
      });
    }

    return NextResponse.json({
      success: true,
      alertSent: false,
      weather,
      temp,
      city,
      reason: 'Weather is clear. No alert needed.',
    });

  } catch (err) {
    console.error('❌ Auto alert failed:', err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
