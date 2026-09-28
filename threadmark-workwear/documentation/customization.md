# Customization Guide

## Brand Name & Logo

The brand mark is an inline SVG repeated in every page's header/footer (a
navy rounded square with a "T" mark) — search-and-replace across the
`pages/` folder to swap it:

- Text: `ThreadMark` and `Workwear` — appears inside `.brand-name` spans
- Logo mark: the inline `<svg>...</svg>` immediately before `.brand-name`
  in each header (and again in each footer). Replace the `<rect>`/`<path>`
  fills or swap the whole markup for an `<img>` pointing at your own logo
  file in `assets/images/`.
- Favicon: `assets/images/favicon.svg`, referenced via `<link rel="icon">`
  in every page `<head>`.

## Colors

All color decisions flow from CSS custom properties defined once in
`assets/css/style.css` under `:root`:

```css
--color-primary: #0e2a4a;   /* deep navy — headers, primary buttons */
--color-secondary: #2b2f36; /* charcoal — footer background */
--color-accent: #e2661f;    /* orange — CTAs, active states, badges */
```

Change these three variables (plus their `-dark`/`-light` variants just
below them) and the whole site re-themes — buttons, badges, links, nav
states, and the hero gradient all reference these tokens rather than
hard-coded colors.

Dark-mode-specific overrides live in `assets/css/dark-mode.css`. If you
change the accent color, double-check the "accent-on-dark-surface" overrides
near the bottom of that file (eyebrow labels, active nav state, product
industry tags) still meet contrast — they intentionally use a **lighter**
tint of the accent in dark mode for WCAG AA contrast.

## Typography

Two Google Fonts are loaded in every page `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- **Poppins** (`--font-heading`) — headings, buttons, brand name
- **Inter** (`--font-body`) — body copy, forms, tables

To swap fonts, change the Google Fonts `<link>` and the two variables in
`style.css`:

```css
--font-heading: 'Poppins', 'Segoe UI', system-ui, sans-serif;
--font-body: 'Inter', 'Segoe UI', system-ui, sans-serif;
```

## Images

All imagery is original inline-composable SVG (no stock photography) in
`assets/images/`, organized by purpose:

- `hero-*.svg` — large hero compositions
- `category-*.svg` — uniform category tiles (home page)
- `industry-*.svg` — industry selector cards
- `product-*.svg` — product catalogue/detail images
- `embroidery-closeup-*.svg` — embroidery showcase sections
- `fabric-*.svg` — fabric swatch textures
- `blog-*.svg` — blog cover images
- `team-member-*.svg` — About page team portraits

To replace any image with a real photograph, swap the `<img src="...">`
path — dimensions (`width`/`height` attributes) are set to the SVG's
natural aspect ratio; update them to match your replacement photo to avoid
layout shift.

## Editing Products

Product cards live directly in `pages/products.html` (catalogue grid) and
`pages/service-details.html` (single product template). Each `<article
class="card product-card">` carries `data-*` attributes the filtering
script (`assets/js/products.js`) reads:

```html
<article class="card product-card" data-product
  data-name="Executive Corporate Polo"
  data-industry="corporate"
  data-type="polo"
  data-material="cotton-poly"
  data-color="navy white"
  data-price="18"
  data-featured="1">
```

Add a new product by duplicating an `<article>` block, updating the
`data-*` attributes to match your new item, and adding matching `<option>`
values to the filter sidebar checkboxes if you introduce a new
industry/type/material/color.

## Editing Industries

The eight industries (Hospitality, Healthcare, Industrial, Corporate,
Retail, Construction, Education, Logistics) appear in: the home page
industry grid, the products page filter sidebar, and the footer "Industries"
column. Search for `data-filter-group="industry"` in `products.html` to
find the canonical list of industry slugs used across the filtering system.

## Editing Services

`pages/services.html` uses alternating `.split` / `.split.reverse` rows —
duplicate one row block and update its heading, copy, and image to add a
new service.

## Pricing

`pages/pricing.html`'s example pricing table is static HTML (edit the
`<table>` rows directly). The interactive calculator's math lives in
`assets/js/pricing.js` — adjust the `GARMENT_BASE` price map and the
`quantityMultiplier()` / `embroideryCost()` functions to match your real
cost structure.

## Custom Embroidery Workflow

`pages/custom-embroidery.html` drives its step indicator and upload zone via
`assets/js/embroidery.js`. Placement options (left chest, right chest,
sleeve, back, cap) are defined inline in the HTML `<div class="placement-grid">`
— add or remove `<label class="placement-option">` blocks to change them.

## Bulk Orders

Quantity ranges in `pages/bulk-orders.html` are plain radio pills — edit the
`<label class="quantity-pill">` values directly to change the ranges (e.g.
if you sell in 25-unit increments instead of the default bands).

## RTL (Arabic / Hebrew) Support

To render a page right-to-left, set on the `<html>` element:

```html
<html lang="ar" dir="rtl">
```

`assets/css/rtl.css` is already linked on every page and activates
automatically off the `dir="rtl"` attribute — no other changes needed for
layout, icon mirroring, or typography spacing. Translating the actual text
content of a page is a separate content task; the CSS system only handles
structural direction.

## Newsletter / Forms

See [installation.md](installation.md) for connecting Formspree, Netlify
Forms, Mailchimp, or ConvertKit.

## Photography

Photos live in `assets/images/photos/` (WebP). Replace any file with your own image using the **same filename and aspect
ratio** (see `documentation/image-prompts.md`) — no HTML edits needed. Each product uses one photo everywhere it appears
(catalogue, Home 2 collection, service details), so a replacement updates them all.

## Logo & favicon

`assets/images/logo-mark.svg` (header/footer mark), `logo.svg` (horizontal lockup), `favicon.svg`, and `og-image.jpg`
(1200×630 social image referenced by every page).

## Text direction (LTR / RTL)

The top bar and mobile drawer contain a single `.dir-toggle` button (`data-dir-toggle`) that reads “LTR” or “RTL”.
Clicking it flips the direction; `main.js` sets `<html dir>`, relabels the toggles, updates `aria-pressed` and saves the
choice (`tm-dir`); a small inline script in each `<head>` re-applies
theme and direction before paint.

## Google Maps

The Contact page embeds a keyless interactive map of the office. For the Maps Embed API, replace the iframe `src` with
`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=YOUR+ADDRESS`.

## Integration points

Every third-party integration is placeholder-ready. Search the code for `TODO:` to find each hook.

| Integration | Where | What to change |
|---|---|---|
| Contact / quote forms | `assets/js/main.js` form handlers | Connect a Formspree endpoint or Netlify Forms (see *Newsletter / Forms*). |
| Newsletter | `assets/js/main.js` → `initGenericNewsletterForms()` | Replace the TODO with your Mailchimp or ConvertKit form action and list ID. |
| Google Maps | `pages/contact.html` | Keyless embed by default; set `YOUR_GOOGLE_MAPS_API_KEY` for the Maps Embed API (see *Google Maps*). |
| Calendar / booking | `pages/contact.html` → `a[data-booking-link]` | Set `data-booking-url` and `href` to your Calendly, Cal.com or Google appointment page. |
| Payments | `pages/pricing.html` → `.payment-note` | Add a Stripe Payment Link or PayPal button where the TODO comment sits. |
