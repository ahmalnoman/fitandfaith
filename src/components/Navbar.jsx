// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';
import logo from '../assets/logo.png';

export default function Navbar() {
  const { lang, toggle } = useLang();
  const t = content.nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-brand-bg/95 backdrop-blur-md border-b border-brand-border shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <img src={logo} alt="Fit and Faith Logo" className="h-10 w-auto" />

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['home', 'services', 'contact'].map(key => (
            <a
              key={key}
              href={`#${key}`}
              className="text-brand-muted hover:text-brand-white transition-colors duration-200 text-sm font-medium tracking-wide uppercase"
            >
              {t[key][lang]}
            </a>
          ))}
        </div>

        {/* Right: Language Toggle + WhatsApp CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xs font-semibold border border-brand-border text-brand-muted hover:text-brand-gold hover:border-brand-gold rounded-full px-4 py-2 transition-all duration-200"
          >
            {t.toggleLang[lang]}
          </button>
          <a
            href="https://wa.me/message/SYHAEEMXHMMSA1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gold hover:bg-brand-goldHov text-brand-bg text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-yellow-700/30"
          >
            {t.contact[lang]}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-brand-light p-2"
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-current mb-1" />
          <span className="block w-6 h-0.5 bg-current mb-1" />
          <span className="block w-4 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-surface border-t border-brand-border px-6 py-6 flex flex-col gap-4">
          {['home', 'services', 'contact'].map(key => (
            <a
              key={key}
              href={`#${key}`}
              onClick={() => setMenuOpen(false)}
              className="text-brand-light text-lg font-medium"
            >
              {t[key][lang]}
            </a>
          ))}
          <button onClick={toggle} className="text-brand-gold font-semibold text-left mt-2">
            {t.toggleLang[lang]}
          </button>
          <a
            href="https://wa.me/message/SYHAEEMXHMMSA1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gold text-white text-center font-semibold px-5 py-3 rounded-full mt-2"
          >
            {t.contact[lang]}
          </a>
        </div>
      )}
    </nav>
  );
}
