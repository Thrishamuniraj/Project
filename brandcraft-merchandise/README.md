# BrandCraft Merchandise

A premium, production-quality HTML template for a **Promotional Products & Corporate Merchandise Supplier** — apparel, drinkware and tech accessories with custom branding, bulk ordering and quotation-based pricing for corporate, event and campaign buyers.

## Features

- **20 fully built pages** covering the complete B2B journey: discover products → explore branding → plan bulk orders → request a quote.
- **Two distinct homepages** — a conversion-focused Home 1 and an editorial, campaign-led Home 2.
- **Interactive product catalogue** with client-side search and filters (category, branding method, use case, availability, price).
- **Custom branding workflow**: an 8-step interactive stepper and a logo placement visualizer (per product type, keyboard-operable).
- **Drag-and-drop logo upload** with file type/size validation, progress and success/error states.
- **Bulk order estimator** with indicative unit-cost and production-time calculations (clearly labeled as indicative, not a binding quote).
- **Blog** with search, category filtering and pagination.
- **Light + dark mode** with system-preference detection, a manual toggle, and `localStorage` persistence.
- **Full RTL support** (`dir="rtl"`) via a dedicated stylesheet using logical properties.
- **Accessible by default**: skip link, semantic landmarks, labeled fields, visible focus states, keyboard-operable tabs/accordions/menus.
- **SEO-ready**: unique titles/descriptions, canonical URLs, Open Graph + Twitter meta, JSON-LD structured data, `robots.txt`, `sitemap.xml`.
- **No dependencies**: plain HTML5, CSS3 and vanilla JavaScript (ES6+) — no frameworks, no build step.

## Pages

Home · Home 2 · Products · Product Details · Custom Branding · Bulk Orders · Pricing · Services · Service Details · Corporate Gifting · About · Blog · Blog Details · Contact · Login · Register · Admin Dashboard *(optional, internal demo only)* · Legal · 404 · Coming Soon

See [documentation/page-structure.md](documentation/page-structure.md) for what each page does.

## Technologies

- HTML5, CSS3 (custom properties, Grid, Flexbox), vanilla JavaScript ES6+
- Google Fonts: Sora (headings), Inter (body)
- No React/Vue/Angular, no Tailwind/Bootstrap, no build tooling required

## Installation

```bash
# from the project root
python3 -m http.server 8080
# then open http://localhost:8080/pages/index.html
```

Or simply open `pages/index.html` directly in a browser — everything (including icons) works offline via `file://`; only the Google Fonts require an internet connection.

See [documentation/installation.md](documentation/installation.md) for details.

## Customization

Colors, fonts, the logo, product data, categories, forms and theming are all documented in [documentation/customization.md](documentation/customization.md).

## Responsive Support

Mobile-first, tested at:

- Mobile: < 640px
- Tablet: 640–1024px
- Desktop: 1024–1280px
- Large desktop: > 1280px

## Dark Mode

Toggle in the header; respects `prefers-color-scheme` by default and persists an explicit choice in `localStorage`.

## RTL

Use the **LTR** toggle in the header (or mobile menu) — it switches to RTL and relabels itself — to flip the whole layout; the choice is saved in `localStorage` (`bcm-dir`) and re-applied before first paint on every page. For a permanently RTL site, set `dir="rtl"` and the right `lang` (e.g. `ar`, `he`) on each `<html>` tag — `assets/css/rtl.css` is linked everywhere.

## Accessibility

WCAG 2.1 AA–oriented: semantic HTML, one `<h1>` per page, labeled form controls with visible errors, keyboard-operable menus/tabs/accordions/dropdowns, visible focus rings, sufficient color contrast in both themes.

## SEO

Every page has a unique `<title>` (≤ 60 characters) and meta description (~150–160 characters), a canonical URL, Open Graph/Twitter tags, and JSON-LD where relevant (Organization, WebSite, BreadcrumbList, Service, LocalBusiness). `robots.txt` and `sitemap.xml` are included at the project root.

## Browser Support

Current versions of Chrome, Firefox, Safari and Edge.

## Folder Structure

```
brandcraft-merchandise/
├── assets/
│   ├── css/        (style.css, dark-mode.css, rtl.css)
│   ├── js/         (main.js, products.js, branding.js, bulk-orders.js, pricing.js, blog.js, forms.js, dashboard.js)
│   └── images/      (logo, favicon, OG image, sprite source · photos/ WebP photography)
├── pages/           (20 HTML pages)
├── documentation/   (installation, customization, page-structure, credits, changelog, support)
├── robots.txt
├── sitemap.xml
├── README.md
└── LICENSE
```

## Credits

See [documentation/credits.md](documentation/credits.md) for fonts, icons and photo licences, and [documentation/image-prompts.md](documentation/image-prompts.md) for an AI prompt per photo slot if you want to generate your own imagery.

## License

See [LICENSE](LICENSE).
