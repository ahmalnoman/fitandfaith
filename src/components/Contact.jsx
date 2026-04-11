// src/components/Contact.jsx
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

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
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';

export default function Contact() {
  const { lang } = useLang();
  const t = content.contact;

  return (
    <section
      id="contact"
      className="py-24 px-6 bg-brand-surface border-t border-brand-border"
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-brand-white mb-4">
            {t.heading[lang]}
          </h2>
          <p className="text-brand-muted text-lg mb-10">{t.sub[lang]}</p>

          <a
            href="https://wa.me/message/SYHAEEMXHMMSA1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-10 py-5 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-green-500/30 hover:scale-105 mb-6"
          >
            <MessageCircle className="w-6 h-6" />
            {t.whatsapp[lang]}
          </a>

          <p className="text-brand-muted text-sm mb-8">{t.note[lang]}</p>

          <a
            href="https://www.instagram.com/fitandfaitht"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-white transition-colors duration-200 text-sm font-medium"
          >
            <InstagramIcon className="w-4 h-4" />
            {t.instagram[lang]}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
