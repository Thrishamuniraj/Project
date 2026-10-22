# Changelog


## 2.4.0 — 2026-10-22

Website review corrections (Sep slot 3, second correction).

- Feature cards use card-sized titles that line up across each row (Home 1 "Built for businesses", Bulk Orders, Services). Home 1 How It Works gains an eighth step ("Reorder anytime"); Custom Embroidery steps gain "Delivery".
- Home 2: the Featured Collections heading is centred.
- Blog, Blog Details and Coming Soon: the newsletter email field is visible in light mode.
- Industries: stacked rows use shorter photos on phones and tablets.
- Mobile menu: the direction control, "View Products" and the duplicate "Request a Quote" (from 640px, where the header shows it) were removed.
- Home dropdown: on touch screens the first tap opens the menu and a second tap follows the link.

## 2.3.1 — 2026-10-11

Follow-up fixes after the review corrections.

- Form status messages, blog cards, the logo-upload error and the active-filter bar now respect the `hidden` attribute. Before, the contact page showed its success message before any submission and the blog listed all 12 posts at once instead of six per page.
- In-page links land below the sticky header (`scroll-padding-top`).

## 2.3.0 — 2026-10-09

Website review corrections (Sep slot 3, first correction).

- Header: **About** now sits next to **Home**, and the theme and RTL toggles moved from the top bar into the main header bar on every page (the Legal page gained the theme toggle).
- Sticky header fixed: `overflow-x: clip` replaces the `hidden` value that disabled `position: sticky`; the main bar stays pinned while the top bar scrolls away. The menu collapses to the hamburger below 1200px so the header never overflows.
- Home 2: new full-bleed industry hero (distinct from Home 1) with six industry shortcuts; the Featured Collection is now a grid with no horizontal scrolling.
- Hero and final CTA buttons on both homepages have clear hover and focus states (outline buttons fill white; accent buttons darken with a focus ring).
- New **Industries** page (`pages/industries.html`) — the header and mobile-menu Industries links point to it; added to `sitemap.xml`.
- Custom Embroidery: the Placement Guide is now a clean numbered diagram (polo front/back and cap) with a matching legend.
- About: the leadership section uses real portrait photos.
- Blog: smaller labels on article cards.

## 2.2.0 — 2026-09-28

Home menu, requirements review and integration points.

- Home menu rebuilt to match the Printora pattern: one **Home ⌄** link opens a dropdown card with Home 1 — Uniform Supplier and Home 2 — Industry Solutions on hover or keyboard focus (Escape closes it); the mobile menu has a collapsible **Home ⌄** row instead of a static group.
- Integration points completed and documented (new *Integration points* table in `documentation/customization.md`): a “Book a 15-minute call” calendar hook on the contact page and a Stripe / PayPal payment note on the pricing page.
- Blog: the featured article is skipped in the grid's “All” view (still listed under Uniform Guides and in search); the article page sidebar and related grid no longer repeat images, and the sidebar no longer lists the article you are reading.
- Meta descriptions on eight pages rewritten to 150–160 characters.
- `assets/js/plugins/` and `assets/fonts/` now contain README notes.

## 2.1.0 — 2026-09-28

Navigation, direction toggle, imagery and CTA update.

- Header **Home** menu with both homepages — Home 1 (Uniform Supplier) and Home 2 (Industry Solutions) — on every page; opens on hover, click or keyboard (Escape closes). The mobile drawer lists both under a Home group; the current page is marked.
- Direction control is now a single **LTR** toggle button (header, mobile drawer, dashboard and Coming Soon): it shows the current direction, switches to RTL on click (label changes to “RTL”), and the choice persists across pages. The two-button LTR | RTL switch was removed. It sits next to the theme toggle and stays visible at every width.
- Imagery: 18 uniform photos now show embroidered or printed logos of the template's fictional clients (hero crew, category cards, industry cards, Home 2 industries and the six Home 2 collection products). The Polo and Work Jackets category photos were replaced with on-topic garment shots.
- Alignment: consistent spacing between headings and the text below them; the top bar no longer wraps and doubles the header height at tablet widths; drawer items line up.
- Final CTA on both homepages rewritten: a benefit-led headline, three proof points (free embroidery proof, 7–10 day turnaround, saved stitch files / industry fit advice) and two actions.

## 2.0.0 — 2026-09-27

Design, imagery and UX revision.

- Replaced SVG scenes with 66 photographs (WebP, explicit dimensions, lazy-loaded): heroes, categories, industries, all 16 catalogue products (shared with the Home 2 collection and service details), fabrics, services, about, auth and every blog article.
- New logomark, favicon and horizontal logo: an embroidered "T" (satin-stitch bar, running-stitch stem) with needle and thread, in the existing navy/orange palette; the mark is now a cacheable SVG file.
- Added a visible LTR | RTL switch (top bar, mobile drawer, compact headers, Coming Soon, dashboard) with persistence and a pre-paint script that also removes the theme flash.
- Header now has one primary CTA (Request a Quote); "View Products" stays in the navigation and drawer.
- Fixed canonical and og:url tags that pointed to non-existent root URLs (e.g. `/about.html`) — they now match the sitemap (`/pages/…`).
- Contact: interactive Google Maps embed with a documented Maps Embed API option (`YOUR_GOOGLE_MAPS_API_KEY`). Coming Soon: stitched-garment photo, theme + direction controls and contact details.
- SEO: raster Open Graph image, OG/Twitter/JSON-LD on every public page, short descriptions rewritten, dashboard `noindex`.
- Accessibility: heading outline fixed (footer, collection cards, benefit cards, product tabs, dashboard) with visual sizes preserved; phone/email links isolated as LTR in RTL.

All notable changes to this template are documented here.

## [1.0.0] — 2026-03-15

Initial release.

### Added
- 18 pages: Home 1, Home 2, Products, Service Details, Services, Custom
  Embroidery, Bulk Orders, Pricing, About, Blog, Blog Details, Contact,
  Login, Register, Admin Dashboard, Legal, 404, Coming Soon
- Full design system in `assets/css/style.css` (CSS custom properties,
  4px spacing scale, reusable component classes)
- Dark mode with system detection, manual toggle, and persistence
  (`assets/css/dark-mode.css`)
- RTL layout support (`assets/css/rtl.css`)
- Live product filtering, search, sort, and `?category=` deep links
  (`assets/js/products.js`)
- Custom embroidery request workflow with drag-and-drop upload
  (`assets/js/embroidery.js`)
- Bulk order form with conditional logo-availability messaging
  (`assets/js/bulk-orders.js`)
- Interactive bulk pricing calculator (`assets/js/pricing.js`)
- Blog search, category filtering, and client-side pagination
  (`assets/js/blog.js`)
- Admin dashboard section switching and table search
  (`assets/js/dashboard.js`)
- 35+ original SVG illustrations across hero, category, industry, product,
  fabric, embroidery, blog, and team imagery
- Full documentation set (installation, customization, page structure,
  credits, changelog, support)
- `robots.txt` and `sitemap.xml`
