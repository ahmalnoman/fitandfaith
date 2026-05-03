import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';

export default function PromoBanner() {
  const { lang } = useLang();
  const [dismissed, setDismissed] = useState(false);
  const promo = content.promo;

  if (!promo?.active || dismissed) return null;

  const scrollToPricing = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const copyCode = () => {
    navigator.clipboard?.writeText(promo.code);
  };

  return (
    <div
      className="relative w-full text-brand-bg text-xs md:text-sm font-semibold overflow-hidden"
      style={{
        background:
          'linear-gradient(90deg, #c9a96e 0%, #e6c98a 50%, #c9a96e 100%)',
        backgroundSize: '200% 100%',
        animation: 'promoShine 6s linear infinite',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 flex-wrap text-center">
        <Sparkles className="w-4 h-4 flex-shrink-0" />
        <span className="tracking-wide">{promo.headline[lang]}</span>
        <span className="hidden sm:inline opacity-80">·</span>
        <span className="flex items-center gap-2">
          {promo.sub[lang]}
          <button
            onClick={copyCode}
            className="bg-brand-bg text-brand-gold font-black px-2.5 py-0.5 rounded-md tracking-widest cursor-pointer hover:scale-105 transition"
            title={lang === 'ar' ? 'انسخ الكود' : 'Copy code'}
          >
            {promo.code}
          </button>
        </span>
        <button
          onClick={scrollToPricing}
          className="claim-btn hidden md:inline-flex items-center gap-1.5 bg-brand-bg text-brand-gold px-4 py-1.5 rounded-full font-black uppercase tracking-wider text-[11px] cursor-pointer"
        >
          <span className="claim-btn-text">{promo.claim[lang]}</span>
          <span className="claim-btn-arrow">→</span>
        </button>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-1/2 -translate-y-1/2 right-2 p-1 hover:bg-black/10 rounded-full transition"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
      <style>{`
        @keyframes promoShine {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
}
