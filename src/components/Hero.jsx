// src/components/Hero.jsx
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';
import logo from '../assets/logo.png';

export default function Hero() {
  const { lang } = useLang();
  const t = content.hero;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* ── Background grid ── */}
      <div className="absolute inset-0 hero-grid" />

      {/* ── Noise grain overlay ── */}
      <div className="absolute inset-0 noise-overlay" />

      {/* ── Logo deep watermark ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="w-[680px] max-w-[90vw] animate-float"
          style={{
            opacity: 0.055,
            mixBlendMode: 'screen',
            filter: 'grayscale(20%) brightness(1.5)',
          }}
        />
      </div>

      {/* ── Glow orbs ── */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none orb-pulse"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none orb-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(208,208,208,0.06) 0%, transparent 70%)',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.03) 0%, transparent 65%)' }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-brand-gold/30 bg-brand-gold/8 text-brand-gold text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-8"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse-slow" />
          {t.badge[lang]}
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl sm:text-8xl md:text-[10rem] font-black leading-none tracking-tighter mb-6"
        >
          <span className="text-brand-white">{t.heading1[lang]}</span>
          <br />
          <span
            className="stat-glow"
            style={{
              background: 'linear-gradient(135deg, #C9A96E 30%, #E8D5A3 50%, #D0D0D0 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t.heading2[lang]}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t.sub[lang]}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://wa.me/message/SYHAEEMXHMMSA1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer text-brand-bg font-bold px-10 py-4 rounded-full text-base transition-all duration-300 shadow-2xl hover:shadow-yellow-700/50 hover:scale-105"
          >
            {t.cta1[lang]}
          </a>
          <a
            href="#services"
            className="group text-brand-light border border-[#2a2a2a] hover:border-brand-gold/40 hover:text-brand-gold font-semibold px-10 py-4 rounded-full text-base transition-all duration-300"
            style={{ backdropFilter: 'blur(6px)', background: 'rgba(255,255,255,0.02)' }}
          >
            {t.cta2[lang]}
          </a>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-brand-muted text-[10px] tracking-widest uppercase">scroll</span>
        <span className="block w-px h-10 bg-gradient-to-b from-brand-muted/60 to-transparent" />
      </motion.div>
    </section>
  );
}
