// src/components/Stats.jsx
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';

export default function Stats() {
  const { lang } = useLang();

  return (
    <section className="relative py-14 px-6 overflow-hidden">
      {/* Subtle border lines with gradient fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderImage: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.25), transparent) 1',
        }}
      />
      {/* Glass background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(201,169,110,0.02) 0%, rgba(10,10,10,0.95) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {content.stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative group"
          >
            {/* Card bg */}
            <div
              className="rounded-2xl px-4 py-6 border border-transparent transition-all duration-300 group-hover:border-brand-gold/15"
              style={{ background: 'rgba(255,255,255,0.015)' }}
            >
              <div
                className="text-4xl md:text-5xl font-black mb-2 stat-glow"
                style={{
                  background: 'linear-gradient(135deg, #C9A96E 20%, #E8D5A3 50%, #D0D0D0 80%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </div>
              <div className="text-brand-muted text-xs font-medium tracking-wide uppercase">
                {stat.label[lang]}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
