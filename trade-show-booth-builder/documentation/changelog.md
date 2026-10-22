# Changelog


## 2.4.0 — 2026-10-22

Website review corrections (Sep slot 3, second correction).

- Home 1: Featured Portfolio shows eight projects, so every row is full at one, two and three columns.
- Home 2: hero content is centred (the project sheet becomes a centred strip on desktop); Booth Types is a grid instead of a sideways scroller.
- Contact: the page heading is centred.
- Mobile menu: the theme and direction controls were removed (both are in the header at every width); "Request a Project Quote" is hidden from 768px, where the header shows it.

## 2.3.1 — 2026-10-11

Follow-up fixes after the review corrections.

- Portfolio: the stand photographs added in 2.3.0 showed other exhibitors' real stands, so they were removed; the portfolio and the Home 2 case-study hero use the original concept renders again, and the credits are back to their earlier, accurate wording.
- Header no longer overflows 320px screens (smaller wordmark and mark below 360px; all three header controls stay 44px).
- Admin dashboard: KPI cards stack in one column below 420px instead of overflowing.
- Contact: the consent checkbox has an explicit label ("I agree to be contacted about this enquiry."); the Privacy Policy button moved out of the label into a linked note (`aria-describedby`). The generator audit now reports 0 problems.
- Social-sharing image (`og-cover.jpg`, and `og-cover.svg` via `build_assets.py`) uses the current logo mark; size unchanged (1200 × 630).

## 2.3.0 — 2026-10-09

Website review corrections (Sep slot 3, first correction).

- Logo refined: the corner-stand mark now stands on a solid accent platform with crisp edges at small sizes, and the wordmark uses weight 800 with tighter tracking (`logo.svg`, `logo-light.svg`, `logo-mark.svg`, `favicon.svg`, and the generator in `tools/generator/layout.py` / `build_assets.py`).
- Typography: every heading uses weight 600; paragraph-style text (pull quotes, contact details) uses 500 and body copy 400.
- Home 1: "Why exhibitors choose Standform" trimmed from eight to four points — the four removed points repeated the service cards directly above (their facts remain on the About page).
- Portfolio images: `build.py` and `portfolio.js` now read each project's image path and alt text from the project data, so a project can switch from its render to a photo by adding one entry to `layout.PHOTO`. The portfolio keeps its original concept renders (see 2.3.1).

## 2.2.0 — 2026-09-28

Home menu, requirements review and integration points.

- Home 2: the discovery-call offer moved into the enquiry section (with a calendar integration point) and the duplicate closing band was removed.
- Loading state: “Load more articles” shows skeleton cards while the next batch loads.
- Blog: the featured article is skipped in the grid's “All” view; Blog, Process and Services page heroes now use photos that are not repeated further down the page.
- Inner-page CTAs no longer open with “Ready to…?” (Services and FAQ now lead with the benefit).
- Mailchimp / ConvertKit notes in `forms.js`, a Stripe / PayPal payment note on the pricing page, and an *Integration points* table in the customization guide.
- Meta descriptions on five pages rewritten to 150–160 characters.

## 2.1.0 — 2026-09-28

Navigation, direction toggle, imagery and CTA update.

- Direction control is now a single **LTR** toggle button (header, mobile drawer, dashboard and Coming Soon): it shows the current direction, switches to RTL on click (label changes to “RTL”), and the choice persists across pages. The two-button LTR | RTL switch was removed. Generator (`tools/generator`) updated and pages rebuilt.

## 2.0.0 — 2026-09-27

Design, imagery and UX revision.

- Replaced the flat service, process and blog scenes with 27 photographs (WebP): a real show-floor stand as the Home 1 hero, workshop, installation, graphics, lighting, logistics and team photos for the eight services and ten process stages, and eight blog covers. Portfolio renders and floor plans stay as isometric SVG — they are design renders of fictional client work, not photos of real brands.
- New logomark, favicon and lockups: an isometric open-sided stand (floor, back wall, side wall, accent header fascia), replacing the generic square mark.
- Visible LTR | RTL switch in the desktop header, the drawer, Coming Soon and the dashboard (the old drawer/footer toggles still work).
- Contact: the stylised SVG map is now an interactive Google Maps embed with a documented Maps Embed API option (`YOUR_GOOGLE_MAPS_API_KEY`).
- SEO: raster social image (`og-cover.jpg`) on every page, hero preload points at the WebP photo, over-length titles shortened, Organization JSON-LD on 404/login/register, sitemap lastmod refreshed.
- Header CTA no longer wraps and the header no longer overflows at 1180–1300 px; phone/email links isolated as LTR in RTL.
- Generator: `layout.PHOTO` maps image names to photos (used by `img()`, the JS data files and the preload), so `python3 build.py` reproduces the shipped site. `build_assets.py` draws the new logo.

## 1.0.0: 2026-09-21

Initial release.

- 18 pages: two homepages, about, services, service details, booth types, portfolio, portfolio details, process, pricing, blog, blog details, contact, login, register, admin dashboard demo, 404, coming soon.
- 56 original SVG illustrations and brand marks.
- Light and dark themes with system detection and persistence.
- RTL support (`rtl.css`) with an in-page test switch.
- Portfolio filtering, search and deep links; project, service and article detail hydration from query strings.
- Project cost estimator with editable formula.
- Accessible form validation with loading, success and error states; drag-and-drop upload UI.
- Blog search, category filter, load more, table of contents with scroll-spy.
- Dashboard demo with dependency-free SVG charts and a table view for each chart.
- SEO: metadata on every page, JSON-LD, `robots.txt`, `sitemap.xml`.
- Documentation and README.
