# Fit & Faith — Website Design Spec
**Date:** 2026-04-11
**Status:** Approved

---

## 1. Overview

A single-page bilingual (EN/AR) fitness coaching website for the brand "Fit and Faith / فت اند فيث". Built as a static React app deployed to Vercel via GitHub.

**Tagline (EN):** Train Your Body. Strengthen Your Faith.
**Tagline (AR):** درّب جسدك. قوّي إيمانك.

---

## 2. Tech Stack

| Tool | Version/Detail |
|------|---------------|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Poppins (EN) + Cairo (AR) via Google Fonts |
| Routing | None (single-page, anchor scroll) |
| Deployment | Static export → Vercel via GitHub |

---

## 3. File Structure

```
/Desktop/Fitandfaith/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── logo.png                  ← copied from WhatsApp Image 2026-04-11...png
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

## 4. Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `brand-bg` | `#080808` | Page background |
| `brand-surface` | `#101010` | Card/section background |
| `brand-surface2` | `#161616` | Elevated card background |
| `brand-border` | `#1F1F1F` | Subtle borders |
| `brand-gold` | `#C9A96E` | Primary — fitness/physical (logo left) |
| `brand-goldHov` | `#DEC08A` | Gold hover state |
| `brand-silver` | `#D0D0D0` | Secondary — faith/spiritual (logo right) |
| `brand-silverDim` | `#9A9A9A` | Muted silver text |
| `brand-light` | `#F0EDE8` | Warm white body text |
| `brand-muted` | `#707070` | Muted/disabled text |

### Typography
- **English:** Poppins (weights 300–900)
- **Arabic:** Cairo (weights 300–900)
- Hero heading: `text-6xl md:text-9xl font-black`
- Section heading: `text-4xl md:text-6xl font-black`
- Body: `text-base md:text-lg`

### Gradient
Gold → Silver: `linear-gradient(135deg, #C9A96E, #D0D0D0)` — used on hero heading, stat numbers, scrollbar thumb.

---

## 5. Sections

### Navbar
- Fixed/sticky, full width, z-50
- Transparent on load → `bg-brand-bg/95 backdrop-blur` after 40px scroll
- Left: logo (`h-10`)
- Center (desktop): Home / Services / Contact anchor links
- Right (desktop): language toggle button + WhatsApp CTA (`bg-brand-gold` pill)
- Mobile: hamburger → dropdown menu with same links

### Hero
- Full-screen (`min-h-screen`), centered content
- Background: two blurred radial glow orbs (gold top-left, silver bottom-right)
- Badge: `"Premium Fitness Coaching"` pill with pulsing dot
- Heading line 1: white — `"TRAIN HARD."` / `"تدرّب بقوة."`
- Heading line 2: gold→silver gradient — `"LIVE RIGHT."` / `"عش بصدق."`
- Subtitle: muted text, max-w-2xl
- CTA 1: `bg-brand-gold` pill → WhatsApp link
- CTA 2: outlined pill → `#services` anchor
- Scroll indicator: vertical line fading in at bottom
- All elements animated with Framer Motion `fadeUp`

### Stats
- `py-12` strip with `border-y border-brand-border bg-brand-surface`
- 4 columns (2×2 on mobile): 200+ Clients · 5★ Rating · 3 Programs · 24/7 Support
- Numbers in gold→silver gradient, labels in `brand-muted`
- Staggered `whileInView` fade-up

### Services
- `py-24` dark section, `id="services"`
- Section heading + subtitle centered above 3-column card grid
- **Online Coaching** (highlighted): `bg-brand-surface2`, gradient border (`::before` pseudo-element), `shadow-yellow-700/20`, "Most Popular" badge above card
- **In-Person Training**: standard `bg-brand-surface border-brand-border`
- **Nutrition Plans**: standard card
- Each card: icon → title → description → feature checklist (CheckCircle2 icons) → CTA button
- CTA on highlighted card: `bg-brand-gold` pill; others: outlined

### Contact
- `py-24 bg-brand-surface border-t`, `id="contact"`
- Centered, max-w-2xl
- Heading + subtitle
- Large WhatsApp button: `bg-[#25D366]` with MessageCircle icon
- Response note in muted text
- Instagram link with icon below

### Footer
- `bg-brand-bg border-t border-brand-border py-8`
- Logo (h-8, opacity-70) left · copyright center · Instagram + WhatsApp links right
- Copyright year from `new Date().getFullYear()`

---

## 6. Bilingual System

- `LanguageContext` provides `{ lang, isAr, toggle }`
- Default: `'en'`
- Toggle flips `lang` between `'en'` and `'ar'`
- `useEffect` on `lang` sets `document.documentElement.dir` (ltr/rtl) and `document.body.style.fontFamily`
- All UI strings in `src/content/content.js` — keyed as `{ en: '...', ar: '...' }`
- RTL layout handled natively by browser via `dir="rtl"`

---

## 7. Animations

All via Framer Motion:
- `initial={{ opacity: 0, y: 20/30 }}` → `animate/whileInView={{ opacity: 1, y: 0 }}`
- `viewport={{ once: true }}` for scroll-triggered elements
- Stagger delay: `index * 0.1` or `index * 0.15` per card/stat

---

## 8. Deployment

1. Scaffold project in `/Desktop/Fitandfaith` with Vite React template
2. Copy `WhatsApp Image 2026-04-11 at 17.36.32.png` → `src/assets/logo.png`
3. Install dependencies: Tailwind, Framer Motion, Lucide React, React Router DOM
4. Build all components exactly as specified in study doc
5. Initialize Git, add remote `https://github.com/ahmalnoman/fitandfaith`
6. Commit and push → Vercel auto-deploys from main branch

---

## 9. Out of Scope

- No testimonials section
- No contact form (WhatsApp/Instagram only)
- No routing (single-page)
- No backend/API
- No authentication
