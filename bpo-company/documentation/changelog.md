# Changelog


## 2.3.1 — 2026-10-11

Follow-up fixes after the review corrections.

- Services and Case Studies mobile heroes shortened (666px to 547px and 557px to 541px at 375px): slightly tighter mobile padding and the Services jump links in two columns. No content removed; tablet and desktop heights unchanged.
- Dark mode: primary button hover darkened to `#2565a6` (white text 6.0:1, was 3.8:1).
- Social-sharing images (`og-cover.jpg`, `og-cover.png`) updated to the current logo mark; size unchanged (1200 × 630).

## 2.3.0 — 2026-10-09

Website review corrections (Sep slot 3, first correction).

- Logo refined: the speech-bubble mark now carries a bold "A" peak with a single amber accent, legible from 16px (`logo.svg`, `logo-mark.svg`, `favicon.svg` and the header/footer mark in `components.js`).
- Sticky header fixed: the injected header wrapper uses `display: contents` once mounted (the header was confined to its own wrapper) and `body` uses `overflow-x: clip`.
- Inner-page heroes standardised to the same height (510px on mobile and tablet, 560px on desktop).
- Home 1: the industry tabs no longer repeat the "Typical challenges" lists from the Industries page (they remain there in full).
- About: the leadership cards use real portrait photos.
- Services: each of the twelve Supporting capabilities now shows a relevant photo instead of an icon.

## 2.2.0 — 2026-09-28

Home menu, requirements review and integration points.

- Home menu rebuilt to match the Printora pattern: one **Home ⌄** link opens a dropdown card with Home 1 — BPO Services and Home 2 — Global Operations on hover or keyboard focus (Escape closes it); the mobile menu has a collapsible **Home ⌄** row instead of a static group.
- Home 2: the closing CTA band duplicated the partnership form above it, so it was removed; its proof points now sit under the testimonial in the final enquiry section (seven sections, excluding stats).
- Loading states: skeleton placeholders on the service, case study, blog and job detail pages until their content renders.
- Integration points completed and documented (new *Integration points* table in `documentation/customization.md`): Mailchimp / ConvertKit option in `forms.js`, a “Book a 15-minute call” calendar hook on the contact page, and a Stripe / PayPal payment note on the pricing page.
- Blog: “Blended vs. Dedicated Teams” now has its own cover photo (it shared one with “Outsourcing Readiness”).
- Meta descriptions on eight pages brought within 150–160 characters.
- Added `assets/js/plugins/` (with a README) to complete the required folder structure.

## 2.1.0 — 2026-09-28

Navigation, direction toggle, imagery and CTA update.

- Header **Home** menu with both homepages — Home 1 (BPO Services) and Home 2 (Global Operations) — rendered by `components.js` on every page, plus a Home group in the drawer; the current page is marked.
- Direction control is now a single **LTR** toggle button (header, mobile drawer, dashboard and Coming Soon): it shows the current direction, switches to RTL on click (label changes to “RTL”), and the choice persists across pages. The two-button LTR | RTL switch was removed.
- Imagery: six generic photos replaced with contact-centre and operations scenes — Telecom, Logistics and Technology industry cards, the Healthcare and E-commerce case studies, and the Careers team (credits updated).
- Final CTAs rewritten with a benefit-led headline and three proof points (reply within one business day, six delivery centres, 24/7 / fourteen-week transition).

## 2.0.0 — 2026-09-27

Design, imagery and UX revision.

- Replaced the flat SVG scenes with 34 photographs (WebP): hero, three services, ten industries, six case studies, team scenes, eleven blog covers and the Coming Soon background. Detail pages (service, case study, blog) read the new photos from their inline JSON, so filtering and deep links keep working.
- New logomark, favicon and horizontal logo: a support speech bubble carrying a three-step workflow (conversation routed through an operating process), in the existing navy / teal / amber palette.
- Header direction control is now a visible LTR | RTL segmented switch (desktop header, drawer "Appearance & direction", Coming Soon, dashboard). The header no longer wraps labels at 1120–1360 px.
- Contact: the static dot-map placeholder is now an interactive Google Maps embed of the head office, with a documented Maps Embed API option (`YOUR_GOOGLE_MAPS_API_KEY`).
- SEO: new raster social image (`og-cover.jpg`, 63 KB) used by every page (one page previously pointed at an SVG), JSON-LD added to 404 and Coming Soon, dashboard set to `noindex`.

## 1.0.0 — 2026-09-21
Initial release.
- 22 pages: two homepages, About, Services (+ details), Industries, Case Studies (+ details), Careers (+ job details), Partnership, Pricing, Blog (+ details), Contact, Login, Register, Admin Dashboard (optional demo), Privacy, Terms, 404, Coming Soon.
- Design system with light/dark themes and RTL support.
- Shared filter/search/sort/pagination/deep-link engine; validation engine with demo/Formspree/Netlify/REST modes.
- SVG dashboard charts with table-view alternatives and keyboard-accessible tooltips.
- SEO: unique titles/descriptions, canonical, Open Graph, Twitter Cards, JSON-LD (Organization, WebSite, BreadcrumbList, ItemList, Service, Article, LocalBusiness, Blog), robots.txt, sitemap.xml.
- Accessibility pass targeting WCAG 2.1 AA; programmatic contrast audit in both themes.
