'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import WeatherBox from '@/components/Weatherbox';
import VoiceAgentWidget from '@/components/VoicecallAgent';
import dynamic from 'next/dynamic';

const WeatherMap = dynamic(() => import('@/components/WeatherMap'), { ssr: false });
const sendWhatsAppAlert = async () => {
  try {
    // Step 1: Get user's location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Call API to reverse geocode and send weather alert
        const res = await fetch(`/api/send-whatsapp?lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        console.log(data);
      },
      (err) => {
        console.error('❌ Location error:', err.message);
      }
    );

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
};


export default function Home() {


  useEffect(() => {
    const checkWeatherAndAlert = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`/api/send-whatsapp?lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            console.log('🌤️ Weather check result:', data);

            // ✅ Trigger only if needed
            if (data.alertSent) {
              console.log('📲 WhatsApp alert sent!');
            } else {
              console.log('ℹ️ No need to send alert:', data.reason);
            }
          },
          (err) => {
            console.error('❌ Location access error:', err.message);
          }
        );
      } catch (err) {
        console.error('❌ Unexpected error in weather alert:', err.message);
      }
    };

    checkWeatherAndAlert();
  }, []);



  return (
    <main className="min-h-screen bg-white text-green-900 font-sans scroll-smooth transition-all duration-500 ease-in-out">
      {/* Voice Agent */}
      <VoiceAgentWidget />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-br from-green-100 to-green-200 transition-all duration-700 ease-in-out">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight leading-tight animate-fade-in-down">
          🌾 Welcome to <span className="text-green-800">Field Doctor</span>
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl text-green-700 mb-6 animate-fade-in-up">
          Your personal crop health assistant. Speak in Hindi and get instant voice-based treatment help.
        </p>
        <Link href="/">
          <button className="mt-4 bg-green-700 hover:bg-green-800 transition duration-300 text-white font-medium py-3 px-6 rounded-full text-base sm:text-lg shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
            🎤 Start Voice Consultation
          </button>
        </Link>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 bg-white text-center transition-all duration-500">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-green-900 animate-fade-in-up">
          🧠 How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: '🎤 Speak Naturally',
              desc: 'Just talk! No typing required. Describe your crop issues in your own words.',
            },
            {
              title: '💡 Get Guidance',
              desc: 'AI listens and responds with treatment tips and remedies in real time.',
            },
            {
              title: '🌦️ Weather-Smart',
              desc: 'Solutions consider your local weather for better accuracy.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-green-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2 text-green-800">{item.title}</h3>
              <p className="text-green-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Weather Section */}
      <section
        id="weather-section"
        className="px-6 py-20 bg-gradient-to-br from-green-50 to-white text-center transition-all duration-700"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-green-900 animate-fade-in-down">
          🌦️ Live Weather Info
        </h2>
        <p className="text-green-700 mb-6 max-w-xl mx-auto text-base sm:text-lg animate-fade-in-up">
          Before applying any remedy, check real-time weather for better results.
        </p>
        <div className="flex flex-col gap-6">
          <WeatherBox />
          <WeatherMap />
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-green-800 text-white text-center py-6 px-4 text-sm sm:text-base tracking-wide shadow-inner transition-all duration-500">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="opacity-90">
            &copy; {new Date().getFullYear()} <strong className="font-semibold">Field Doctor</strong>
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="opacity-90">
            Made with ❤️ for <span className="text-yellow-300 font-medium">Farmers</span> 🇮🇳
          </span>
        </div>
      </footer>
    </main>
  );
}
