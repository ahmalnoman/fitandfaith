import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';
import ServiceCard from './ServiceCard';

export default function Services() {
  const { lang } = useLang();
  const t = content.services;

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-brand-white mb-4"
          >
            {t.heading[lang]}
          </motion.h2>
          <p className="text-brand-muted text-lg max-w-xl mx-auto">
            {t.sub[lang]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.items.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
