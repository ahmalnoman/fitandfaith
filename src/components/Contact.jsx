// src/components/Contact.jsx
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';

function InstagramIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Contact() {
  const { lang } = useLang();
  const t = content.contact;

  return (
    <section
      id="contact"
      className="relative py-28 px-6 overflow-hidden"
      style={{
        borderTop: '1px solid',
        borderImage: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent) 1',
      }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(10,10,10,0.95) 0%, rgba(8,8,8,1) 100%)',
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,169,110,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section label */}
          <div className="inline-flex items-center gap-2 border border-brand-gold/20 bg-brand-gold/5 text-brand-gold text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8">
            <span className="w-1 h-1 rounded-full bg-brand-gold" />
            Contact
          </div>

          <h2
            className="text-4xl md:text-6xl font-black text-brand-white mb-5"
          >
            {t.heading[lang]}
          </h2>
          <p className="text-brand-muted text-lg mb-12 max-w-md mx-auto leading-relaxed">
            {t.sub[lang]}
          </p>

          {/* WhatsApp CTA */}
          <motion.a
            href="https://wa.me/message/SYHAEEMXHMMSA1"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 text-white font-bold px-10 py-5 rounded-full text-lg transition-all duration-300 shadow-2xl mb-6"
            style={{
              background: 'linear-gradient(135deg, #1abe5a, #25D366)',
              boxShadow: '0 8px 40px rgba(37,211,102,0.3)',
            }}
          >
            <MessageCircle className="w-6 h-6" />
            {t.whatsapp[lang]}
          </motion.a>

          <p className="text-brand-muted text-sm mb-8">{t.note[lang]}</p>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/fitandfaitht"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#2a2a2a] hover:border-brand-gold/30 text-brand-muted hover:text-brand-white transition-all duration-200 text-sm font-medium px-5 py-2.5 rounded-full"
            style={{ backdropFilter: 'blur(6px)', background: 'rgba(255,255,255,0.02)' }}
          >
            <InstagramIcon className="w-4 h-4" />
            {t.instagram[lang]}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
