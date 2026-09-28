# Page Structure

All pages live in `pages/` and share the same header, mobile navigation and footer markup. Every page links its assets with relative paths (`../assets/...`), so the project can be opened directly from disk or served from any static host without configuration.

| Page | Purpose |
|---|---|
| `index.html` | Primary homepage — hero, popular products, category showcase, custom branding intro, trust/benefits, bulk order intro, final CTA. |
| `home-2.html` | Alternate homepage with an editorial layout — campaign showcase, asymmetric category explorer, horizontal product scroller, numbered branding methods, testimonial spotlight. |
| `products.html` | Full product catalogue with client-side search and filters (category, branding method, use case, availability, price range). |
| `product-details.html` | Single product page — reads a `?id=` query parameter to show specs, pricing, FAQ and related products. |
| `custom-branding.html` | Branding methods, an interactive 8-step workflow, the logo placement visualizer, and the custom branding request form (with logo upload). |
| `bulk-orders.html` | B2B bulk-order use cases, quantity tiers, an 8-step process, the indicative pricing estimator, and the bulk order request form. |
| `pricing.html` | Explains the factors that drive quote pricing (this is a quotation-based business, not fixed tiers), plus a quantity-impact slider. |
| `services.html` | Grid of all services offered, each linking to more detail. |
| `service-details.html` | Detail template for one service (Corporate Gifting is used as the example). |
| `corporate-gifting.html` | Gifting collections (executive sets, welcome kits, client gifts, holiday gifting) and customization options. |
| `about.html` | Company story, mission/vision, capabilities, a timeline, and testimonials. |
| `blog.html` | Article listing with search, category filters and pagination (client-side, from `assets/js/blog.js`). |
| `blog-details.html` | Article detail template — reads a `?id=` query parameter for meta/title and shows related articles. |
| `contact.html` | Main quotation/contact form plus contact details, a map placeholder and an FAQ accordion. |
| `login.html` / `register.html` | Optional account template pages. Not required to request a quote — no auth backend is connected. |
| `admin-dashboard.html` | **Optional, internal-only** demo dashboard (Overview, Products, Quotes, Bulk Orders, Branding Requests, Customers, Messages, Reports, Settings). Not linked from the public header/footer and excluded from `robots.txt`. |
| `legal.html` | Privacy Policy, Terms & Conditions and Cookie Policy, each in its own anchored section. |
| `404.html` | Not-found page with business-specific copy. |
| `coming-soon.html` | Placeholder/launch page for a section not yet live. |

## Shared Components

Reusable component styles (buttons, cards, forms, tabs, accordions, badges, tables, pagination, modals, toasts, etc.) live in `assets/css/style.css` and are documented by their class names — see that file's section comments for the full list.

## Shared Scripts

| File | Responsibility |
|---|---|
| `assets/js/main.js` | Theme toggle, mobile nav, accordions, tabs, scroll-reveal, quantity steppers, sticky mobile CTA, toast utility. Loaded on every page. |
| `assets/js/forms.js` | Shared form validation, submission handling and file-upload UI (drag & drop, validation, progress). Loaded on every page with a form. |
| `assets/js/products.js` | Product data + catalogue rendering/filtering/search; also renders the homepage's "Popular Products" grid and the product detail page. |
| `assets/js/branding.js` | Custom branding workflow stepper and placement visualizer. |
| `assets/js/bulk-orders.js` | Bulk order indicative pricing estimator. |
| `assets/js/pricing.js` | Quantity-impact slider on the Pricing page. |
| `assets/js/blog.js` | Blog post data, search, category filter, pagination, and article detail rendering. |
| `assets/js/dashboard.js` | Section switching and animated stat bars for the optional admin dashboard demo. |
