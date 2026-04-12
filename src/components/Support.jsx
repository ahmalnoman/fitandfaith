// src/components/Support.jsx
import { motion } from 'framer-motion';
import { Shield, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';

function WesternUnionIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M2 8l4 8h2l2-5 2 5h2l4-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 16l1.5 2h9l1.5-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 rounded hover:bg-white/5 transition-colors duration-200 text-brand-muted hover:text-brand-gold"
      title="Copy"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function Support() {
  const { lang } = useLang();
  const t = content.support;

  return (
    <section
      id="support"
      className="relative py-28 px-6 overflow-hidden"
      style={{
        borderTop: '1px solid',
        borderImage: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.15), transparent) 1',
      }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(8,8,8,1) 0%, rgba(12,10,8,1) 50%, rgba(8,8,8,1) 100%)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[180px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,169,110,0.03) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Section label */}
          <div className="inline-flex items-center gap-2 border border-brand-gold/20 bg-brand-gold/5 text-brand-gold text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8">
            <span className="w-1 h-1 rounded-full bg-brand-gold" />
            {t.badge[lang]}
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-brand-white mb-5">
            {t.heading[lang]}
          </h2>
          <p className="text-brand-muted text-lg max-w-xl mx-auto leading-relaxed">
            {t.sub[lang]}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* QR Code Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-8 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(201,169,110,0.06) 0%, rgba(20,18,15,0.9) 100%)',
              border: '1px solid rgba(201,169,110,0.12)',
              boxShadow: '0 4px 60px rgba(0,0,0,0.4)',
            }}
          >
            <div className="mb-6">
              <span className="text-brand-gold text-xs font-semibold tracking-widest uppercase">
                {t.qrLabel[lang]}
              </span>
            </div>

            {/* QR Code */}
            <div className="inline-block rounded-xl overflow-hidden bg-white p-3 mb-6 shadow-2xl">
              <img
                src="/jaib-qr.png"
                alt="JaiB Wallet QR Code"
                className="w-52 h-52 object-contain"
              />
            </div>

            <p className="text-brand-muted text-sm leading-relaxed">
              {t.qrNote[lang]}
            </p>
          </motion.div>

          {/* Transfer Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="rounded-2xl p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(20,18,15,0.9) 0%, rgba(201,169,110,0.04) 100%)',
              border: '1px solid rgba(201,169,110,0.12)',
              boxShadow: '0 4px 60px rgba(0,0,0,0.4)',
            }}
          >
            {/* Receiver Info */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-5">
                <Shield className="w-4 h-4 text-brand-gold" />
                <span className="text-brand-gold text-xs font-semibold tracking-widest uppercase">
                  {t.detailsLabel[lang]}
                </span>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="rounded-lg px-4 py-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <span className="text-brand-muted text-[11px] font-semibold tracking-wider uppercase block mb-1">
                    {t.nameLabel[lang]}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-white text-sm font-medium tracking-wide" dir="ltr">
                      Mohammed Amer Mohammed Noman
                    </span>
                    <CopyButton text="Mohammed Amer Mohammed Noman" />
                  </div>
                </div>

                {/* Phone / Wallet */}
                <div className="rounded-lg px-4 py-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <span className="text-brand-muted text-[11px] font-semibold tracking-wider uppercase block mb-1">
                    {t.walletLabel[lang]}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-white text-sm font-mono font-medium" dir="ltr">
                      +967 734003222
                    </span>
                    <CopyButton text="+967734003222" />
                  </div>
                </div>
              </div>
            </div>

            {/* Accepted Methods */}
            <div>
              <span className="text-brand-muted text-[11px] font-semibold tracking-wider uppercase block mb-3">
                {t.methodsLabel[lang]}
              </span>
              <div className="grid grid-cols-3 gap-3">
                {/* JaiB Wallet */}
                <div
                  className="flex flex-col items-center gap-2 rounded-lg py-3 px-2 transition-all duration-200 hover:border-brand-gold/20"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center">
                    <span className="text-brand-gold text-xs font-black">J</span>
                  </div>
                  <span className="text-brand-white text-[11px] font-semibold">JaiB</span>
                </div>

                {/* Western Union */}
                <div
                  className="flex flex-col items-center gap-2 rounded-lg py-3 px-2 transition-all duration-200 hover:border-brand-gold/20"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <span className="text-yellow-400 text-[10px] font-black">WU</span>
                  </div>
                  <span className="text-brand-white text-[11px] font-semibold">Western Union</span>
                </div>

                {/* MoneyGram */}
                <div
                  className="flex flex-col items-center gap-2 rounded-lg py-3 px-2 transition-all duration-200 hover:border-brand-gold/20"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <span className="text-orange-400 text-[10px] font-black">MG</span>
                  </div>
                  <span className="text-brand-white text-[11px] font-semibold">MoneyGram</span>
                </div>
              </div>
            </div>

            {/* Security note */}
            <div className="mt-6 flex items-start gap-2 rounded-lg px-4 py-3" style={{ background: 'rgba(201,169,110,0.04)', border: '1px solid rgba(201,169,110,0.08)' }}>
              <Shield className="w-3.5 h-3.5 text-brand-gold mt-0.5 flex-shrink-0" />
              <p className="text-brand-muted text-[11px] leading-relaxed">
                {t.securityNote[lang]}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
