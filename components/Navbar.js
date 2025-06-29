'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const weatherEl = document.getElementById('weather-section');
      if (weatherEl) {
        const top = weatherEl.getBoundingClientRect().top;
        if (top < window.innerHeight / 2) {
          setActiveSection('weather');
        } else {
          setActiveSection('home');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // trigger on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-green-700 text-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <div
          onClick={() => router.push('/')}
          className={`${poppins.className} text-2xl sm:text-3xl font-bold cursor-pointer transition-transform hover:scale-105 tracking-wide`}
        >
          🌱 <span className="text-white drop-shadow">Field<span className="text-yellow-300">Doctor</span></span>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center text-sm sm:text-base">
          <Link
            href="/"
            className={`pb-1 relative transition-opacity duration-300 hover:opacity-90
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px]
              after:w-full after:scale-x-0 after:bg-white after:origin-left after:transition-transform
              after:duration-300 hover:after:scale-x-100
              ${activeSection === 'home' ? 'after:scale-x-100' : ''}`}
          >
            Home
          </Link>

          <a
            href="#weather-section"
            onClick={(e) => handleScrollClick(e, 'weather-section')}
            className={`pb-1 relative transition-opacity duration-300 hover:opacity-90
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px]
              after:w-full after:scale-x-0 after:bg-white after:origin-left after:transition-transform
              after:duration-300 hover:after:scale-x-100
              ${activeSection === 'weather' ? 'after:scale-x-100' : ''}`}
          >
            Weather
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;