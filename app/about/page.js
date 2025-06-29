'use client';

import { Leaf, Mic, Sun, AlertCircle } from 'lucide-react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default function AboutPage() {
  return (
    <main className={`min-h-screen bg-gradient-to-b from-green-50 to-white text-green-900 ${poppins.className}`}>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center bg-gradient-to-tr from-green-200 via-white to-green-100 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-900 animate-fade-in-down">
            About <span className="underline decoration-green-500">FieldDoctor</span>
          </h1>
          <p className="text-xl sm:text-2xl text-green-800 mt-4 animate-fade-in-up">
            Empowering farmers with AI-driven crop care in their native languages and real-time weather alerts.
          </p>
        </div>
        <div className="absolute inset-0 bg-[url('/farm-bg.jpg')] opacity-10 bg-cover bg-center blur-sm"></div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 animate-fade-in-up">
              <Leaf className="text-green-700" /> Our Mission
            </h2>
            <p className="text-green-800 leading-relaxed text-lg">
              We aim to bridge the gap between rural agriculture and modern technology. FieldDoctor assists
              farmers in diagnosing crop issues, suggesting immediate treatments, and sending live weather alerts
              — from village farms to global conditions.
            </p>
          </div>
          <img
            src="https://www.jumpstartmag.com/wp-content/uploads/2024/06/Untitled-design-2024-06-28T105427.018.png"
            alt="Helping farmers"
            className="rounded-2xl shadow-xl w-full h-71 object-contain bg-white border border-green-200"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-white to-green-50 border-t border-green-200 px-6">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 animate-fade-in-down">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
          {[
            {
              icon: <Mic className="text-green-700 drop-shadow-glow" size={42} />,
              title: 'Voice-Based Input',
              desc: 'Speak in your native language to get instant AI support for crop issues.',
            },
            {
              icon: <Sun className="text-yellow-600 drop-shadow-glow" size={42} />,
              title: 'Weather Integration',
              desc: 'Live weather updates around the world & rainfall alerts for your exact location.',
            },
            {
              icon: <AlertCircle className="text-red-600 drop-shadow-glow" size={42} />,
              title: 'WhatsApp Alerts',
              desc: 'Get crop safety tips and weather warnings directly via WhatsApp.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white shadow-xl border border-green-100 hover:shadow-2xl transition-all hover:-translate-y-2 hover:scale-105"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">{item.title}</h3>
              <p className="text-green-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Words */}
      <section className="py-20 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 animate-fade-in-up">Why FieldDoctor?</h2>
        <p className="text-green-800 text-lg sm:text-xl leading-relaxed">
          India’s farmers are the heart of our land. With FieldDoctor, we bring them the power of AI - not just to solve
          problems but to prevent them. Together, we’re cultivating a future that’s smarter, safer and more resilient. 🇮🇳
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-6 px-4 text-center text-sm sm:text-base border-t border-green-300">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="opacity-90">
            &copy; {new Date().getFullYear()} <strong>FieldDoctor</strong>
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
