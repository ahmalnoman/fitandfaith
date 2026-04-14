// src/components/Transformations.jsx
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';

import moe from '../assets/transformations/moe.jpeg';
import aseelFront from '../assets/transformations/aseel-front.jpeg';
import aseelBack from '../assets/transformations/aseel-back.jpeg';
import abdumageed1 from '../assets/transformations/abdumageed-1.jpeg';
import abdumageed2 from '../assets/transformations/abdumageed-2.jpeg';

const imageMap = {
  'moe': moe,
  'aseel-front': aseelFront,
  'aseel-back': aseelBack,
  'abdumageed-1': abdumageed1,
  'abdumageed-2': abdumageed2,
};

function TransformationCard({ item, index, lang }) {
  const primary = imageMap[item.images[0]];
  const secondary = item.images[1] ? imageMap[item.images[1]] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
      className="transformation-card group relative rounded-2xl overflow-hidden bg-[#0C0C0C] border border-[#1F1F1F] hover:border-brand-gold/30 transition-all duration-500"
    >
      {/* Image stage */}
      <div className="relative aspect-square overflow-hidden bg-black">
        {/* Primary image (default visible) */}
        <img
          src={primary}
          alt={`${item.name.en} — before and after`}
          loading="lazy"
          className="transformation-img transformation-img--primary absolute inset-0 w-full h-full object-cover transition-all duration-[600ms] ease-out"
        />

        {/* Secondary image — only for cards with 2 photos, revealed on hover */}
        {secondary && (
          <img
            src={secondary}
            alt={`${item.name.en} — alternate view`}
            loading="lazy"
            className="transformation-img transformation-img--secondary absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-[600ms] ease-out"
          />
        )}

        {/* Gradient bottom scrim so text stays legible */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Caption */}
      <div className="relative z-10 px-6 py-5 flex items-center justify-between gap-4">
        <h3 className="text-2xl font-black text-brand-white tracking-tight">
          {item.name[lang]}
        </h3>
        <div className="inline-flex items-center gap-1.5 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
          <Clock className="w-3 h-3" />
          {item.duration[lang]}
        </div>
      </div>
    </motion.div>
  );
}

export default function Transformations() {
  const { lang } = useLang();
  const t = content.transformations;

  return (
    <section id="transformations" className="relative py-28 px-6 overflow-hidden">
      {/* Background glow — matches Services */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,169,110,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 border border-brand-gold/20 bg-brand-gold/5 text-brand-gold text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
          >
            <span className="w-1 h-1 rounded-full bg-brand-gold" />
            {t.badge[lang]}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-black text-brand-white mb-5 heading-line"
          >
            {t.heading[lang]}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brand-muted text-lg max-w-xl mx-auto"
          >
            {t.sub[lang]}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {t.items.map((item, i) => (
            <TransformationCard key={item.name.en} item={item} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
