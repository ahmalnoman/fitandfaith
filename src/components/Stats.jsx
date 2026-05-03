// src/components/Stats.jsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';

function CountUp({ target, suffix = '', duration = 1800 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now) => {
              const t = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(target * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setValue(target);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  const display = Number.isInteger(target) ? Math.round(value) : value.toFixed(1);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function StatValue({ value }) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (match) {
    return <CountUp target={parseFloat(match[1])} suffix={match[2]} />;
  }
  return <span>{value}</span>;
}

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
            <div
              className="rounded-2xl px-4 py-6 border border-transparent transition-all duration-300 group-hover:border-brand-gold/15"
              style={{ background: 'rgba(255,255,255,0.015)' }}
            >
              <div className="text-4xl md:text-5xl font-black mb-2 heading-shine">
                <StatValue value={stat.value} />
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
