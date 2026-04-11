// src/components/Hero.jsx
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';

export default function Hero() {
  const { lang } = useLang();
  const t = content.hero;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Gold glow orb — fitness side */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      {/* Silver glow orb — faith side */}
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-brand-silver/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
          {t.badge[lang]}
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-9xl font-black leading-none tracking-tighter mb-6"
        >
          <span className="text-brand-white">{t.heading1[lang]}</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #C9A96E, #D0D0D0)',
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.sub[lang]}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://wa.me/qr/YL74SQL3NHBYO1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gold hover:bg-brand-goldHov text-brand-bg font-bold px-8 py-4 rounded-full text-base transition-all duration-300 shadow-2xl hover:shadow-yellow-700/40 hover:scale-105"
          >
            {t.cta1[lang]}
          </a>
          <a
            href="#services"
            className="text-brand-light border border-brand-border hover:border-brand-gold hover:text-brand-gold font-semibold px-8 py-4 rounded-full text-base transition-all duration-300"
          >
            {t.cta2[lang]}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <span className="block w-px h-10 bg-gradient-to-b from-transparent to-brand-muted mx-auto" />
      </motion.div>
    </section>
  );
}
