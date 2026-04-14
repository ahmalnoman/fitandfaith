# Transformations Section — Design

## Goal
Add a homepage section showcasing real client before/after transformations. Social proof next to the Programs section.

## Placement
New section on `HomePage` between `<Services />` and `<Contact />` (id="transformations").

## Data (3 clients, 5 images)
Each image is already a before→after collage.

- **Moe** — 6 months — `moe.jpeg` (1 image)
- **Aseel** — 8 days — `aseel-front.jpeg`, `aseel-back.jpeg` (2 images)
- **Abdumageed** — 14 days — `abdumageed-1.jpeg`, `abdumageed-2.jpeg` (2 images)

Assets live in `src/assets/transformations/`.

## Card behavior
- **Default:** image is desaturated (`grayscale(100%) brightness(0.6)`).
- **Hover:** smooth ~500ms transition to full color + full brightness + slight scale 1.02 + gold border glow.
- **Two-image cards:** default shows image 1 (dimmed). Hover shows image 2 (colorful). One-image card shows the same image (dimmed → color).
- **Touch devices (no hover):** fall back to full color always (media query `(hover: none)`).

## Visual style
- Match Programs section: `py-28`, eyebrow badge, big heading, subtext, radial gold glow background.
- 3-col responsive grid (`grid-cols-1 md:grid-cols-3`).
- Cards: `bg-[#0C0C0C]`, `border border-[#1F1F1F]`, `rounded-2xl`, hover border `brand-gold/30`.
- Name: bold, large.
- Duration: gold pill with clock icon.

## i18n
Content added to `src/content/content.js` under `transformations` key, `en`/`ar` strings. Duration strings are per-client (e.g. `{en:'6 months', ar:'٦ أشهر'}`). Names stay as-is.

## Nav
Add "Transformations" / "التحولات" link to Navbar (desktop + mobile) pointing to `#transformations`.

## Out of scope
- Lightbox / fullscreen view.
- Carousel, lazy-load libraries.
- Client testimonial text.
