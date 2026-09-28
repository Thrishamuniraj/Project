# Support

## Before You Ask

Most customization questions are answered in
[customization.md](customization.md) — brand swap, colors, fonts, images,
and editing products/services/pricing are all covered there with exact file
locations.

## Common Issues

**"My CSS/JS changes aren't showing up."**
Browsers aggressively cache linked `.css` and `.js` files. Hard-refresh
(Cmd/Ctrl+Shift+R) or open in a private/incognito window after editing.

**"Forms don't actually send anywhere."**
By design — this is a static template. Every form simulates a submission so
the loading/success/error states are visible, but nothing is sent over the
network until you connect a real endpoint. See
[installation.md](installation.md#connecting-forms).

**"The admin dashboard is publicly accessible."**
It's a demo/reference UI, not an authenticated application — this template
has no backend. Do not deploy `admin-dashboard.html` to production without
putting real authentication and a real API behind it. It's excluded from
`sitemap.xml` and disallowed in `robots.txt` for search engines, but that
does not restrict direct access.

**"Dark mode flashes light before switching on page load."**
`assets/js/main.js` applies the stored theme as early as possible (before
`DOMContentLoaded`), but a brief flash can still occur on very slow
connections while the script downloads. Consider inlining the theme-check
script directly in `<head>` if this matters for your deployment.

## Getting Help

This is a template, not a hosted product — there is no support ticketing
system. For implementation questions:

1. Re-read the relevant `documentation/*.md` file
2. Inspect the corresponding `assets/js/*.js` file — every script is
   commented with section headers
3. Search this repository for `TODO:` comments — they mark every place a
   real backend/API key/endpoint needs to be supplied
