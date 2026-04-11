// src/components/ServiceCard.jsx
import { motion } from 'framer-motion';
import { Monitor, Dumbbell, Salad, CheckCircle2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const iconMap = { Monitor, Dumbbell, Salad };

export default function ServiceCard({ service, index }) {
  const { lang } = useLang();
  const Icon = iconMap[service.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className={`relative rounded-2xl p-8 flex flex-col h-full transition-transform duration-300 hover:-translate-y-1 ${
        service.highlight
          ? 'bg-brand-surface2 border border-transparent border-gradient shadow-2xl shadow-yellow-700/20'
          : 'bg-brand-surface border border-brand-border hover:border-brand-gold/30'
      }`}
    >
      {/* Popular Badge */}
      {service.highlight && service.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-bg text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase whitespace-nowrap">
          {service.badge[lang]}
        </div>
      )}

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
        service.highlight ? 'bg-brand-gold/20' : 'bg-brand-border'
      }`}>
        <Icon className={`w-6 h-6 ${service.highlight ? 'text-brand-gold' : 'text-brand-muted'}`} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-brand-white mb-3">
        {service.title[lang]}
      </h3>

      {/* Description */}
      <p className="text-brand-muted text-sm leading-relaxed mb-6">
        {service.desc[lang]}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-8 flex-1">
        {service.features[lang].map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-brand-light">
            <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="https://wa.me/message/SYHAEEMXHMMSA1"
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full text-center py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
          service.highlight
            ? 'bg-brand-gold hover:bg-brand-goldHov text-brand-bg font-bold shadow-lg hover:shadow-yellow-700/30'
            : 'border border-brand-border hover:border-brand-gold text-brand-light hover:text-brand-gold'
        }`}
      >
        {service.cta[lang]}
      </a>
    </motion.div>
  );
}
