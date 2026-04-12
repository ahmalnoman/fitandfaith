export const content = {
  nav: {
    home:       { en: 'Home',              ar: 'الرئيسية'   },
    services:   { en: 'Programs',          ar: 'البرامج'    },
    contact:    { en: 'Contact',           ar: 'تواصل معنا' },
    toggleLang: { en: 'عربي',             ar: 'English'     },
  },

  hero: {
    badge:    { en: 'Premium Fitness Coaching', ar: 'تدريب لياقة احترافي' },
    heading1: { en: 'TRAIN HARD.',              ar: 'تدرّب بقوة.'          },
    heading2: { en: 'LIVE RIGHT.',              ar: 'عش بصدق.'             },
    sub: {
      en: 'Online coaching, in-person training, and nutrition plans — built around your life.',
      ar: 'تدريب أونلاين، جلسات مباشرة، وخطط تغذية — مصممة خصيصاً لحياتك.',
    },
    cta1: { en: 'Start Your Journey', ar: 'ابدأ رحلتك'      },
    cta2: { en: 'See Programs',       ar: 'اكتشف البرامج'  },
  },

  stats: [
    { value: '200+', label: { en: 'Clients Coached', ar: 'عميل تم تدريبه' } },
    { value: '5★',   label: { en: 'Average Rating',  ar: 'متوسط التقييم'  } },
    { value: '3',    label: { en: 'Core Programs',   ar: 'برامج أساسية'   } },
    { value: '24/7', label: { en: 'Support',          ar: 'دعم مستمر'      } },
  ],

  pricing: {
    monthly:   { en: 'Monthly',    ar: 'شهري'        },
    quarterly: { en: 'Quarterly',  ar: 'ربع سنوي'    },
    annually:  { en: 'Annually',   ar: 'سنوي'        },
    save:      { en: 'Save',       ar: 'وفر'         },
    perMonth:  { en: '/mo',        ar: '/شهر'        },
    billedQ:   { en: 'billed every 3 months', ar: 'يُفوتر كل 3 أشهر' },
    billedA:   { en: 'billed once a year',    ar: 'يُفوتر مرة سنوياً' },
  },

  services: {
    heading: { en: 'Choose Your Program', ar: 'اختر برنامجك' },
    sub: {
      en: 'Flexible plans designed to fit your goals, schedule, and budget.',
      ar: 'خطط مرنة مصممة لتناسب أهدافك وجدولك وميزانيتك.',
    },
    items: [
      {
        icon: 'Monitor',
        title: { en: 'Online Coaching',    ar: 'تدريب أونلاين' },
        desc: {
          en: 'Personalised training plans delivered to your phone. Weekly check-ins, form feedback, and full accountability — wherever you are.',
          ar: 'خطط تدريب مخصصة على هاتفك. متابعة أسبوعية ومراجعة الأداء والمحاسبة الكاملة — أينما كنت.',
        },
        features: {
          en: ['Custom workout plan', 'Weekly check-ins', 'Video form reviews', 'WhatsApp support'],
          ar: ['خطة تمرين مخصصة', 'متابعة أسبوعية', 'مراجعة فيديو الأداء', 'دعم واتساب'],
        },
        pricing: {
          monthly:   { price: 79,  billed: null,  savings: null },
          quarterly: { price: 65,  billed: 195,   savings: 18   },
          annually:  { price: 55,  billed: 660,   savings: 30   },
        },
        cta:       { en: 'Get Started',    ar: 'ابدأ الآن'      },
        badge:     { en: 'Most Popular',   ar: 'الأكثر طلباً'   },
        highlight: true,
      },
      {
        icon: 'Dumbbell',
        title: { en: 'In-Person Training', ar: 'تدريب مباشر' },
        desc: {
          en: 'Face-to-face sessions with full coaching support. Perfect for those who want hands-on guidance and real-time corrections.',
          ar: 'جلسات وجهاً لوجه مع دعم تدريبي كامل. مثالي لمن يريد توجيهاً مباشراً وتصحيحاً فورياً.',
        },
        features: {
          en: ['1-on-1 sessions', 'Real-time corrections', 'Progress tracking', 'Flexible scheduling'],
          ar: ['جلسات فردية', 'تصحيح فوري', 'متابعة التقدم', 'جدول مرن'],
        },
        pricing: {
          monthly:   { price: 149, billed: null,  savings: null },
          quarterly: { price: 119, billed: 357,   savings: 20   },
          annually:  { price: 99,  billed: 1188,  savings: 34   },
        },
        cta:       { en: 'Book a Session', ar: 'احجز جلسة' },
        highlight: false,
      },
      {
        icon: 'Salad',
        title: { en: 'Nutrition Plans',    ar: 'خطط التغذية' },
        desc: {
          en: 'Eat smarter, not less. Custom meal plans tailored to your goals, preferences, and lifestyle — no fad diets.',
          ar: 'كل بذكاء، لا بقلة. خطط غذائية مخصصة وفق أهدافك وتفضيلاتك وأسلوب حياتك — بلا حميات مبالغ فيها.',
        },
        features: {
          en: ['Custom meal plan', 'Macro breakdown', 'Weekly adjustments', 'Recipe suggestions'],
          ar: ['خطة وجبات مخصصة', 'توزيع المغذيات', 'تعديلات أسبوعية', 'اقتراحات وصفات'],
        },
        pricing: {
          monthly:   { price: 49, billed: null, savings: null },
          quarterly: { price: 39, billed: 117,  savings: 20   },
          annually:  { price: 29, billed: 348,  savings: 41   },
        },
        cta:       { en: 'Get My Plan',    ar: 'احصل على خطتي' },
        highlight: false,
      },
    ],
  },

  contact: {
    heading: { en: 'Ready to Start?',        ar: 'مستعد للبدء؟'          },
    sub: {
      en: "Send me a message on WhatsApp and let's build your plan together.",
      ar: 'أرسل لي رسالة على واتساب ونبني خطتك معاً.',
    },
    whatsapp:  { en: 'Chat on WhatsApp',     ar: 'تواصل على واتساب'     },
    instagram: { en: 'Follow on Instagram',  ar: 'تابعني على إنستغرام'  },
    note: {
      en: 'I typically respond within a few hours.',
      ar: 'أرد عادةً خلال ساعات قليلة.',
    },
  },

  support: {
    badge:        { en: 'Support',                        ar: 'الدعم'                         },
    heading:      { en: 'Support the Mission',            ar: 'ادعم الرسالة'                   },
    sub: {
      en: 'Your contribution helps us grow and reach more people with fitness and faith.',
      ar: 'مساهمتك تساعدنا على النمو والوصول إلى المزيد من الناس باللياقة والإيمان.',
    },
    qrLabel:      { en: 'Scan to Pay — JaiB Wallet',      ar: 'امسح للدفع — محفظة JaiB'        },
    qrNote: {
      en: 'Scan this QR code with your JaiB app to send directly to the wallet.',
      ar: 'امسح رمز QR بتطبيق JaiB للإرسال مباشرة إلى المحفظة.',
    },
    detailsLabel: { en: 'Receiver Details',               ar: 'بيانات المستلم'                 },
    nameLabel:    { en: 'Full Name',                      ar: 'الاسم الكامل'                   },
    walletLabel:  { en: 'Wallet / Phone Number',          ar: 'رقم المحفظة / الهاتف'           },
    methodsLabel: { en: 'Accepted Transfer Methods',      ar: 'طرق التحويل المقبولة'           },
    securityNote: {
      en: 'All transfers are received through a verified JaiB wallet. Western Union and MoneyGram international wires are accepted using the details above.',
      ar: 'جميع التحويلات تصل عبر محفظة JaiB موثقة. يتم قبول الحوالات الدولية عبر ويسترن يونيون وموني جرام باستخدام البيانات أعلاه.',
    },
  },

  footer: {
    rights: {
      en: 'All rights reserved.',
      ar: 'جميع الحقوق محفوظة.',
    },
  },
};
