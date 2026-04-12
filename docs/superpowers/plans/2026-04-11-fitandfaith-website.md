# Fit & Faith Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a bilingual (EN/AR) single-page fitness coaching website for Fit & Faith using React 18 + Vite, deployed to Vercel via GitHub.

**Architecture:** Single-page app with anchor-scroll navigation. All UI strings live in one content file. A React context provides language state globally. No routing — all sections are rendered on one page in order: Navbar → Hero → Stats → Services → Contact → Footer.

**Tech Stack:** React 18, Vite, Tailwind CSS v3, Framer Motion, Lucide React, Google Fonts (Poppins + Cairo)

---

## File Map

| File | Responsibility |
|------|---------------|
| `package.json` | Dependencies |
| `vite.config.js` | Vite + React plugin |
| `tailwind.config.js` | Brand color tokens, font families, animations |
| `src/index.css` | Global styles, gradient utilities, scrollbar |
| `src/main.jsx` | React root mount |
| `src/App.jsx` | Layout shell — wraps all sections in LanguageProvider |
| `src/context/LanguageContext.jsx` | `lang`, `isAr`, `toggle` — sets `dir` and font on `<html>` |
| `src/content/content.js` | All bilingual strings (nav, hero, stats, services, contact, footer) |
| `src/assets/logo.png` | Brand logo (copied from source) |
| `src/components/Navbar.jsx` | Sticky nav, scroll-aware bg, mobile menu, language toggle |
| `src/components/Hero.jsx` | Fullscreen hero, glow orbs, gradient heading, two CTAs |
| `src/components/Stats.jsx` | 4-column stat strip with gradient numbers |
| `src/components/Services.jsx` | Section heading + 3-column card grid |
| `src/components/ServiceCard.jsx` | Individual service card with icon, features, CTA |
| `src/components/Contact.jsx` | Centered WhatsApp + Instagram section |
| `src/components/Footer.jsx` | Logo, copyright, social links |

---

## Task 1: Scaffold the Vite project and install dependencies

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`

- [ ] **Step 1: Initialise Vite React project in the current directory**

```bash
cd /Users/kaiizneglap-0011/Desktop/Fitandfaith
npm create vite@latest . -- --template react
```

When prompted about non-empty directory, choose **"Ignore files and continue"**.

- [ ] **Step 2: Install base dependencies**

```bash
npm install
```

- [ ] **Step 3: Install Tailwind CSS**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 4: Install runtime dependencies**

```bash
npm install framer-motion lucide-react react-router-dom
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server running at `http://localhost:5173`. Stop it with Ctrl+C.

- [ ] **Step 6: Commit**

```bash
git init
git add package.json package-lock.json vite.config.js index.html
git commit -m "chore: scaffold Vite React project with dependencies"
```

---

## Task 2: Copy logo asset

**Files:**
- Create: `src/assets/logo.png`

- [ ] **Step 1: Create assets directory and copy logo**

```bash
mkdir -p src/assets
cp "/Users/kaiizneglap-0011/Desktop/Fitandfaith/WhatsApp Image 2026-04-11 at 17.36.32.png" src/assets/logo.png
```

- [ ] **Step 2: Verify file exists**

```bash
ls -lh src/assets/logo.png
```

Expected: file present, size > 0.

- [ ] **Step 3: Commit**

```bash
git add src/assets/logo.png
git commit -m "chore: add brand logo asset"
```

---

## Task 3: Configure Tailwind

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: Replace tailwind.config.js with brand config**

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:        '#080808',
          surface:   '#101010',
          surface2:  '#161616',
          border:    '#1F1F1F',
          gold:      '#C9A96E',
          goldHov:   '#DEC08A',
          goldDark:  '#A8885A',
          silver:    '#D0D0D0',
          silverDim: '#9A9A9A',
          white:     '#FFFFFF',
          light:     '#F0EDE8',
          muted:     '#707070',
        },
      },
      fontFamily: {
        en: ['Poppins', 'sans-serif'],
        ar: ['Cairo', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
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

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.js
git commit -m "chore: configure Tailwind with brand design tokens"
```

---

## Task 4: Write global styles

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace src/index.css**

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

::selection {
  background-color: #C9A96E;
  color: #080808;
}

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

.gradient-text {
  background: linear-gradient(135deg, #C9A96E 0%, #D0D0D0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glow-gold {
  box-shadow: 0 0 40px rgba(201, 169, 110, 0.3);
}

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

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "chore: add global styles, gradient utilities, scrollbar"
```

---

## Task 5: Language context and content

**Files:**
- Create: `src/context/LanguageContext.jsx`
- Create: `src/content/content.js`

- [ ] **Step 1: Create LanguageContext**

```bash
mkdir -p src/context src/content
```

```jsx
// src/context/LanguageContext.jsx
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

- [ ] **Step 2: Create content.js**

```js
// src/content/content.js
export const content = {
  nav: {
    home:       { en: 'Home',              ar: 'الرئيسية'   },
    services:   { en: 'Services',          ar: 'الخدمات'    },
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
    cta2: { en: 'See Services',       ar: 'اكتشف الخدمات'  },
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
        title: { en: 'Online Coaching',    ar: 'تدريب أونلاين' },
        desc: {
          en: 'Personalised training plans delivered to your phone. Weekly check-ins, form feedback, and full accountability — wherever you are.',
          ar: 'خطط تدريب مخصصة على هاتفك. متابعة أسبوعية ومراجعة الأداء والمحاسبة الكاملة — أينما كنت.',
        },
        features: {
          en: ['Custom workout plan', 'Weekly check-ins', 'Video form reviews', 'WhatsApp support'],
          ar: ['خطة تمرين مخصصة', 'متابعة أسبوعية', 'مراجعة فيديو الأداء', 'دعم واتساب'],
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

  footer: {
    rights: {
      en: 'All rights reserved.',
      ar: 'جميع الحقوق محفوظة.',
    },
  },
};
```

- [ ] **Step 3: Commit**

```bash
git add src/context/LanguageContext.jsx src/content/content.js
git commit -m "feat: add language context and bilingual content"
```

---

## Task 6: Wire up main.jsx and App.jsx

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Write src/main.jsx**

```jsx
// src/main.jsx
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

- [ ] **Step 2: Write src/App.jsx**

```jsx
// src/App.jsx
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

- [ ] **Step 3: Create components directory**

```bash
mkdir -p src/components
```

- [ ] **Step 4: Commit**

```bash
git add src/main.jsx src/App.jsx
git commit -m "feat: wire up main entry point and App shell"
```

---

## Task 7: Build Navbar

**Files:**
- Create: `src/components/Navbar.jsx`

- [ ] **Step 1: Create Navbar.jsx**

```jsx
// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';
import logo from '../assets/logo.png';

export default function Navbar() {
  const { lang, toggle } = useLang();
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
      scrolled
        ? 'bg-brand-bg/95 backdrop-blur-md border-b border-brand-border shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <img src={logo} alt="Fit and Faith Logo" className="h-10 w-auto" />

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

        {/* Right: Language Toggle + WhatsApp CTA */}
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
          aria-label="Toggle menu"
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
            <a
              key={key}
              href={`#${key}`}
              onClick={() => setMenuOpen(false)}
              className="text-brand-light text-lg font-medium"
            >
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

- [ ] **Step 2: Verify dev server renders without errors**

```bash
npm run dev
```

Open `http://localhost:5173`. Navbar should be visible. Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add sticky bilingual Navbar with mobile menu"
```

---

## Task 8: Build Hero

**Files:**
- Create: `src/components/Hero.jsx`

- [ ] **Step 1: Create Hero.jsx**

```jsx
// src/components/Hero.jsx
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
      {/* Gold glow orb — fitness side */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      {/* Silver glow orb — faith side */}
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-brand-silver/5 rounded-full blur-3xl pointer-events-none" />

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

        {/* Heading */}
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

        {/* CTAs */}
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
            className="bg-brand-gold hover:bg-brand-goldHov text-brand-bg font-bold px-8 py-4 rounded-full text-base transition-all duration-300 shadow-2xl hover:shadow-yellow-700/40 hover:scale-105"
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <span className="block w-px h-10 bg-gradient-to-b from-transparent to-brand-muted mx-auto" />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: add fullscreen Hero with gradient heading and CTAs"
```

---

## Task 9: Build Stats

**Files:**
- Create: `src/components/Stats.jsx`

- [ ] **Step 1: Create Stats.jsx**

```jsx
// src/components/Stats.jsx
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

- [ ] **Step 2: Commit**

```bash
git add src/components/Stats.jsx
git commit -m "feat: add Stats strip with gradient numbers"
```

---

## Task 10: Build ServiceCard

**Files:**
- Create: `src/components/ServiceCard.jsx`

- [ ] **Step 1: Create ServiceCard.jsx**

```jsx
// src/components/ServiceCard.jsx
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
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-bg text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase whitespace-nowrap">
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

- [ ] **Step 2: Commit**

```bash
git add src/components/ServiceCard.jsx
git commit -m "feat: add ServiceCard with highlight variant and feature list"
```

---

## Task 11: Build Services section

**Files:**
- Create: `src/components/Services.jsx`

- [ ] **Step 1: Create Services.jsx**

```jsx
// src/components/Services.jsx
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

- [ ] **Step 2: Commit**

```bash
git add src/components/Services.jsx
git commit -m "feat: add Services section with 3-column card grid"
```

---

## Task 12: Build Contact section

**Files:**
- Create: `src/components/Contact.jsx`

- [ ] **Step 1: Create Contact.jsx**

```jsx
// src/components/Contact.jsx
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
          <h2 className="text-4xl md:text-6xl font-black text-brand-white mb-4">
            {t.heading[lang]}
          </h2>
          <p className="text-brand-muted text-lg mb-10">{t.sub[lang]}</p>

          <a
            href="https://wa.me/qr/YL74SQL3NHBYO1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-10 py-5 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-green-500/30 hover:scale-105 mb-6"
          >
            <MessageCircle className="w-6 h-6" />
            {t.whatsapp[lang]}
          </a>

          <p className="text-brand-muted text-sm mb-8">{t.note[lang]}</p>

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

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.jsx
git commit -m "feat: add Contact section with WhatsApp and Instagram links"
```

---

## Task 13: Build Footer

**Files:**
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Create Footer.jsx**

```jsx
// src/components/Footer.jsx
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';
import logo from '../assets/logo.png';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-brand-bg border-t border-brand-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <img src={logo} alt="Fit and Faith Logo" className="h-8 w-auto opacity-70" />
        <p className="text-brand-muted text-xs text-center">
          © {new Date().getFullYear()} Fit and Faith — {content.footer.rights[lang]}
        </p>
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/fitandfaitht"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-muted hover:text-brand-white text-xs transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/qr/YL74SQL3NHBYO1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-muted hover:text-brand-white text-xs transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: add Footer with logo, copyright, and social links"
```

---

## Task 14: Final verification

- [ ] **Step 1: Run dev server and verify all sections render**

```bash
npm run dev
```

Open `http://localhost:5173`. Check:
- Navbar visible, logo loads, language toggle works (EN ↔ AR), page flips RTL
- Hero heading gradient renders, both CTAs clickable
- Stats strip shows 4 numbers
- Services shows 3 cards, highlighted card has gold border glow
- Contact section shows WhatsApp (green) and Instagram buttons
- Footer shows logo, copyright year, social links
- Mobile hamburger opens/closes menu
- Scroll triggers navbar background change

Stop dev server with Ctrl+C.

- [ ] **Step 2: Build for production**

```bash
npm run build
```

Expected: `dist/` folder created with no errors.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```

Open `http://localhost:4173`. Verify site looks correct. Stop with Ctrl+C.

- [ ] **Step 4: Commit final state**

```bash
git add -A
git commit -m "chore: verify production build passes"
```

---

## Task 15: Push to GitHub and deploy on Vercel

- [ ] **Step 1: Add GitHub remote**

```bash
git remote add origin https://github.com/ahmalnoman/fitandfaith.git
```

- [ ] **Step 2: Push to main**

```bash
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Connect Vercel**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import the `ahmalnoman/fitandfaith` GitHub repository
4. Framework preset will auto-detect as **Vite**
5. Build command: `npm run build` (auto-filled)
6. Output directory: `dist` (auto-filled)
7. Click **Deploy**

Vercel will auto-deploy on every push to `main` from this point forward.
