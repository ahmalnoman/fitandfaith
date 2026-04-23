// src/components/ServiceCard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Monitor, Dumbbell, Salad, CheckCircle2, Zap } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';

const iconMap = { Monitor, Dumbbell, Salad };

const PERIODS = ['monthly', 'quarterly', 'annually'];

export default function ServiceCard({ service, index }) {
  const { lang } = useLang();
  const navigate = useNavigate();
  const Icon = iconMap[service.icon];
  const t = content.pricing;
  const [activePeriod, setActivePeriod] = useState('monthly');

  const currentPricing = service.pricing[activePeriod];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
      className={`relative rounded-2xl flex flex-col h-full card-hover-glow ${
        service.highlight
          ? 'animated-border-card bg-[#0F0F0F]'
          : 'bg-[#0C0C0C] border border-[#1F1F1F] hover:border-brand-gold/20'
      }`}
      style={
        service.highlight
          ? { background: 'linear-gradient(160deg, #111008 0%, #0a0a0a 60%)' }
          : {}
      }
    >
      {/* Inner glass sheen */}
      {service.highlight && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(201,169,110,0.04) 0%, transparent 60%)',
          }}
        />
      )}

      <div className="relative z-10 p-8 flex flex-col h-full">
        {/* Popular Badge */}
        {service.highlight && service.badge && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-brand-gold text-brand-bg text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase whitespace-nowrap shadow-lg shadow-yellow-700/40">
            <Zap className="w-3 h-3" />
            {service.badge[lang]}
          </div>
        )}

        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
            service.highlight
              ? 'bg-brand-gold/15 ring-1 ring-brand-gold/30'
              : 'bg-[#161616] ring-1 ring-[#2a2a2a]'
          }`}
        >
          <Icon
            className={`w-5 h-5 ${service.highlight ? 'text-brand-gold' : 'text-brand-muted'}`}
          />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-brand-white mb-2">
          {service.title[lang]}
        </h3>

        {/* Description */}
        <p className="text-brand-muted text-sm leading-relaxed mb-6">
          {service.desc[lang]}
        </p>

        {/* ── Pricing Toggle ── */}
        <div
          className={`flex rounded-xl overflow-hidden mb-5 text-xs font-semibold ${
            service.highlight ? 'bg-black/40 ring-1 ring-brand-gold/20' : 'bg-[#111] ring-1 ring-[#222]'
          }`}
        >
          {PERIODS.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`flex-1 py-2 transition-all duration-200 capitalize tracking-wide ${
                activePeriod === period
                  ? service.highlight
                    ? 'bg-brand-gold text-brand-bg pricing-active'
                    : 'bg-[#1f1f1f] text-brand-white'
                  : 'text-brand-muted hover:text-brand-light'
              }`}
            >
              {t[period][lang]}
            </button>
          ))}
        </div>

        {/* ── Price Display ── */}
        {(() => {
          const promo = content.promo;
          const fmt = (n) => n.toLocaleString('en-US');
          const discounted = promo?.active
            ? Math.round(currentPricing.price * (1 - promo.discount / 100))
            : currentPricing.price;
          const discountedBilled = promo?.active && currentPricing.billed
            ? Math.round(currentPricing.billed * (1 - promo.discount / 100))
            : currentPricing.billed;
          return (
            <>
              <div className="flex items-end gap-2 mb-1 flex-wrap">
                <span
                  className={`text-5xl font-black leading-none ${
                    service.highlight ? 'text-brand-gold stat-glow' : 'text-brand-white'
                  }`}
                >
                  {fmt(discounted)}
                </span>
                <span className="text-brand-muted text-sm mb-1">
                  {t.currency[lang]} {t.perMonth[lang]}
                </span>
                {currentPricing.savings && (
                  <span className="ml-auto mb-1 text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                    {t.save[lang]} {currentPricing.savings}%
                  </span>
                )}
              </div>

              {promo?.active && (
                <div className="flex items-center gap-2 mb-1 text-xs">
                  <span className="text-brand-muted line-through">
                    {fmt(currentPricing.price)} {t.currency[lang]}
                  </span>
                  <span className="bg-red-500/15 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-bold tracking-wide">
                    {promo.badge[lang]}
                  </span>
                </div>
              )}

              {/* Billing note */}
              <p className="text-brand-muted text-xs mb-6 min-h-[16px]">
                {activePeriod === 'quarterly' && currentPricing.billed && (
                  <>{fmt(discountedBilled)} {t.currency[lang]} — {t.billedQ[lang]}</>
                )}
                {activePeriod === 'annually' && currentPricing.billed && (
                  <>{fmt(discountedBilled)} {t.currency[lang]} — {t.billedA[lang]}</>
                )}
              </p>
            </>
          );
        })()}

        {/* Divider */}
        <div
          className={`w-full h-px mb-6 ${
            service.highlight
              ? 'bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent'
              : 'bg-[#1a1a1a]'
          }`}
        />

        {/* Features */}
        <ul className="space-y-2.5 mb-8 flex-1">
          {service.features[lang].map((f, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-brand-light">
              <CheckCircle2
                className={`w-4 h-4 flex-shrink-0 ${
                  service.highlight ? 'text-brand-gold' : 'text-[#3a3a3a]'
                }`}
              />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => navigate('/payment', { state: { interestId: service.interestId } })}
          className={`w-full text-center py-3.5 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer ${
            service.highlight
              ? 'btn-shimmer text-brand-bg shadow-lg hover:shadow-yellow-700/40 hover:scale-[1.02]'
              : 'border border-[#2a2a2a] hover:border-brand-gold/50 text-brand-light hover:text-brand-gold bg-[#111] hover:bg-[#161616]'
          }`}
        >
          {service.cta[lang]}
        </button>
      </div>
    </motion.div>
  );
}
