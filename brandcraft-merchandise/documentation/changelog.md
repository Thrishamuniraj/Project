# Changelog


## 2.2.0 — 2026-09-28

Home menu, requirements review and integration points.

- Home menu rebuilt to match the Printora pattern: one **Home ⌄** link opens a dropdown card with Home 1 — Merchandise Supplier and Home 2 — Campaign Showcase on hover or keyboard focus (Escape closes it); the mobile menu has a collapsible **Home ⌄** row instead of a static group.
- Dark mode now uses neutral near-black backgrounds with dark-grey alternate sections (was navy); brand accents unchanged, text contrast 6.4:1 or better.
- Home 2: the client testimonial section now has a heading; its attribution aligns correctly in RTL.
- Integration points completed and documented (new *Integration points* table in `documentation/customization.md`): Mailchimp / ConvertKit notes in `forms.js`, a “Book a 15-minute call” calendar hook on the contact page, and a Stripe / PayPal payment note on the pricing page.
- Meta descriptions on nine pages rewritten to 150–160 characters.
- `assets/js/plugins/` and `assets/fonts/` now contain README notes.

## 2.1.0 — 2026-09-28

Navigation, direction toggle, imagery and CTA update.

- Header **Home** menu with both homepages — Home 1 (Merchandise Supplier) and Home 2 (Campaign Showcase) — on every page, plus a Home group in the mobile drawer; the current page is marked.
- Direction control is now a single **LTR** toggle button (header, mobile drawer, dashboard and Coming Soon): it shows the current direction, switches to RTL on click (label changes to “RTL”), and the choice persists across pages. The two-button LTR | RTL switch was removed. It sits next to the theme toggle; the utility bar keeps its “View Products” link.
- Imagery: 14 product and campaign photos now show client logos printed on the products (hero collage, category cards, Home 2 campaigns, category explorer and gifting). Campaign cards show the named client's logo (Verdant Foods tumbler, Fieldstone Analytics welcome boxes, Marlowe University gift box).
- Alignment: consistent heading-to-text spacing; the product scroller lines up with the container at tablet widths.
- Final CTAs are now distinct: Home 1 is product-led (proof, 10–14 day production, 98% on time; Browse Products), Home 2 is campaign-led (event kits, packaging and direct shipping; Explore Gifting).

## 2.0.0 — 2026-09-27

Design, imagery and UX revision.

- Replaced icon placeholders with 60 section-specific photographs (WebP, explicit dimensions, lazy-loaded): hero collage, category cards, all 20 catalogue products, campaigns, services, blog posts, gifting and about sections.
- Products and blog data (`products.js`, `blog.js`) now carry `img`/`alt` fields; product and article detail pages show the matching photo. Home 2 can set its own product line-up via `data-popular-products="p11,p16,…"`.
- New logomark, favicon and horizontal logo: a tee with a dashed print area and placed logo (product + branding service). Logo mark is now a cacheable SVG file instead of repeated inline markup.
- Visible LTR | RTL switch in the utility bar, mobile drawer, compact headers and dashboard; theme and direction are applied before first paint and persist across pages.
- Fixed RTL horizontal overflow on every page (skip link used `left: -9999px`), phone/email links isolated as LTR in RTL.
- Fixed dark-mode surfaces that turned near-white (Home 2 hero, skip link, chips, pagination, toasts, dashboard sidebar, inline cards) and the undefined `--space-5` token (desktop nav and footer had zero gaps).
- Services page: added a service comparison table (stacks on mobile), a four-step order timeline and a sticky-intro FAQ built from existing answers.
- Contact: interactive Google Maps embed with a documented Maps Embed API option (`YOUR_GOOGLE_MAPS_API_KEY`). Coming Soon: split layout with photo, live countdown and contact details.
- SEO: raster Open Graph image, OG/Twitter/canonical/JSON-LD on every public page, titles trimmed under 60 characters, short descriptions rewritten, dashboard `noindex`.
- Accessibility: heading outline fixed site-wide (visual size kept via `.h4` utility), mobile drawer logo/CTA layout restored.

## 1.0.0 — Initial Release

- Initial release of the BrandCraft Merchandise template: 20 pages covering the full promotional-products/corporate-merchandise supplier journey (home ×2, products, product details, custom branding, bulk orders, pricing, services ×2, corporate gifting, about, blog ×2, contact, login/register, optional admin dashboard demo, legal, 404, coming soon).
- Design system: CSS custom properties, light/dark mode, RTL stylesheet, responsive breakpoints (mobile/tablet/desktop/large desktop).
- Interactive features: product search/filtering, branding workflow stepper, logo placement visualizer, drag-and-drop logo upload with validation, bulk order pricing estimator, blog search/filter/pagination, accordions, tabs, toasts, scroll reveal.
- Accessibility: skip link, semantic landmarks, labeled form fields, visible focus states, keyboard-operable interactive components.
- SEO: per-page titles/descriptions, canonical URLs, Open Graph and Twitter meta, JSON-LD (Organization, WebSite, BreadcrumbList, Service, LocalBusiness), `robots.txt`, `sitemap.xml`.
