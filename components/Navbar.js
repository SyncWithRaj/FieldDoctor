'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';
import { Home, CloudSun, Menu, X } from 'lucide-react';
import { HeartPulse, Leaf } from 'lucide-react';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const weatherEl = document.getElementById('weather-section');
      if (weatherEl) {
        const top = weatherEl.getBoundingClientRect().top;
        setActiveSection(top < window.innerHeight / 2 ? 'weather' : 'home');
      }
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-green-700/90 backdrop-blur-xs shadow-md' : 'bg-green-700'
        }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3 sm:py-4">
        {/* Logo */}
        <div
          onClick={() => router.push('/')}
          className={`${poppins.className} flex items-center gap-2 text-2xl sm:text-3xl font-extrabold cursor-pointer tracking-wide transition-all duration-200 hover:scale-105`}
        >
          <Leaf className="w-8 h-8 text-yellow-300" />
          <span className="bg-gradient-to-r from-yellow-300 via-white to-green-200 bg-clip-text text-transparent drop-shadow-md">
            Field<span className="text-yellow-400">Doctor</span>
          </span>
        </div>



        {/* Hamburger */}
        <button
          className="sm:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Nav Links */}
        <div
          className={`${menuOpen ? 'flex' : 'hidden'
            } sm:flex flex-col sm:flex-row gap-6 items-center absolute sm:static top-16 left-0 w-full sm:w-auto bg-green-700 sm:bg-transparent p-4 sm:p-0 z-40 sm:z-auto text-white text-sm sm:text-base font-medium transition-all duration-300`}
        >
          <button
            onClick={(e) => handleScrollClick(e, 'home')}
            className={`${poppins.className} flex items-center gap-2 relative cursor-pointer transition-all duration-300 hover:opacity-90
              after:absolute after:left-0 after:bottom-0 after:h-[2px]
              after:w-full after:bg-gradient-to-r after:from-yellow-400 after:to-white
              after:transition-transform after:duration-300 after:origin-left
              ${activeSection === 'home' ? 'after:scale-x-100' : 'after:scale-x-0'}
              hover:after:scale-x-100`}
          >
            <Home size={18} /> Home
          </button>

          <button
            onClick={(e) => handleScrollClick(e, 'weather-section')}
            className={`${poppins.className} flex items-center gap-2 relative cursor-pointer transition-all duration-300 hover:opacity-90
              after:absolute after:left-0 after:bottom-0 after:h-[2px]
              after:w-full after:bg-gradient-to-r after:from-yellow-400 after:to-white
              after:transition-transform after:duration-300 after:origin-left
              ${activeSection === 'weather' ? 'after:scale-x-100' : 'after:scale-x-0'}
              hover:after:scale-x-100`}
          >
            <CloudSun size={18} /> Weather
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;