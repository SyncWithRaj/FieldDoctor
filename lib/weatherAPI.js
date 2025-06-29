export async function getWeatherData(city) {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  if (!res.ok) throw new Error('Failed to fetch weather');

  return await res.json();
}
