import { useEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';

const WHATSAPP_NUMBER = '967773031599';

export default function ConfirmStep() {
  const { lang } = useLang();
  const t = content.contact;
  const promo = content.promo;
  const location = useLocation();
  const initialId = location.state?.interestId || null;

  const [interestId, setInterestId] = useState(initialId);
  const [sent, setSent] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (initialId && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [initialId]);

  const selected = t.interests.find((i) => i.id === interestId);

  const handleSend = () => {
    if (!selected) return;
    const promoLine = promo?.active
      ? lang === 'ar'
        ? `*كود العرض:* ${promo.code} (خصم ${promo.discount}%)`
        : `*Promo code:* ${promo.code} (${promo.discount}% off)`
      : null;

    const interestLine = lang === 'ar'
      ? `*الاهتمام:* ${selected.label.ar}`
      : `*Interested in:* ${selected.label.en}`;

    const lines = [
      interestLine,
      ...(promoLine ? [promoLine] : []),
      '',
      selected.template[lang],
    ];

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank');
    setSent(true);
  };

  const isAr = lang === 'ar';

  return (
    <section ref={scrollRef} className="relative py-14 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-8 md:p-10"
          style={{
            background: 'linear-gradient(135deg, rgba(201,169,110,0.06) 0%, rgba(20,18,15,0.95) 100%)',
            border: '1px solid rgba(201,169,110,0.2)',
            boxShadow: '0 8px 60px rgba(0,0,0,0.5)',
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-black tracking-widest text-brand-bg bg-brand-gold px-2.5 py-1 rounded-full">
              {isAr ? 'الخطوة 1' : 'STEP 1'}
            </span>
            <span className="text-brand-muted text-xs font-semibold uppercase tracking-wider">
              {isAr ? 'قبل الدفع' : 'Before payment'}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-brand-white mb-3">
            {isAr ? 'أكّد برنامجك عبر واتساب أولاً' : 'Confirm your program on WhatsApp first'}
          </h2>
          <p className="text-brand-muted text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
            {isAr
              ? 'اختر البرنامج الذي تريده وسنفتح واتساب برسالة جاهزة. سنرد بتفاصيل الدفع والخطوات التالية خلال ساعات قليلة.'
              : 'Pick the program you want and we\'ll open WhatsApp with a ready-to-send message. We\'ll reply with payment details and next steps within a few hours.'}
          </p>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {t.interests.map((item) => {
              const active = interestId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setInterestId(item.id); setSent(false); }}
                  className={`text-sm font-semibold px-4 py-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-brand-gold text-brand-bg border-brand-gold shadow-lg shadow-yellow-700/30 scale-[1.02]'
                      : 'border-[#2a2a2a] text-brand-muted hover:border-brand-gold/50 hover:text-brand-light'
                  }`}
                >
                  {item.label[lang]}
                </button>
              );
            })}
          </div>

          {/* Preview */}
          {selected && (
            <div
              className="rounded-xl p-4 mb-6 text-sm leading-relaxed"
              style={{
                background: 'rgba(0,0,0,0.35)',
                border: '1px solid rgba(255,255,255,0.06)',
                direction: isAr ? 'rtl' : 'ltr',
              }}
            >
              <div className="text-brand-muted text-[11px] font-semibold uppercase tracking-wider mb-2">
                {isAr ? 'معاينة الرسالة' : 'Message preview'}
              </div>
              <div className="text-brand-light whitespace-pre-line">
                {selected.template[lang]}
              </div>
              {promo?.active && (
                <div className="mt-3 text-xs text-brand-gold font-semibold">
                  {isAr ? `سيتم إرفاق كود ${promo.code} تلقائياً` : `Code ${promo.code} will be attached automatically`}
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleSend}
            disabled={!selected}
            className={`inline-flex items-center gap-3 font-bold px-8 py-4 rounded-full text-sm transition-all duration-300 ${
              selected
                ? 'text-white hover:scale-[1.02] cursor-pointer'
                : 'bg-[#1a1a1a] text-brand-muted cursor-not-allowed'
            }`}
            style={
              selected
                ? {
                    background: 'linear-gradient(135deg, #1abe5a, #25D366)',
                    boxShadow: '0 8px 40px rgba(37,211,102,0.3)',
                  }
                : {}
            }
          >
            {sent ? <CheckCircle2 className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
            {sent
              ? isAr ? 'تم الفتح — أرسل الرسالة' : 'Opened — send the message'
              : isAr ? 'افتح واتساب برسالتي' : 'Open WhatsApp with my message'}
          </button>

          {sent && (
            <p className="text-brand-muted text-xs mt-4">
              {isAr
                ? 'أرسلت الرسالة؟ تابع للأسفل لتفاصيل الدفع.'
                : 'Sent your message? Scroll down for payment details.'}
            </p>
          )}

          <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3 flex-wrap">
            <span className="text-brand-muted text-xs">
              {isAr ? 'جاهز تملأ استبيان العميل مباشرة؟' : 'Ready to fill the intake form directly?'}
            </span>
            <Link
              to="/intake"
              className="text-xs font-bold text-brand-gold hover:text-brand-white border border-brand-gold/30 hover:border-brand-gold/60 px-3 py-1.5 rounded-full transition"
            >
              {content.intake.startCta[lang]} →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
