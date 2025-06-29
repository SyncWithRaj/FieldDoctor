'use client';

import { useEffect, useState } from 'react';

export default function WeatherBox() {
  const [weather, setWeather] = useState(null);
  const [selectedState, setSelectedState] = useState('Gujarat');
  const [selectedCity, setSelectedCity] = useState('Ahmedabad');
  const [loading, setLoading] = useState(false);

  const statesWithCities = {
    Gujarat: ['Ahmedabad', 'Surat', 'Rajkot'],
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    Delhi: ['New Delhi'],
    Karnataka: ['Bengaluru', 'Mysuru'],
    WestBengal: ['Kolkata', 'Howrah'],
  };

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/weather?location=${city}`);
      const data = await res.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  const items = weather && [
    { icon: '🌡️', label: 'Temperature', value: `${weather.temperature}°C` },
    { icon: '💧', label: 'Humidity', value: `${weather.humidity}%` },
    { icon: '🌬️', label: 'Wind', value: `${weather.wind} km/h` },
    { icon: '☁️', label: 'Condition', value: weather.condition },
  ];

  return (
    <div className="backdrop-blur-md bg-green-50/60 border border-green-200 rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-500 max-w-3xl mx-auto mt-10">
      {/* Title & Selections */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-green-800 text-center tracking-wide">
          🌤️ Weather in
        </h2>

        {/* State Select */}
        <select
          value={selectedState}
          onChange={(e) => {
            const state = e.target.value;
            setSelectedState(state);
            setSelectedCity(statesWithCities[state][0]); // auto-select 1st city
          }}
          className="px-4 py-2 rounded-lg border border-green-300 text-green-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        >
          {Object.keys(statesWithCities).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City Select */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="px-4 py-2 rounded-lg border border-green-300 text-green-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        >
          {statesWithCities[selectedState].map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Weather Info */}
      {loading ? (
        <p className="text-center text-green-700 font-semibold animate-pulse">
          Fetching weather for {selectedCity}...
        </p>
      ) : weather ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center transition duration-300 transform hover:scale-105 hover:text-green-900"
            >
              <span className="text-3xl sm:text-4xl mb-2 transition duration-300 hover:rotate-12">
                {item.icon}
              </span>
              <span className="text-lg font-semibold">{item.value}</span>
              <span className="text-sm text-green-600">{item.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-red-600">Weather data not available.</p>
      )}
    </div>
  );
}
