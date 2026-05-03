// src/components/Transformations.jsx
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';

import moe from '../assets/transformations/moe.jpeg';
import aseelFront from '../assets/transformations/aseel-front.jpeg';
import aseelBack from '../assets/transformations/aseel-back.jpeg';
import abdumageed1 from '../assets/transformations/abdumageed-1.jpeg';
import abdumageed2 from '../assets/transformations/abdumageed-2.jpeg';
import moaazFront from '../assets/transformations/moaaz-front.jpeg';
import moaazSide from '../assets/transformations/moaaz-side.jpeg';

const imageMap = {
  'moe': moe,
  'aseel-front': aseelFront,
  'aseel-back': aseelBack,
  'abdumageed-1': abdumageed1,
  'abdumageed-2': abdumageed2,
  'moaaz-front': moaazFront,
  'moaaz-side': moaazSide,
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
        <div className="duration-badge">
          <span className="duration-badge-dot" />
          <span className="duration-badge-text">{item.duration[lang]}</span>
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
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-brand-white mb-6 heading-line"
          >
            <span>{t.headingPrefix[lang]}</span>{' '}
            <span className="heading-shine">{t.headingAccent[lang]}</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="flex w-fit mx-auto items-center gap-2 border border-brand-gold/20 bg-brand-gold/5 text-brand-gold text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
          >
            <span className="w-1 h-1 rounded-full bg-brand-gold" />
            {t.badge[lang]}
          </motion.div>

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

        <div className="marquee-viewport relative overflow-hidden">
          <div className="marquee-track flex gap-6">
            {[...t.items, ...t.items].map((item, i) => (
              <div
                key={`${item.name.en}-${i}`}
                aria-hidden={i >= t.items.length}
                className="w-[280px] md:w-[340px] flex-shrink-0"
              >
                <TransformationCard item={item} index={0} lang={lang} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
