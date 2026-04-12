# Fit & Faith — Website Build Study
### A Complete Brief for Claude Code

---

## 1. PROJECT OVERVIEW

**Brand Name:** Fit and Faith / فت اند فيث
**Tagline (EN):** Train Your Body. Strengthen Your Faith.
**Tagline (AR):** درّب جسدك. قوّي إيمانك.

**Business Type:** Fitness Coaching & Personal Training
**Target Audience:** Arabic & English-speaking individuals seeking professional fitness coaching
**Instagram:** [@fitandfaitht](https://www.instagram.com/fitandfaitht)
**WhatsApp Contact:** https://wa.me/qr/YL74SQL3NHBYO1

**Logo:** Place the provided logo file at `src/assets/logo.png`
**Logo Colors Extracted:**
- Gold (physical/fitness side): `#C9A96E`
- Silver-White (faith/spiritual side): `#D0D0D0`
- Dark Charcoal (text): `#2E2E2E`
- Background on site: Near-black `#080808`

---

## 2. SERVICES OFFERED

| Service | English | Arabic |
|---------|---------|--------|
| Online Coaching | Personalised 1-on-1 online fitness coaching | تدريب شخصي عبر الإنترنت |
| In-Person Training | Face-to-face PT sessions | تدريب شخصي مباشر |
| Nutrition Plans | Custom meal & diet planning | خطط تغذية مخصصة |

---

## 3. TECH STACK

```
Framework:     React 18 (Vite)
Styling:       Tailwind CSS v3
Icons:         Lucide React
Fonts:         Google Fonts — Poppins (EN) + Cairo (AR)
Animations:    Framer Motion
Routing:       React Router DOM v6
Build Tool:    Vite
Deployment:    Static export (can host on Vercel / Netlify / GitHub Pages)
```

### Setup Commands
```bash
npm create vite@latest fitandfaith-website -- --template react
cd fitandfaith-website
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install framer-motion lucide-react react-router-dom
```

---

## 4. DESIGN SYSTEM

### 4.1 Color Palette — Logo-Matched (Gold × Silver × Black)

The color system mirrors the logo's dual identity:
- **Left half (physical/fitness)** → warm gold `#C9A96E`
- **Right half (spiritual/faith)** → silver-white `#D0D0D0`
- **Background** → deep black, making both gold & silver pop

```js
// tailwind.config.js — extend colors with:
colors: {
  brand: {
    bg:        '#080808',   // Deep black background
    surface:   '#101010',   // Card / section background
    surface2:  '#161616',   // Elevated card background
    border:    '#1F1F1F',   // Subtle borders
    gold:      '#C9A96E',   // PRIMARY — logo gold (fitness/physical)
    goldHov:   '#DEC08A',   // Gold hover state
    goldDark:  '#A8885A',   // Gold dark variant
    silver:    '#D0D0D0',   // SECONDARY — logo silver (faith/spiritual)
    silverDim: '#9A9A9A',   // Dimmed silver / muted text
    white:     '#FFFFFF',
    light:     '#F0EDE8',   // Warm white text (matches gold undertone)
    muted:     '#707070',   // Muted / disabled text
  }
}
```

### 4.2 Typography

```css
/* English — Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

/* Arabic — Cairo */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap');
```

```js
// tailwind.config.js
fontFamily: {
  en: ['Poppins', 'sans-serif'],
  ar: ['Cairo', 'sans-serif'],
}
```

**Scale:**
- Hero heading: `text-6xl md:text-8xl font-black`
- Section heading: `text-4xl md:text-5xl font-bold`
- Subheading: `text-xl md:text-2xl font-semibold`
- Body: `text-base md:text-lg font-normal`
- Small/muted: `text-sm text-brand-muted`

### 4.3 Global Styles

```css
/* index.css */
* { box-sizing: border-box; }

body {
  background-color: #070707;
  color: #F5F5F5;
  margin: 0;
}

body[dir="ltr"] { font-family: 'Poppins', sans-serif; }
body[dir="rtl"] { font-family: 'Cairo', sans-serif; }

/* Gold-to-Silver gradient — mirrors the logo's dual identity */
.gradient-text {
  background: linear-gradient(135deg, #C9A96E 0%, #D0D0D0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Reversed for variety */
.gradient-text-rev {
  background: linear-gradient(135deg, #D0D0D0 0%, #C9A96E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Gold glow for primary elements */
.glow-gold {
  box-shadow: 0 0 30px rgba(201, 169, 110, 0.35);
}

/* Silver glow for secondary elements */
.glow-silver {
  box-shadow: 0 0 30px rgba(208, 208, 208, 0.2);
}
```

---

## 5. BILINGUAL SYSTEM (Arabic / English)

### 5.1 Language Context

Create `src/context/LanguageContext.jsx`:

```jsx
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const isAr = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.style.fontFamily = isAr
      ? "'Cairo', sans-serif"
      : "'Poppins', sans-serif";
  }, [lang]);

  const toggle = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, isAr, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
```

### 5.2 Content File

Create `src/content/content.js`:

```js
export const content = {
  nav: {
    home:     { en: 'Home',     ar: 'الرئيسية' },
    services: { en: 'Services', ar: 'الخدمات'  },
    contact:  { en: 'Contact',  ar: 'تواصل معنا' },
    toggleLang: { en: 'عربي', ar: 'English' },
  },

  hero: {
    badge:    { en: 'Premium Fitness Coaching', ar: 'تدريب لياقة احترافي' },
    heading1: { en: 'TRAIN HARD.',             ar: 'تدرّب بقوة.' },
    heading2: { en: 'LIVE RIGHT.',             ar: 'عش بصدق.' },
    sub:      {
      en: 'Online coaching, in-person training, and nutrition plans — built around your life.',
      ar: 'تدريب أونلاين، جلسات مباشرة، وخطط تغذية — مصممة خصيصاً لحياتك.',
    },
    cta1: { en: 'Start Your Journey', ar: 'ابدأ رحلتك' },
    cta2: { en: 'See Services',       ar: 'اكتشف الخدمات' },
  },

  stats: [
    { value: '200+', label: { en: 'Clients Coached', ar: 'عميل تم تدريبه' } },
    { value: '5★',   label: { en: 'Average Rating',  ar: 'متوسط التقييم'  } },
    { value: '3',    label: { en: 'Core Programs',   ar: 'برامج أساسية'   } },
    { value: '24/7', label: { en: 'Support',          ar: 'دعم مستمر'      } },
  ],

  services: {
    heading: { en: 'What I Offer', ar: 'ماذا أقدّم' },
    sub: {
      en: 'Choose the program that fits your lifestyle.',
      ar: 'اختر البرنامج الذي يناسب أسلوب حياتك.',
    },
    items: [
      {
        icon: 'Monitor',
        title:    { en: 'Online Coaching',    ar: 'تدريب أونلاين'           },
        desc:     {
          en: 'Personalised training plans delivered to your phone. Weekly check-ins, form feedback, and full accountability — wherever you are.',
          ar: 'خطط تدريب مخصصة على هاتفك. متابعة أسبوعية ومراجعة الأداء والمحاسبة الكاملة — أينما كنت.',
        },
        features: {
          en: ['Custom workout plan', 'Weekly check-ins', 'Video form reviews', 'WhatsApp support'],
          ar: ['خطة تمرين مخصصة', 'متابعة أسبوعية', 'مراجعة فيديو الأداء', 'دعم واتساب'],
        },
        cta: { en: 'Get Started', ar: 'ابدأ الآن' },
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
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
        cta: { en: 'Book a Session', ar: 'احجز جلسة' },
        highlight: false,
      },
      {
        icon: 'Salad',
        title: { en: 'Nutrition Plans', ar: 'خطط التغذية' },
        desc: {
          en: 'Eat smarter, not less. Custom meal plans tailored to your goals, preferences, and lifestyle — no fad diets.',
          ar: 'كل بذكاء، لا بقلة. خطط غذائية مخصصة وفق أهدافك وتفضيلاتك وأسلوب حياتك — بلا حميات مبالغ فيها.',
        },
        features: {
          en: ['Custom meal plan', 'Macro breakdown', 'Weekly adjustments', 'Recipe suggestions'],
          ar: ['خطة وجبات مخصصة', 'توزيع المغذيات', 'تعديلات أسبوعية', 'اقتراحات وصفات'],
        },
        cta: { en: 'Get My Plan', ar: 'احصل على خطتي' },
        highlight: false,
      },
    ],
  },

  contact: {
    heading: { en: 'Ready to Start?',   ar: 'مستعد للبدء؟'    },
    sub: {
      en: 'Send me a message on WhatsApp and let\'s build your plan together.',
      ar: 'أرسل لي رسالة على واتساب ونبني خطتك معاً.',
    },
    whatsapp: { en: 'Chat on WhatsApp', ar: 'تواصل على واتساب' },
    instagram: { en: 'Follow on Instagram', ar: 'تابعني على إنستغرام' },
    note: {
      en: 'I typically respond within a few hours.',
      ar: 'أرد عادةً خلال ساعات قليلة.',
    },
  },

  footer: {
    rights: {
      en: 'All rights reserved.',
      ar: 'جميع الحقوق محفوظة.',
    },
  },
};
```

---

## 6. FILE STRUCTURE

```
fitandfaith-website/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── logo.png              ← PUT YOUR LOGO HERE
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Stats.jsx
│   │   ├── Services.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── LanguageToggle.jsx
│   ├── context/
│   │   └── LanguageContext.jsx
│   ├── content/
│   │   └── content.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 7. TAILWIND CONFIG

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:        '#080808',   // Deep black
          surface:   '#101010',   // Card bg
          surface2:  '#161616',   // Elevated card
          border:    '#1F1F1F',   // Borders
          gold:      '#C9A96E',   // Logo gold (primary)
          goldHov:   '#DEC08A',   // Gold hover
          goldDark:  '#A8885A',   // Gold dark
          silver:    '#D0D0D0',   // Logo silver (secondary)
          silverDim: '#9A9A9A',   // Muted silver
          white:     '#FFFFFF',
          light:     '#F0EDE8',   // Warm white
          muted:     '#707070',   // Muted text
        },
      },
      fontFamily: {
        en: ['Poppins', 'sans-serif'],
        ar: ['Cairo', 'sans-serif'],
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'fade-in':   'fadeIn 0.5s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)'    },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
```

---

## 8. COMPONENT BLUEPRINTS

### 8.1 App.jsx

```jsx
import { LanguageProvider } from './context/LanguageContext';
import Navbar   from './components/Navbar';
import Hero     from './components/Hero';
import Stats    from './components/Stats';
import Services from './components/Services';
import Contact  from './components/Contact';
import Footer   from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="bg-brand-bg min-h-screen text-brand-light overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
```

---

### 8.2 Navbar.jsx

**Design:** Sticky, transparent → solid on scroll. Logo left. Nav links center. Language toggle + WhatsApp CTA right.

```jsx
import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';
import logo from '../assets/logo.png';

export default function Navbar() {
  const { lang, isAr, toggle } = useLang();
  const t = content.nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-brand-bg/95 backdrop-blur-md border-b border-brand-border shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-10 w-auto" />

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['home', 'services', 'contact'].map(key => (
            <a
              key={key}
              href={`#${key}`}
              className="text-brand-muted hover:text-brand-white transition-colors duration-200 text-sm font-medium tracking-wide uppercase"
            >
              {t[key][lang]}
            </a>
          ))}
        </div>

        {/* Right Side: Language Toggle + WhatsApp CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xs font-semibold border border-brand-border text-brand-muted hover:text-brand-gold hover:border-brand-gold rounded-full px-4 py-2 transition-all duration-200"
          >
            {t.toggleLang[lang]}
          </button>
          <a
            href="https://wa.me/qr/YL74SQL3NHBYO1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gold hover:bg-brand-goldHov text-brand-bg text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-yellow-700/30"
          >
            {t.contact[lang]}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-brand-light p-2"
        >
          <span className="block w-6 h-0.5 bg-current mb-1" />
          <span className="block w-6 h-0.5 bg-current mb-1" />
          <span className="block w-4 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-surface border-t border-brand-border px-6 py-6 flex flex-col gap-4">
          {['home', 'services', 'contact'].map(key => (
            <a key={key} href={`#${key}`} onClick={() => setMenuOpen(false)} className="text-brand-light text-lg font-medium">
              {t[key][lang]}
            </a>
          ))}
          <button onClick={toggle} className="text-brand-gold font-semibold text-left mt-2">
            {t.toggleLang[lang]}
          </button>
          <a
            href="https://wa.me/qr/YL74SQL3NHBYO1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gold text-white text-center font-semibold px-5 py-3 rounded-full mt-2"
          >
            {t.contact[lang]}
          </a>
        </div>
      )}
    </nav>
  );
}
```

---

### 8.3 Hero.jsx

**Design:** Full-screen dark section. Large bold headline with gradient text. Two CTA buttons. Subtle animated background gradient orbs. Noise texture overlay.

```jsx
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';

export default function Hero() {
  const { lang } = useLang();
  const t = content.hero;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      {/* Silver orb on the right — faith side */}
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-brand-silver/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
          {t.badge[lang]}
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-9xl font-black leading-none tracking-tighter mb-6"
        >
          <span className="text-brand-white">{t.heading1[lang]}</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #C9A96E, #D0D0D0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t.heading2[lang]}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.sub[lang]}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://wa.me/qr/YL74SQL3NHBYO1"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-brand-gold hover:bg-brand-goldHov text-brand-bg font-bold px-8 py-4 rounded-full text-base transition-all duration-300 shadow-2xl hover:shadow-yellow-700/40 hover:scale-105"
          >
            {t.cta1[lang]}
          </a>
          <a
            href="#services"
            className="text-brand-light border border-brand-border hover:border-brand-gold hover:text-brand-gold font-semibold px-8 py-4 rounded-full text-base transition-all duration-300"
          >
            {t.cta2[lang]}
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-brand-muted text-xs"
      >
        <span className="w-px h-10 bg-gradient-to-b from-transparent to-brand-muted" />
      </motion.div>
    </section>
  );
}
```

---

### 8.4 Stats.jsx

**Design:** 4 key numbers in a dark card strip with subtle border — builds trust quickly.

```jsx
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';

export default function Stats() {
  const { lang } = useLang();

  return (
    <section className="py-12 px-6 border-y border-brand-border bg-brand-surface">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {content.stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div
              className="text-4xl md:text-5xl font-black mb-1"
              style={{
                background: 'linear-gradient(135deg, #C9A96E, #D0D0D0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {stat.value}
            </div>
            <div className="text-brand-muted text-sm font-medium">
              {stat.label[lang]}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

---

### 8.5 Services.jsx + ServiceCard.jsx

**Design:** 3 cards on a dark background. Highlighted "most popular" card gets an orange border glow. Each card has icon, title, description, feature list, and CTA button.

```jsx
// Services.jsx
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';
import ServiceCard from './ServiceCard';

export default function Services() {
  const { lang } = useLang();
  const t = content.services;

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-brand-white mb-4"
          >
            {t.heading[lang]}
          </motion.h2>
          <p className="text-brand-muted text-lg max-w-xl mx-auto">
            {t.sub[lang]}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.items.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

```jsx
// ServiceCard.jsx
import { motion } from 'framer-motion';
import { Monitor, Dumbbell, Salad, CheckCircle2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const iconMap = { Monitor, Dumbbell, Salad };

export default function ServiceCard({ service, index }) {
  const { lang } = useLang();
  const Icon = iconMap[service.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className={`relative rounded-2xl p-8 flex flex-col h-full transition-transform duration-300 hover:-translate-y-1 ${
        service.highlight
          ? 'bg-brand-surface2 border border-transparent border-gradient shadow-2xl shadow-yellow-700/20'
          : 'bg-brand-surface border border-brand-border hover:border-brand-gold/30'
      }`}
    >
      {/* Popular Badge */}
      {service.highlight && service.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-bg text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase">
          {service.badge[lang]}
        </div>
      )}

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
        service.highlight ? 'bg-brand-gold/20' : 'bg-brand-border'
      }`}>
        <Icon className={`w-6 h-6 ${service.highlight ? 'text-brand-gold' : 'text-brand-muted'}`} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-brand-white mb-3">
        {service.title[lang]}
      </h3>

      {/* Description */}
      <p className="text-brand-muted text-sm leading-relaxed mb-6">
        {service.desc[lang]}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-8 flex-1">
        {service.features[lang].map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-brand-light">
            <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="https://wa.me/qr/YL74SQL3NHBYO1"
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full text-center py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
          service.highlight
            ? 'bg-brand-gold hover:bg-brand-goldHov text-brand-bg font-bold shadow-lg hover:shadow-yellow-700/30'
            : 'border border-brand-border hover:border-brand-gold text-brand-light hover:text-brand-gold'
        }`}
      >
        {service.cta[lang]}
      </a>
    </motion.div>
  );
}
```

---

### 8.6 Contact.jsx

**Design:** Full-width dark section. Central card with large WhatsApp button, Instagram link, and a short note. Clear and direct.

```jsx
import { motion } from 'framer-motion';
import { MessageCircle, Instagram } from 'lucide-react';
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
          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-black text-brand-white mb-4">
            {t.heading[lang]}
          </h2>
          <p className="text-brand-muted text-lg mb-10">{t.sub[lang]}</p>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/qr/YL74SQL3NHBYO1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-10 py-5 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-green-500/30 hover:scale-105 mb-6"
          >
            <MessageCircle className="w-6 h-6" />
            {t.whatsapp[lang]}
          </a>

          {/* Note */}
          <p className="text-brand-muted text-sm mb-8">{t.note[lang]}</p>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/fitandfaitht"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-white transition-colors duration-200 text-sm font-medium"
          >
            <Instagram className="w-4 h-4" />
            {t.instagram[lang]}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 8.7 Footer.jsx

```jsx
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';
import logo from '../assets/logo.png';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-brand-bg border-t border-brand-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <img src={logo} alt="Logo" className="h-8 w-auto opacity-70" />
        <p className="text-brand-muted text-xs text-center">
          © {new Date().getFullYear()} — {content.footer.rights[lang]}
        </p>
        <div className="flex gap-4">
          <a href="https://www.instagram.com/fitandfaitht" target="_blank" rel="noopener noreferrer"
            className="text-brand-muted hover:text-brand-white text-xs transition-colors">
            Instagram
          </a>
          <a href="https://wa.me/qr/YL74SQL3NHBYO1" target="_blank" rel="noopener noreferrer"
            className="text-brand-muted hover:text-brand-white text-xs transition-colors">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
```

---

## 9. INDEX.CSS (FULL)

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Cairo:wght@300;400;500;600;700;800;900&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #080808;
  color: #F0EDE8;
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
}

body[dir="rtl"] {
  font-family: 'Cairo', sans-serif;
}

/* Text selection uses logo gold */
::selection {
  background-color: #C9A96E;
  color: #080808;
}

/* Scrollbar styled with gold accent */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #101010;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #C9A96E, #D0D0D0);
  border-radius: 3px;
}

/* Gold-Silver gradient text utility */
.gradient-text {
  background: linear-gradient(135deg, #C9A96E 0%, #D0D0D0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Gold glow utility */
.glow-gold {
  box-shadow: 0 0 40px rgba(201, 169, 110, 0.3);
}

/* Animated gradient border for highlighted card */
.border-gradient {
  border: 1px solid transparent;
  background-clip: padding-box;
  position: relative;
}
.border-gradient::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, #C9A96E, #D0D0D0);
  z-index: -1;
}
```

---

## 10. MAIN.JSX

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

---

## 11. VITE.CONFIG.JS

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

---

## 12. STEP-BY-STEP INSTRUCTIONS FOR CLAUDE CODE

Give Claude Code these instructions exactly:

---

### PROMPT FOR CLAUDE CODE:

```
Build a complete, production-ready React website using Vite + Tailwind CSS for a fitness coaching brand.

Follow this specification exactly:

1. Run the setup commands:
   npm create vite@latest fitandfaith-website -- --template react
   cd fitandfaith-website
   npm install
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   npm install framer-motion lucide-react react-router-dom

2. Replace tailwind.config.js with the exact config from Section 7.

3. Create src/index.css using the exact CSS from Section 9.

4. Create all files in this exact structure:
   - src/context/LanguageContext.jsx (Section 5.1)
   - src/content/content.js (Section 5.2)
   - src/App.jsx (Section 8.1)
   - src/components/Navbar.jsx (Section 8.2)
   - src/components/Hero.jsx (Section 8.3)
   - src/components/Stats.jsx (Section 8.4)
   - src/components/Services.jsx (Section 8.5)
   - src/components/ServiceCard.jsx (Section 8.5)
   - src/components/Contact.jsx (Section 8.6)
   - src/components/Footer.jsx (Section 8.7)
   - src/main.jsx (Section 10)
   - vite.config.js (Section 11)

5. Place the user's logo at src/assets/logo.png

6. After building, run: npm run dev

7. Verify:
   - Language toggle works (EN ↔ AR)
   - Arabic switches to RTL layout
   - All sections scroll correctly
   - WhatsApp link opens: https://wa.me/qr/YL74SQL3NHBYO1
   - Instagram link opens: https://www.instagram.com/fitandfaitht
   - Site is fully responsive on mobile

The design MUST match:
- Background: #070707 (near black)
- Accent: #FF5C00 (fire orange) + #FFB700 (gold)
- Typography: Poppins (EN) / Cairo (AR)
- Bold, energetic, premium fitness brand aesthetic
- Smooth Framer Motion entry animations
- All text bilingual using the content.js file
```

---

## 13. BEFORE YOU RUN — CHECKLIST

**Logo Setup (IMPORTANT):**
- [ ] Save your logo as `logo.png` (the split gold/white figure with "FIT AND FAITH" text)
- [ ] Place it at `src/assets/logo.png` inside the project folder
- [ ] For best results, use the PNG with transparent background (not white)
- [ ] The logo works perfectly on the dark background — gold left, silver right

**Content:**
- [ ] Brand name is already set to "Fit and Faith" in content.js ✓
- [ ] All Arabic text is pre-written ✓
- [ ] WhatsApp link already embedded ✓
- [ ] Instagram link already embedded ✓
- [ ] Add your service prices to the ServiceCard if desired (currently shows no prices)

**Colors — confirmed from your logo:**
- Primary: `#C9A96E` (logo gold — fitness/physical side)
- Secondary: `#D0D0D0` (logo silver — faith/spiritual side)
- Background: `#080808` (deep black — makes both colors pop)
- Gradient: gold → silver (mirrors the logo's dual identity)

**Before Publishing:**
- [ ] Test language toggle (EN ↔ AR, RTL layout)
- [ ] Test on mobile screen size
- [ ] Verify WhatsApp link opens correctly
- [ ] Deploy to Vercel: `npm install -g vercel && vercel`
- [ ] Or Netlify: drag the `dist/` folder to netlify.com

---

## 14. DESIGN VISION SUMMARY

Your website will embody the **duality** of Fit & Faith:

| Element | Gold Side (Fitness) | Silver Side (Faith) |
|---------|--------------------|--------------------|
| Color   | `#C9A96E`          | `#D0D0D0`          |
| Meaning | Physical strength  | Spiritual clarity  |
| Font weight | Bold / Black  | Light / Regular    |
| Gradient | Left → | → Right |

The hero text will use a **gold-to-silver gradient**, just like your logo. Service cards will have subtle gold glows. The "Most Popular" card gets a gold-silver gradient border. Everything sits on a deep black background that makes the brand colors shine.

---

*Study prepared for: **Fit and Faith** | @fitandfaitht*
*Colors extracted from logo: Gold `#C9A96E` + Silver `#D0D0D0` on Black `#080808`*
*WhatsApp: https://wa.me/qr/YL74SQL3NHBYO1*
