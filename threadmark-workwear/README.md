# ThreadMark Workwear — Uniform & Embroidery Supplier Template

A production-quality, responsive multi-page website template for a corporate
uniform, workwear, and embroidery supplier business. Built with semantic
HTML5, vanilla CSS3 (custom properties, no build step) and vanilla ES6+
JavaScript — no frameworks, no bundler required.

**Demo brand:** ThreadMark Workwear (fictional). Replace with your own brand
before going live — see [documentation/customization.md](documentation/customization.md).

## Quick Start

This is a static site — no build step, no `npm install`.

1. Open `pages/index.html` directly in a browser, **or**
2. Serve the folder locally so relative paths and forms behave the same as
   production (recommended):

   ```bash
   npx serve .
   # or
   python3 -m http.server 8080
   ```

3. Visit `http://localhost:8080/pages/index.html`.

The root `index.html` redirects to `pages/index.html` for convenience.

## Project Structure

```
threadmark-workwear/
├── assets/
│   ├── css/
│   │   ├── style.css        # Core design system + all components
│   │   ├── dark-mode.css    # Dark theme token overrides
│   │   └── rtl.css          # RTL (Arabic/Hebrew) layout overrides
│   ├── js/
│   │   ├── main.js          # Shared: theme, nav, forms, modals, toasts
│   │   ├── products.js      # Catalogue filtering/search/sort
│   │   ├── embroidery.js    # Embroidery request workflow
│   │   ├── bulk-orders.js   # Bulk order form behavior
│   │   ├── pricing.js       # Bulk order cost estimator
│   │   ├── blog.js          # Blog search/filter/pagination
│   │   └── dashboard.js     # Admin dashboard interactions
│   └── images/               # Logo, favicon, OG image, SVG art · photos/ (WebP photography)
├── pages/                    # All site pages (see list below)
├── documentation/            # Setup & customization guides
├── robots.txt
├── sitemap.xml
├── README.md
└── LICENSE
```

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home 1 — general uniform supplier landing page |
| `home-2.html` | Home 2 — industry-led editorial landing page |
| `products.html` | Filterable uniform catalogue |
| `service-details.html` | Single product detail page |
| `services.html` | Services overview |
| `custom-embroidery.html` | Embroidery request workflow + upload form |
| `bulk-orders.html` | Bulk order request form |
| `pricing.html` | Pricing factors + interactive cost estimator |
| `about.html` | Company story, team, quality standards |
| `blog.html` | Blog index with search/category filters |
| `blog-details.html` | Blog article template |
| `contact.html` | Contact + quote request form |
| `login.html` / `register.html` | Auth UI (front-end only) |
| `admin-dashboard.html` | Internal ops dashboard (not in main nav) |
| `legal.html` | Privacy Policy, Terms, Cookie Policy |
| `404.html` | Not-found page |
| `coming-soon.html` | Countdown / maintenance page |

## Key Features

- **Dark / light mode** with system detection, manual toggle, and
  `localStorage` persistence (`assets/js/main.js`)
- **LTR direction toggle** (one button that flips to RTL) in the top bar and mobile menu (persisted in `localStorage` as `tm-dir`, applied before first paint).
- **Real photography** — 66 royalty-free photos with licences in `documentation/credits.md` and an AI prompt per slot in `documentation/image-prompts.md`.
- **RTL-ready** — logical CSS properties throughout `style.css`, plus
  targeted overrides in `rtl.css` for icons, gradients and typography
- **Live product filtering** by industry, type, material, color, search and
  sort, with `?category=` deep-link support
- **Embroidery request workflow** with drag-and-drop upload, file validation,
  and placement/thread selection
- **Bulk order calculator** — instant (estimate-only) pricing based on
  garment, quantity, embroidery locations and thread colors
- **Accessible forms** — labelled fields, inline errors, `aria-live` regions,
  keyboard-operable custom controls
- **No build tooling** — edit the HTML/CSS/JS directly and refresh

## Documentation

See the [documentation/](documentation/) folder for:

- [installation.md](documentation/installation.md) — hosting & setup
- [customization.md](documentation/customization.md) — brand, color, fonts, content
- [page-structure.md](documentation/page-structure.md) — page-by-page breakdown
- [credits.md](documentation/credits.md) — fonts & asset credits
- [changelog.md](documentation/changelog.md) — version history
- [support.md](documentation/support.md) — where to get help

## Browser Support

Chrome, Firefox, Safari and Edge (current + previous major version).

## License

MIT — see [LICENSE](LICENSE). The "ThreadMark Workwear" brand name and logo
are placeholder demo content, not a real trademark.
