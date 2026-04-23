import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import Support from '../components/Support';
import ConfirmStep from '../components/ConfirmStep';

export default function PaymentPage() {
  const { lang } = useLang();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24">
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-6 mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold text-sm font-medium transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>
      </div>

      {/* Step 1 — Confirm program via WhatsApp */}
      <ConfirmStep />

      {/* Step 2 — Support / Payment Details */}
      <Support />

      {/* WhatsApp Contact Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(8,8,8,1) 0%, rgba(12,10,8,1) 50%, rgba(8,8,8,1) 100%)',
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="rounded-2xl p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(37,211,102,0.06) 0%, rgba(20,18,15,0.9) 100%)',
                border: '1px solid rgba(37,211,102,0.15)',
                boxShadow: '0 4px 60px rgba(0,0,0,0.4)',
              }}
            >
              <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-5">
                <MessageCircle className="w-7 h-7 text-[#25D366]" />
              </div>

              <h3 className="text-2xl font-bold text-brand-white mb-3">
                {lang === 'ar' ? 'هل تحتاج مساعدة؟' : 'Need Help?'}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-8 max-w-md mx-auto">
                {lang === 'ar'
                  ? 'إذا كان لديك أي سؤال حول الدفع أو البرامج، تواصل معنا مباشرة عبر واتساب.'
                  : 'If you have any questions about payment or programs, reach out to us directly on WhatsApp.'}
              </p>

              <a
                href={`https://wa.me/967773031599?text=${encodeURIComponent(lang === 'ar' ? 'مرحباً، لدي سؤال حول الدفع.' : 'Hi, I have a question about payment.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #1abe5a, #25D366)',
                  boxShadow: '0 8px 40px rgba(37,211,102,0.3)',
                }}
              >
                <MessageCircle className="w-5 h-5" />
                {lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
              </a>

              <p className="text-brand-muted text-xs mt-5">
                {lang === 'ar' ? 'نرد عادة خلال ساعات قليلة.' : 'We typically respond within a few hours.'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
