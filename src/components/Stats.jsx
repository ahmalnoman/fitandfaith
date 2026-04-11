// src/components/Stats.jsx
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';

export default function Stats() {
  const { lang } = useLang();

  return (
    <section className="py-12 px-6 border-y border-brand-border bg-brand-surface">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {content.stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div
              className="text-4xl md:text-5xl font-black mb-1"
              style={{
                background: 'linear-gradient(135deg, #C9A96E, #D0D0D0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {stat.value}
            </div>
            <div className="text-brand-muted text-sm font-medium">
              {stat.label[lang]}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
