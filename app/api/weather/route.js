import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('location') || 'Ahmedabad'; // default fallback

  const API_KEY = process.env.OPENWEATHER_API_KEY;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch weather data' },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      temperature: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      condition: data.weather[0].main,
      location: `${data.name}, ${data.sys.country}`,
    });
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Server error while fetching weather' },
      { status: 500 }
    );
  }
}
