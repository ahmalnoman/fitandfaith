// src/components/Contact.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, User, Phone, MessageSquare } from 'lucide-react';
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

const WHATSAPP_NUMBER = '967773031599';

export default function Contact() {
  const { lang } = useLang();
  const t = content.contact;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [
      lang === 'ar' ? `*الاسم:* ${name}` : `*Name:* ${name}`,
      lang === 'ar' ? `*رقم الهاتف:* ${phone}` : `*Phone:* ${phone}`,
      '',
      message,
    ];

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  const isAr = lang === 'ar';

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

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* Section label */}
          <div className="inline-flex items-center gap-2 border border-brand-gold/20 bg-brand-gold/5 text-brand-gold text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8">
            <span className="w-1 h-1 rounded-full bg-brand-gold" />
            {isAr ? 'تواصل معنا' : 'Contact'}
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-brand-white mb-5">
            {t.heading[lang]}
          </h2>
          <p className="text-brand-muted text-lg max-w-xl mx-auto leading-relaxed">
            {isAr
              ? 'أرسل لنا رسالة وسنتواصل معك عبر واتساب.'
              : 'Send us a message and we\'ll get back to you on WhatsApp.'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-brand-muted text-[11px] font-semibold tracking-wider uppercase block mb-2">
                  {isAr ? 'الاسم' : 'Your Name'}
                </label>
                <div
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-200 focus-within:border-brand-gold/30"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <User className="w-4 h-4 text-brand-muted flex-shrink-0" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? 'أدخل اسمك' : 'Enter your name'}
                    className="bg-transparent w-full text-brand-white text-sm placeholder:text-brand-muted/40 focus:outline-none"
                    dir={isAr ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-brand-muted text-[11px] font-semibold tracking-wider uppercase block mb-2">
                  {isAr ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <div
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-200 focus-within:border-brand-gold/30"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <Phone className="w-4 h-4 text-brand-muted flex-shrink-0" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={isAr ? 'مثال: +967 7XX XXX XXX' : 'e.g. +967 7XX XXX XXX'}
                    className="bg-transparent w-full text-brand-white text-sm placeholder:text-brand-muted/40 focus:outline-none"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-brand-muted text-[11px] font-semibold tracking-wider uppercase block mb-2">
                  {isAr ? 'رسالتك' : 'Your Message'}
                </label>
                <div
                  className="flex gap-3 rounded-xl px-4 py-3.5 transition-all duration-200 focus-within:border-brand-gold/30"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <MessageSquare className="w-4 h-4 text-brand-muted flex-shrink-0 mt-0.5" />
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder={isAr ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                    className="bg-transparent w-full text-brand-white text-sm placeholder:text-brand-muted/40 focus:outline-none resize-none"
                    dir={isAr ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center transition-all duration-200"
                    style={{
                      background: consent ? '#C9A96E' : 'rgba(255,255,255,0.05)',
                      border: consent ? '2px solid #C9A96E' : '2px solid rgba(255,255,255,0.2)',
                      boxShadow: consent ? '0 0 8px rgba(201,169,110,0.4)' : 'none',
                    }}
                  >
                    {consent && (
                      <svg className="w-3 h-3 text-black" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-brand-muted text-xs leading-relaxed group-hover:text-brand-light transition-colors">
                  {isAr
                    ? 'أوافق على حفظ معلوماتي لأغراض الدراسات التسويقية. لن يتم مشاركة بياناتي مع أي طرف ثالث.'
                    : 'I consent to my information being stored for marketing studies. My data will not be shared with any third parties.'}
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 text-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #1abe5a, #25D366)',
                  boxShadow: '0 8px 40px rgba(37,211,102,0.25)',
                }}
              >
                <Send className="w-4 h-4" />
                {isAr ? 'أرسل عبر واتساب' : 'Send via WhatsApp'}
              </button>
            </form>
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="space-y-6"
          >
            {/* How it works card */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(37,211,102,0.06) 0%, rgba(20,18,15,0.9) 100%)',
                border: '1px solid rgba(37,211,102,0.12)',
                boxShadow: '0 4px 60px rgba(0,0,0,0.4)',
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <h3 className="text-brand-white font-bold text-lg">
                  {isAr ? 'كيف يعمل؟' : 'How It Works'}
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    en: 'Fill in your name, phone number, and message',
                    ar: 'أدخل اسمك ورقم هاتفك ورسالتك',
                  },
                  {
                    step: '2',
                    en: 'Click "Send via WhatsApp" — it opens WhatsApp with your message ready',
                    ar: 'اضغط "أرسل عبر واتساب" — سيفتح واتساب برسالتك جاهزة',
                  },
                  {
                    step: '3',
                    en: 'Hit send — we\'ll reply within a few hours',
                    ar: 'اضغط إرسال — سنرد خلال ساعات قليلة',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#25D366]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#25D366] text-xs font-bold">{item.step}</span>
                    </div>
                    <p className="text-brand-muted text-sm leading-relaxed">
                      {isAr ? item.ar : item.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/fitandfaitht"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-5 py-4 transition-all duration-200 hover:border-brand-gold/20 group"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <InstagramIcon className="w-5 h-5 text-brand-muted group-hover:text-brand-gold transition-colors" />
              <div>
                <span className="text-brand-white text-sm font-medium block">
                  {t.instagram[lang]}
                </span>
                <span className="text-brand-muted text-xs">@fitandfaitht</span>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
