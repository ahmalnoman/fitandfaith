import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, Shield, AlertTriangle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export default function PrivacyPolicy() {
  const { lang } = useLang();
  const isAr = lang === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: { en: 'Information We Collect', ar: 'المعلومات التي نجمعها' },
      content: {
        en: 'When you use our contact form, we collect the following information: your name, phone number, and the message you send. This information is transmitted directly to us via WhatsApp.',
        ar: 'عند استخدام نموذج الاتصال، نجمع المعلومات التالية: اسمك، رقم هاتفك، والرسالة التي ترسلها. يتم إرسال هذه المعلومات مباشرة إلينا عبر واتساب.',
      },
    },
    {
      title: { en: 'How We Use Your Information', ar: 'كيف نستخدم معلوماتك' },
      content: {
        en: 'We use your personal information to respond to your inquiries, provide our fitness coaching services, and conduct internal marketing studies to improve our programs. Your data helps us understand our audience and tailor our offerings to better serve you.',
        ar: 'نستخدم معلوماتك الشخصية للرد على استفساراتك، وتقديم خدمات التدريب الرياضي، وإجراء دراسات تسويقية داخلية لتحسين برامجنا. تساعدنا بياناتك على فهم جمهورنا وتخصيص عروضنا لخدمتك بشكل أفضل.',
      },
    },
    {
      title: { en: 'Data Sharing', ar: 'مشاركة البيانات' },
      content: {
        en: 'We do not sell, trade, or share your personal information with any third parties. Your data is used exclusively by Fit & Faith for the purposes stated above.',
        ar: 'لا نبيع أو نتاجر أو نشارك معلوماتك الشخصية مع أي أطراف ثالثة. يتم استخدام بياناتك حصرياً من قبل Fit & Faith للأغراض المذكورة أعلاه.',
      },
    },
    {
      title: { en: 'Data Protection', ar: 'حماية البيانات' },
      content: {
        en: 'We take reasonable measures to protect your personal information. Communications are handled through WhatsApp\'s end-to-end encrypted platform. We retain your information only for as long as necessary to fulfill the purposes outlined in this policy.',
        ar: 'نتخذ تدابير معقولة لحماية معلوماتك الشخصية. يتم التعامل مع الاتصالات عبر منصة واتساب المشفرة من طرف إلى طرف. نحتفظ بمعلوماتك فقط طالما كان ذلك ضرورياً لتحقيق الأغراض الموضحة في هذه السياسة.',
      },
    },
    {
      title: { en: 'Refund Policy', ar: 'سياسة الاسترداد' },
      icon: 'alert',
      content: {
        en: 'All payments made for our coaching programs and services are final. Once a payment has been processed, no refunds will be issued under any circumstances. By completing a payment, you acknowledge and agree to this no-refund policy. We encourage you to reach out via WhatsApp with any questions before making a purchase.',
        ar: 'جميع المدفوعات المقدمة لبرامج وخدمات التدريب لدينا نهائية. بمجرد معالجة الدفع، لن يتم إصدار أي استردادات تحت أي ظرف من الظروف. بإتمام الدفع، فإنك تقر وتوافق على سياسة عدم الاسترداد هذه. نشجعك على التواصل معنا عبر واتساب لأي أسئلة قبل الشراء.',
      },
    },
    {
      title: { en: 'Your Rights', ar: 'حقوقك' },
      content: {
        en: 'You have the right to request access to the personal information we hold about you, request correction of inaccurate data, or request deletion of your data. To exercise any of these rights, please contact us via WhatsApp.',
        ar: 'لديك الحق في طلب الوصول إلى المعلومات الشخصية التي نحتفظ بها عنك، أو طلب تصحيح البيانات غير الدقيقة، أو طلب حذف بياناتك. لممارسة أي من هذه الحقوق، يرجى التواصل معنا عبر واتساب.',
      },
    },
    {
      title: { en: 'Changes to This Policy', ar: 'التغييرات على هذه السياسة' },
      content: {
        en: 'We may update this privacy policy from time to time. Any changes will be reflected on this page. We encourage you to review this policy periodically.',
        ar: 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سيتم عكس أي تغييرات على هذه الصفحة. نشجعك على مراجعة هذه السياسة بشكل دوري.',
      },
    },
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold text-sm font-medium transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          {isAr ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 border border-brand-gold/20 bg-brand-gold/5 text-brand-gold text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            <Shield className="w-3 h-3" />
            {isAr ? 'قانوني' : 'Legal'}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand-white mb-4">
            {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
          <p className="text-brand-muted text-sm">
            {isAr ? 'آخر تحديث: أبريل 2026' : 'Last updated: April 2026'}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <div
              key={i}
              className="rounded-xl px-6 py-5"
              style={{
                background: section.icon === 'alert'
                  ? 'rgba(234,179,8,0.04)'
                  : 'rgba(255,255,255,0.02)',
                border: section.icon === 'alert'
                  ? '1px solid rgba(234,179,8,0.15)'
                  : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                {section.icon === 'alert' && (
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                )}
                <h2 className="text-brand-white font-bold text-base">
                  {section.title[lang]}
                </h2>
              </div>
              <p className="text-brand-muted text-sm leading-relaxed" dir={isAr ? 'rtl' : 'ltr'}>
                {section.content[lang]}
              </p>
            </div>
          ))}
        </div>

        {/* Contact note */}
        <div className="mt-12 text-center">
          <p className="text-brand-muted text-sm mb-4">
            {isAr
              ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية، تواصل معنا:'
              : 'If you have any questions about this policy, contact us:'}
          </p>
          <a
            href="https://wa.me/message/SYHAEEMXHMMSA1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#1abe5a] text-sm font-semibold transition-colors"
          >
            {isAr ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
          </a>
        </div>
      </div>
    </div>
  );
}
