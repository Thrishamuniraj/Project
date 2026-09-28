# Page Structure

Every page shares the same skeleton: skip link → mobile nav drawer → sticky
header → `<main>` → footer → `assets/js/main.js`. Page-specific scripts are
loaded after `main.js` only on the pages that need them.

## Shared Chrome

| Element | Notes |
|---|---|
| Skip link | `.skip-link`, first focusable element, jumps to `#main` |
| Mobile nav drawer | `.mobile-nav`, off-canvas panel, toggled by `[data-nav-toggle]` |
| Header | `.site-header` — topbar (phone/email/hours) + main bar (logo, nav, CTAs, theme toggle) |
| Footer | `.site-footer` — newsletter strip, 5-column link grid, legal bar |

Auth pages (`login.html`, `register.html`) and utility pages
(`404.html`, `coming-soon.html`) use a reduced header (logo + theme toggle
only) and no footer, by design — see `customization.md` if you want to add
one.

## Home 1 — `index.html`

Hero → Uniform Categories (6-card grid) → Industries (8-card grid) →
Embroidery Showcase (split layout) → Why Choose Us (6-card grid) → Process
(7-step timeline) → Testimonials (3-card grid) → Final CTA.

## Home 2 — `home-2.html`

Hero → Industry Selector (tabs) → Featured Collections (horizontal
scroller) → Fabric Showcase (4-card grid) → Embroidery Branding (split,
reversed) → Customer Success (3-card grid) → Final CTA. Deliberately
different section patterns from Home 1 (tabs and a scroller instead of
grids) per the "design variety" requirement.

## Products — `products.html`

`.catalogue-layout`: sticky filter sidebar (industry / type / material /
color checkboxes) + main column (search, sort, active-filter chips, product
grid, empty state). Driven by `assets/js/products.js`. Supports
`?category=<industry-slug>` deep links.

## Service Details — `service-details.html`

Product overview (image + color/size selectors + CTAs) → tabbed details
(Details & Fabric / Customization / Care / FAQ, using the shared `[data-tabs]`
component) → related products.

## Services — `services.html`

Five alternating `.split` rows (one per primary service) + a 2-card grid for
secondary services (Consultation, Re-order Programs).

## Custom Embroidery — `custom-embroidery.html`

Visual step tracker (7 steps) → placement reference diagrams → the
embroidery request form itself (company/contact fields, garment + quantity,
placement radio-diagram group, thread color swatches, drag-and-drop upload
zone, notes). JS: `assets/js/embroidery.js`.

## Bulk Orders — `bulk-orders.html`

Benefit cards → bulk request form (quantity-range pills, logo-availability
radios with a conditional note, optional upload) → 4-step process. JS:
`assets/js/bulk-orders.js`.

## Pricing — `pricing.html`

Pricing factors (8-card grid) → example pricing table (responsive,
card-transforms on mobile) → interactive bulk calculator. JS:
`assets/js/pricing.js`.

## About — `about.html`

Story (split) → Mission/Vision (2-card grid) → Timeline → Quality Standards
(split, reversed) → Stat strip → Team (4-card grid) → Testimonials.

## Blog — `blog.html`

Featured article (split card) → search + category filter buttons → article
grid (13 sample posts across 8 categories) → pagination (6 per page) →
newsletter CTA. JS: `assets/js/blog.js`.

## Blog Details — `blog-details.html`

`.content-layout`: article column (table of contents, body copy, share row,
related articles) + sidebar (search, categories, recent posts, popular
posts, newsletter widget).

## Contact — `contact.html`

`.content-layout`: quote request form (left, 2/3 width) + sidebar (contact
info, social links, map placeholder).

## Login / Register — `login.html`, `register.html`

`.auth-shell`: split screen — testimonial/marketing panel (desktop only) +
centered form card. Password visibility toggles, password-confirm matching,
terms checkbox validation on register.

## Admin Dashboard — `admin-dashboard.html`

**Not linked from the public nav** (per spec — the customer-facing site has
no dashboard in its primary journey). `.dashboard-shell`: fixed sidebar nav
(Overview / Orders / Quotes / Customers / Products / Embroidery Requests /
Messages / Reports / Settings) + main content area that shows/hides
`[data-dashboard-section]` blocks via `assets/js/dashboard.js`. Includes stat
cards, bar charts (pure CSS/HTML, no chart library), and responsive
card-transforming tables.

## Legal — `legal.html`

Single page, three anchored sections (Privacy Policy / Terms & Conditions /
Cookie Policy) with a sticky-feeling in-page tab nav that highlights the
active section on click.

## 404 — `404.html`

Centered state page: big "404", workwear-themed copy, three recovery CTAs
(Back Home / Browse Products / Request a Quote).

## Coming Soon — `coming-soon.html`

Full-bleed gradient page: logo, message, live countdown (pure JS, no
dependency), email capture form, social links.
