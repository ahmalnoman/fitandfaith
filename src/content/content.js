export const content = {
  nav: {
    home:            { en: 'Home',            ar: 'الرئيسية'    },
    services:        { en: 'Programs',        ar: 'البرامج'     },
    transformations: { en: 'Transformations', ar: 'التحولات'    },
    contact:         { en: 'Contact',         ar: 'تواصل معنا'  },
    toggleLang:      { en: 'عربي',           ar: 'English'      },
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
    currency:  { en: 'YER',        ar: 'ر.ي'         },
    billedQ:   { en: 'billed every 3 months', ar: 'يُفوتر كل 3 أشهر' },
    billedA:   { en: 'billed once a year',    ar: 'يُفوتر مرة سنوياً' },
  },

  promo: {
    code: 'FAITH50',
    active: true,
    discount: 50,
    headline: {
      en: '🔥 LAUNCH OFFER — 50% OFF FOR THE FIRST 100 CLIENTS',
      ar: '🔥 عرض الإطلاق — خصم 50% لأول 100 عميل',
    },
    sub: {
      en: 'Use code',
      ar: 'استخدم الكود',
    },
    tail: {
      en: 'at checkout. Limited spots — once they\'re gone, they\'re gone.',
      ar: 'عند الدفع. الأماكن محدودة — بمجرد نفادها تنتهي.',
    },
    claim:   { en: 'Claim Offer',  ar: 'احجز عرضك' },
    badge:   { en: '50% OFF',      ar: 'خصم 50%'   },
    was:     { en: 'Was',          ar: 'السعر'     },
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
        interestId: 'online',
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
          monthly:   { price: 40000, billed: null,   savings: null },
          quarterly: { price: 32500, billed: 97500,  savings: 18   },
          annually:  { price: 27500, billed: 330000, savings: 30   },
        },
        cta:       { en: 'Get Started',    ar: 'ابدأ الآن'      },
        badge:     { en: 'Most Popular',   ar: 'الأكثر طلباً'   },
        highlight: true,
      },
      {
        icon: 'Dumbbell',
        interestId: 'inperson',
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
          monthly:   { price: 75000, billed: null,   savings: null },
          quarterly: { price: 60000, billed: 180000, savings: 20   },
          annually:  { price: 50000, billed: 600000, savings: 34   },
        },
        cta:       { en: 'Book a Session', ar: 'احجز جلسة' },
        highlight: false,
      },
      {
        icon: 'Salad',
        interestId: 'nutrition',
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
          monthly:   { price: 25000, billed: null,   savings: null },
          quarterly: { price: 20000, billed: 60000,  savings: 20   },
          annually:  { price: 15000, billed: 180000, savings: 41   },
        },
        cta:       { en: 'Get My Plan',    ar: 'احصل على خطتي' },
        highlight: false,
      },
    ],
  },

  transformations: {
    badge:   { en: 'Transformations',                   ar: 'التحولات' },
    heading: { en: 'Real Clients. Real Results.',       ar: 'عملاء حقيقيون. نتائج حقيقية.' },
    sub: {
      en: 'Committed work, consistent coaching — the proof is in the progress.',
      ar: 'التزام حقيقي ومتابعة مستمرة — النتائج تتحدث عن نفسها.',
    },
    durationLabel: { en: 'Duration', ar: 'المدة' },
    items: [
      {
        name: { en: 'Mohammed',    ar: 'محمد'   },
        duration: { en: '6 months', ar: '٦ أشهر' },
        images: ['moe'],
      },
      {
        name: { en: 'Alaseel',     ar: 'الاصيل'  },
        duration: { en: '8 days',  ar: '٨ أيام'  },
        images: ['aseel-front', 'aseel-back'],
      },
      {
        name: { en: 'Abdumageed', ar: 'عبدالمجيد' },
        duration: { en: '14 days', ar: '١٤ يوماً' },
        images: ['abdumageed-1', 'abdumageed-2'],
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
    interestLabel: { en: "What are you interested in?", ar: 'ما الذي يهمك؟' },
    interests: [
      {
        id: 'online',
        label:    { en: 'Online Coaching',    ar: 'تدريب أونلاين' },
        template: {
          en: "Hi! I'd like to sign up for the Online Coaching program. Can you walk me through the next steps and pricing?",
          ar: 'مرحباً! أرغب بالاشتراك في برنامج التدريب الأونلاين. ممكن تشرح لي الخطوات والأسعار؟',
        },
      },
      {
        id: 'inperson',
        label:    { en: 'In-Person Training', ar: 'تدريب مباشر' },
        template: {
          en: "Hi! I'm interested in In-Person Training sessions. What are your available times and locations?",
          ar: 'مرحباً! أنا مهتم بجلسات التدريب المباشر. ما هي الأوقات والمواقع المتاحة؟',
        },
      },
      {
        id: 'nutrition',
        label:    { en: 'Nutrition Plan',     ar: 'خطة تغذية'   },
        template: {
          en: "Hi! I'd like a custom Nutrition Plan. Can we talk about my goals and what's included?",
          ar: 'مرحباً! أرغب بخطة تغذية مخصصة. ممكن نتحدث عن أهدافي وما الذي تشمله الخطة؟',
        },
      },
      {
        id: 'promo',
        label:    { en: 'Claim FAITH50 Offer', ar: 'احجز عرض FAITH50' },
        template: {
          en: "Hi! I'd like to claim the FAITH50 launch offer (50% off). Am I still within the first 100 clients?",
          ar: 'مرحباً! أريد الاستفادة من عرض FAITH50 (خصم 50%). هل ما زلت ضمن أول 100 عميل؟',
        },
      },
      {
        id: 'question',
        label:    { en: 'General Question',   ar: 'سؤال عام'    },
        template: {
          en: 'Hi! I have a quick question about your services.',
          ar: 'مرحباً! لدي سؤال سريع حول خدماتك.',
        },
      },
    ],
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

  intake: {
    badge:    { en: 'Client Intake',            ar: 'استبيان العميل' },
    heading:  { en: 'Let\'s build your plan',   ar: 'لنبني خطتك المخصصة' },
    sub: {
      en: 'Fill this once and we\'ll design your program around your body, goals, and schedule. Takes about 3 minutes.',
      ar: 'املأ الاستبيان مرة واحدة وسنصمم برنامجك حسب جسمك وأهدافك وجدولك. يستغرق حوالي 3 دقائق.',
    },
    s1:       { en: '1. Basics',                 ar: '1. البيانات الأساسية' },
    s2:       { en: '2. Training Setup',          ar: '2. مكان التمرين والأدوات' },
    s3:       { en: '3. Activity',                ar: '3. النشاط البدني' },
    s4:       { en: '4. Health History',          ar: '4. التاريخ الصحي' },
    s5:       { en: '5. Goal & Experience',       ar: '5. الهدف والخبرة' },
    s6:       { en: '6. Physical Assessment',     ar: '6. التقييم البدني' },
    height:   { en: 'Height (cm)',                ar: 'الطول (سم)' },
    weight:   { en: 'Weight (kg)',                ar: 'الوزن (كجم)' },
    age:      { en: 'Age',                        ar: 'العمر' },
    name:     { en: 'Full Name',                  ar: 'الاسم الكامل' },
    gender:   { en: 'Gender',                     ar: 'الجنس' },
    male:     { en: 'Male',                       ar: 'ذكر'  },
    female:   { en: 'Female',                     ar: 'أنثى' },
    loc:      { en: 'Where will you train?',      ar: 'أين ستتمرن؟' },
    gym:      { en: 'Gym',                        ar: 'نادي رياضي' },
    home:     { en: 'Home',                       ar: 'المنزل'    },
    tools:    { en: 'Available equipment (if home) — e.g., dumbbells, bar, bands, or none', ar: 'الأدوات المتوفرة (للمنزل) — مثل دمبلز، بار، حبال مقاومة، أو لا شيء' },
    days:     { en: 'Training days per week',     ar: 'عدد أيام التمرين أسبوعياً' },
    job:      { en: 'Job type',                   ar: 'طبيعة العمل' },
    office:   { en: 'Office / Sedentary',         ar: 'مكتبي'  },
    active:   { en: 'Active / Physical',          ar: 'حركي'    },
    sports:   { en: 'Other sports you currently do', ar: 'هل تمارس رياضات أخرى حالياً؟' },
    conds:    { en: 'Any illnesses or past injuries?', ar: 'هل تعاني من أي أمراض أو إصابات سابقة؟' },
    surg:     { en: 'Any past surgeries?',        ar: 'هل أجريت أي عمليات جراحية؟' },
    meds:     { en: 'Any regular medications?',   ar: 'هل تتناول أي أدوية بانتظام؟' },
    allergy:  { en: 'Food allergies',             ar: 'الحساسية الغذائية' },
    goal:     { en: 'Your goal',                  ar: 'هدفك' },
    goals: [
      { id: 'muscle',  en: 'Build Muscle',  ar: 'بناء عضلات' },
      { id: 'fatloss', en: 'Lose Fat',      ar: 'خسارة دهون' },
      { id: 'fitness', en: 'General Fitness', ar: 'لياقة عامة' },
    ],
    level:    { en: 'Experience level',           ar: 'مستوى الخبرة' },
    levels: [
      { id: 'beginner',     en: 'Beginner',     ar: 'مبتدئ'  },
      { id: 'intermediate', en: 'Intermediate', ar: 'متوسط'  },
      { id: 'advanced',     en: 'Advanced',     ar: 'متقدم'  },
    ],
    malePhotoNote: {
      en: 'Next, send 4 clear photos of your body on WhatsApp (front, back, both sides). Photos are fully confidential and used only for coaching.',
      ar: 'بعد الإرسال، أرفق 4 صور واضحة للجسم على واتساب (أمامية، خلفية، وجانبيتان). الصور سرية تماماً وتُستخدم للمتابعة التدريبية فقط.',
    },
    femaleNote: {
      en: 'For your privacy, please provide measurements (in cm) instead of photos.',
      ar: 'حرصاً على خصوصيتك، يرجى تزويدنا بالقياسات التالية (بالسنتيمتر) بدلاً من الصور.',
    },
    waist:    { en: 'Waist (cm)',                  ar: 'محيط الخصر (سم)' },
    chest:    { en: 'Chest (cm)',                  ar: 'محيط الصدر (سم)' },
    hips:     { en: 'Hips (cm)',                   ar: 'محيط الأرداف (سم)' },
    thigh:    { en: 'Thigh (cm)',                  ar: 'محيط الفخذ (سم)' },
    arm:      { en: 'Arm (cm)',                    ar: 'محيط الذراع (سم)' },
    submit:   { en: 'Send to Coach on WhatsApp',   ar: 'إرسال إلى المدرب عبر واتساب' },
    disclaimer: {
      en: 'Your info stays between you and your coach. We never share it.',
      ar: 'معلوماتك تبقى بينك وبين المدرب. لن تتم مشاركتها مع أي طرف ثالث.',
    },
    startCta: { en: 'Start Intake Form',           ar: 'ابدأ استبيان العميل' },
    optional: { en: '(optional)',                  ar: '(اختياري)' },
  },

  footer: {
    rights: {
      en: 'All rights reserved.',
      ar: 'جميع الحقوق محفوظة.',
    },
  },
};
