'use client';

import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMapEvents,
} from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function WeatherMap() {
  const [clickPos, setClickPos] = useState(null);
  const [hoverPos, setHoverPos] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [hoverWeather, setHoverWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🌀 Debounced hover fetch
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (!hoverPos) return;
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${hoverPos.lat}&lon=${hoverPos.lng}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
        );
        const data = await res.json();
        setHoverWeather({
          temp: data.main.temp,
          condition: data.weather[0].description,
        });
      } catch (err) {
        console.error('❌ Hover fetch error:', err);
        setHoverWeather(null);
      }
    }, 600); // debounce delay

    return () => clearTimeout(timeoutId);
  }, [hoverPos]);

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setClickPos([lat, lng]);
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
      );
      const data = await res.json();

      setWeatherData({
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        condition: data.weather[0].description,
        location: data.name || 'Selected Location',
      });
    } catch (error) {
      console.error('Failed to fetch weather:', error);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const MapEventHandlers = () => {
    useMapEvents({
      click: handleMapClick,
      mousemove: (e) => setHoverPos(e.latlng),
    });
    return null;
  };

  return (
    <div className="h-auto w-full max-w-6xl mx-auto mt-10 transition-all duration-300">
      <div className="rounded-2xl overflow-hidden shadow-lg border border-green-200">
        <MapContainer
          center={[23.0225, 72.5714]}
          zoom={5}
          className="h-[400px] w-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <TileLayer
            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`}
          />

          <MapEventHandlers />

          {/* Marker on Click */}
          {clickPos && (
            <Marker position={clickPos} icon={customIcon}>
              <Popup>
                {loading ? (
                  <span>Loading...</span>
                ) : weatherData ? (
                  <div className="text-sm text-green-800">
                    <strong>{weatherData.location}</strong><br />
                    🌡️ Temp: {weatherData.temp}°C<br />
                    💧 Humidity: {weatherData.humidity}%<br />
                    🌬️ Wind: {weatherData.wind} km/h<br />
                    ☁️ {weatherData.condition}
                  </div>
                ) : (
                  <span>Weather info not available</span>
                )}
              </Popup>
            </Marker>
          )}

          {/* Hover Tooltip */}
          {hoverPos && hoverWeather && (
            <Marker
              position={[hoverPos.lat, hoverPos.lng]}
              icon={L.divIcon({ className: 'invisible' })}
            >
              <Tooltip direction="top" permanent offset={[0, -30]}>
                <div className="text-green-800 text-xs">
                  🌡 {hoverWeather.temp}°C<br />
                  ☁️ {hoverWeather.condition}
                </div>
              </Tooltip>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Detailed Info Below Map */}
      {weatherData && !loading && (
        <div className="bg-green-100 border border-green-300 p-6 mt-6 rounded-2xl shadow-md text-center max-w-md mx-auto transition-all duration-500 animate-fade-in">
          <h3 className="text-xl font-bold text-green-900 mb-2">{weatherData.location}</h3>
          <div className="grid grid-cols-2 gap-4 text-green-800 text-sm sm:text-base">
            <p>🌡️ Temperature: <strong>{weatherData.temp}°C</strong></p>
            <p>💧 Humidity: <strong>{weatherData.humidity}%</strong></p>
            <p>🌬️ Wind: <strong>{weatherData.wind} km/h</strong></p>
            <p>☁️ Condition: <strong className="capitalize">{weatherData.condition}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
}
