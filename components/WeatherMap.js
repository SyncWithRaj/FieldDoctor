'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';

// Custom Leaflet Marker Icon (using default marker from Leaflet CDN)
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function WeatherMap() {
  const [position, setPosition] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
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

  const LocationClicker = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <div className="h-auto w-full max-w-6xl mx-auto mt-10 transition-all duration-300">
      {/* Map Container */}
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

          {/* Weather Overlay Layer */}
          <TileLayer
            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`}
          />

          <LocationClicker />

          {position && (
            <Marker position={position} icon={customIcon}>
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
        </MapContainer>
      </div>

      {/* Weather Info Card */}
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
