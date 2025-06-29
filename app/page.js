'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import WeatherBox from '@/components/Weatherbox';
import VoiceAgentWidget from '@/components/VoicecallAgent';
import dynamic from 'next/dynamic';
import { Info } from 'lucide-react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

import { Mic, Lightbulb, CloudSun } from 'lucide-react'; // Icons added

const WeatherMap = dynamic(() => import('@/components/WeatherMap'), { ssr: false });

export default function Home() {
  useEffect(() => {
    const checkWeatherAndAlert = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          async ({ coords: { latitude, longitude } }) => {
            const res = await fetch(`/api/send-whatsapp?lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            if (data.alertSent) {
              console.log('📲 WhatsApp alert sent!');
            } else {
              console.log('ℹ️ No need to send alert:', data.reason);
            }
          },
          (err) => console.error('❌ Location access error:', err.message)
        );
      } catch (err) {
        console.error('❌ Unexpected error:', err.message);
      }
    };

    checkWeatherAndAlert();
  }, []);

  const handleScrollClick = (e, id) => {
    e.preventDefault();
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main
      className={`${poppins.className} min-h-screen pt-16 bg-gradient-to-br from-green-50 via-white to-green-100 text-green-900 font-sans scroll-smooth transition-all duration-500 ease-in-out`}
    >

      <VoiceAgentWidget />

      {/* Hero */}
      <section className="relative overflow-hidden text-center py-28 px-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-300 via-white to-green-500">
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-900 drop-shadow-lg animate-fade-in-down">
            🌾 Welcome to <span className="underline decoration-green-600">Field Doctor</span>
          </h1>
          <p className="text-md sm:text-xl max-w-3xl mx-auto text-green-800 mb-6 animate-fade-in-up">
            Your personal crop health assistant - Get instant AI-powered solutions by just speaking in your Native language. and you can see weather info around world and get weather alerts when seems like rain.
          </p>
          <Link href="/">
            <button onClick={(e) => handleScrollClick(e, 'weather-section')} className="mt-6 bg-green-700 hover:bg-green-900 text-white text-lg px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition">
              See Weather Info around you
            </button>
          </Link>
        </div>
        <div className="absolute inset-0 bg-[url('/farm-bg.jpg')] bg-cover bg-center opacity-10 blur-xl"></div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white text-center border-t border-green-200">

        <h2 className="text-5xl font-bold text-green-900 mb-12 animate-fade-in-up">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <Mic size={40} strokeWidth={2.2} className="text-green-700 mx-auto mb-4" />,
              title: 'Speak Naturally',
              desc: 'Just describe your crop problems in your own words. No typing needed. AI speak in your Native language',
            },
            {
              icon: <Lightbulb size={40} strokeWidth={2.2} className="text-green-700 mx-auto mb-4" />,
              title: 'Get Instant Help',
              desc: 'Our AI listens and replies with real-time treatment guidance.',
            },
            {
              icon: <CloudSun size={40} strokeWidth={2.2} className="text-green-700 mx-auto mb-4" />,
              title: 'Weather Info',
              desc: 'You can track weather info world-wide. just to hover on world map and get more weather info of specific place by click on it',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl backdrop-blur-lg bg-white/60 border border-green-100 shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 hover:scale-105"
            >
              {item.icon}
              <h3 className="text-2xl font-semibold mb-2 text-green-800">{item.title}</h3>
              <p className="text-green-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Weather Info */}
      <section
        id="weather-section"
        className="py-24 px-6 bg-gradient-to-tr from-green-100 to-white text-center border-t border-green-200 scroll-mt-24"
      >
        <h2 className="text-5xl font-bold mb-4 text-green-900 animate-fade-in-down">
          Live Weather Info
        </h2>
        <p className="text-green-700 max-w-xl mx-auto text-lg mb-10 animate-fade-in-up">
          Know what the sky says before applying treatment – get smart, localized weather data.
        </p>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          <div className="rounded-3xl bg-white/70 backdrop-blur-lg p-6 shadow-lg border border-green-100">
            <WeatherBox />
          </div>
          <div className="rounded-3xl bg-white/70 backdrop-blur-lg p-6 shadow-lg border border-green-100">
            {/* Instruction Banner */}
            {/* Instruction Banner with Icon */}
            <div className="flex items-center gap-2 bg-green-50 text-green-800 border-b border-green-200 px-6 py-3 text-sm sm:text-base font-medium shadow-sm animate-fade-in-down justify-center">
              <Info className="w-4 h-4 text-green-600" />
              <span>
                Click on the map to get weather info of that place. Hover to preview details instantly.
              </span>
            </div>

            <WeatherMap />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-6 px-4 text-center text-sm sm:text-base border-t border-green-300">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="opacity-90">
            &copy; {new Date().getFullYear()} <strong>Field Doctor</strong>
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
