// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';
import logo from '../assets/logo.png';

export default function Navbar() {
  const { lang, toggle } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const t = content.nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (key) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(key);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(key);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-4'
      }`}
      style={
        scrolled
          ? {
              background: 'rgba(8,8,8,0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(201,169,110,0.1)',
              boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
            }
          : {}
      }
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <img
          src={logo}
          alt="Fit and Faith Logo"
          className="h-10 w-auto cursor-pointer"
          onClick={() => navigate('/')}
        />

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['home', 'services', 'contact'].map((key) => (
            <button
              key={key}
              onClick={() => handleNavClick(key)}
              className="text-brand-muted hover:text-brand-white transition-colors duration-200 text-xs font-semibold tracking-widest uppercase relative group cursor-pointer"
            >
              {t[key][lang]}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xs font-semibold border border-[#2a2a2a] hover:border-brand-gold/40 text-brand-muted hover:text-brand-gold rounded-full px-4 py-2 transition-all duration-200"
            style={{ backdropFilter: 'blur(6px)' }}
          >
            {t.toggleLang[lang]}
          </button>
          <a
            href="https://wa.me/message/SYHAEEMXHMMSA1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer text-brand-bg text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-yellow-700/30 hover:scale-105"
          >
            {t.contact[lang]}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-brand-light p-2 flex flex-col gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-4'}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-6 flex flex-col gap-4"
          style={{
            background: 'rgba(8,8,8,0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(201,169,110,0.1)',
          }}
        >
          {['home', 'services', 'contact'].map((key) => (
            <button
              key={key}
              onClick={() => { setMenuOpen(false); handleNavClick(key); }}
              className="text-brand-light text-base font-medium tracking-wide hover:text-brand-gold transition-colors text-left cursor-pointer"
            >
              {t[key][lang]}
            </button>
          ))}
          <button onClick={toggle} className="text-brand-gold font-semibold text-left mt-1 text-sm">
            {t.toggleLang[lang]}
          </button>
          <a
            href="https://wa.me/message/SYHAEEMXHMMSA1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer text-brand-bg text-center font-bold px-5 py-3 rounded-full mt-2 text-sm"
          >
            {t.contact[lang]}
          </a>
        </div>
      )}
    </nav>
  );
}
