# Support

## Getting Help With This Template

This is a static HTML/CSS/JavaScript template with no backend, so most "support" questions come down to customization. Start here:

1. [installation.md](installation.md) — how to open and preview the project.
2. [customization.md](customization.md) — colors, fonts, logo, product data, forms, theming, RTL.
3. [page-structure.md](page-structure.md) — what each page does and which script powers it.

## Connecting a Real Backend

This template ships with **no backend** by design (see the main prompt's B2B quotation-based scope). Every form simulates a submission locally. Search the codebase for `TODO(backend)` comments — each one marks a spot where a real integration point is expected:

- `assets/js/forms.js` — form submission (`fakeSubmit()`), suggested integrations: Formspree, Netlify Forms, or a custom API.
- `pages/contact.html` — map placeholder, suggested integration: a Google Maps embed.
- `assets/js/products.js` — product data array, suggested integration: a product API or CMS feed.

## Common Issues

**Fonts or icons don't appear when opening a page directly from disk.**
Google Fonts require an internet connection to load; icons are inline SVG and always work offline. If neither loads, check that you didn't move `pages/` out of the project root — asset paths are relative (`../assets/...`).

**Dark mode doesn't match my OS setting.**
The toggle in the header stores an explicit choice in `localStorage` (`bcm-theme`) once clicked, which then overrides the OS preference on that page going forward. Clear that key (or use your browser's site data settings) to return to following the OS setting.

**A filter or form doesn't seem to do anything.**
Check the browser console for errors, and confirm JavaScript is enabled — every interactive feature (filters, estimator, workflow stepper, uploads) is vanilla JS with no build step, so a typo in a copied/edited `<script>` tag is the most common cause.

## Reporting a Template Issue

Since this is a delivered template rather than a hosted service, there is no support ticketing system included. Track issues and fixes internally using [changelog.md](changelog.md) as your release log.
