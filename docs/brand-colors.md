# FIT & FAITH — Brand Color Identity

Reference palette from the official brand board (design by **Two Souls**).
The identity pairs a **warm gold / bronze** family with a **cool silver / slate**
family — mirroring the two-tone (gold + grey) split figure in the logo.

---

## Gold / Bronze family (warm)

| Swatch | Hex | Suggested name | Notes |
|:------:|:----|:---------------|:------|
| 🟨 | `#DABE76` | Gold Light | Highlights, hover states |
| 🟨 | `#BE9F62` | Gold | **Primary gold / accent** |
| 🟫 | `#B09159` | Gold Deep | Buttons, active gold |
| 🟫 | `#8D724A` | Bronze | Secondary warm tone |
| 🟫 | `#645649` | Taupe | Warm dark neutral |
| ⬛ | `#4F4B4F` | Charcoal Warm | Deep warm text / borders |

## Silver / Slate family (cool)

| Swatch | Hex | Suggested name | Notes |
|:------:|:----|:---------------|:------|
| ⬜ | `#F9F9F9` | Off White | Background / apparel white |
| ⬜ | `#E9EAEC` | Light Grey | Surfaces, cards |
| ⬜ | `#BCBCBC` | Grey | Muted text, dividers |
| 🔲 | `#858C98` | Steel | Cool mid neutral |
| 🔲 | `#798290` | Slate | Secondary cool tone |
| ⬛ | `#48505A` | Slate Dark | Deep cool text / backgrounds |

---

## Core brand pairing

- **Primary accent:** Gold `#BE9F62`
- **Neutral base:** Off White `#F9F9F9` / Slate Dark `#48505A`
- **Logo:** two-tone muscular figure — gold half + silver half, wordmark
  `FIT & FAITH` (gold "&", dark "FIT"/"FAITH").

## Quick copy

```
Gold:   #DABE76  #BE9F62  #B09159  #8D724A  #645649  #4F4B4F
Silver: #F9F9F9  #E9EAEC  #BCBCBC  #858C98  #798290  #48505A
```

## CSS custom properties

```css
:root {
  /* Gold / bronze */
  --ff-gold-light: #DABE76;
  --ff-gold:       #BE9F62;
  --ff-gold-deep:  #B09159;
  --ff-bronze:     #8D724A;
  --ff-taupe:      #645649;
  --ff-charcoal:   #4F4B4F;
  /* Silver / slate */
  --ff-off-white:  #F9F9F9;
  --ff-grey-light: #E9EAEC;
  --ff-grey:       #BCBCBC;
  --ff-steel:      #858C98;
  --ff-slate:      #798290;
  --ff-slate-dark: #48505A;
}
```

## Tailwind extension

Add under `theme.extend.colors` in `tailwind.config.js` (the existing `brand.*`
tokens are kept; these `ff.*` tokens map the brand board exactly):

```js
ff: {
  goldLight: '#DABE76',
  gold:      '#BE9F62',
  goldDeep:  '#B09159',
  bronze:    '#8D724A',
  taupe:     '#645649',
  charcoal:  '#4F4B4F',
  offWhite:  '#F9F9F9',
  greyLight: '#E9EAEC',
  grey:      '#BCBCBC',
  steel:     '#858C98',
  slate:     '#798290',
  slateDark: '#48505A',
},
```

---

_Source: FIT & FAITH brand board (Two Souls). See `docs/brand-colors.html` for a
visual swatch sheet._
