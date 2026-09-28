# Installation

## Requirements

None. This is a static HTML/CSS/JS template with no build step, no
`package.json`, and no framework dependency. You need only:

- A modern browser (Chrome, Firefox, Safari, or Edge) for local preview
- Any static file host for production (Netlify, Vercel, GitHub Pages, S3 +
  CloudFront, or a plain Apache/Nginx server)

## Local Preview

Opening `pages/index.html` directly via `file://` works for basic browsing,
but **relative fetches (forms posting to an endpoint, and some browsers'
`file://` security restrictions) behave more reliably under a local HTTP
server.** Pick one:

```bash
# Python (usually preinstalled on macOS/Linux)
python3 -m http.server 8080

# Node (no install needed)
npx serve .

# PHP
php -S localhost:8080
```

Then open `http://localhost:8080/pages/index.html`.

## Deploying

Because this is a static site, deployment is a matter of uploading the whole
project folder to your host:

- **Netlify / Vercel:** drag-and-drop the project folder, or connect a git
  repo. Set the publish directory to the project root.
- **GitHub Pages:** push to a repo and enable Pages on the `main` branch,
  root directory.
- **Traditional hosting (cPanel, S3, Nginx):** upload the contents of this
  folder to your web root.

### Set the homepage

Most hosts serve `index.html` at the root automatically — this template's
root `index.html` redirects to `pages/index.html`. If your host lets you set
a custom start page, you can point it directly at `pages/index.html` and
delete the root redirect file.

### Clean URLs (optional)

Pages use `.html` extensions in links (e.g. `products.html`) for maximum
host compatibility. If your host supports URL rewriting, you can strip
`.html` extensions — no changes to the HTML files are required for most
rewrite-based setups (Netlify's `_redirects`, Vercel's `vercel.json`, or
Apache's `mod_rewrite`).

## Connecting Forms

All forms currently simulate submission client-side (see
`assets/js/main.js`, function `submitForm`) so the loading/success/error UI
states work out of the box without a backend. To connect real form handling:

1. **Formspree:** create a form at formspree.io, then set the form's
   `action` attribute to your Formspree endpoint URL and add
   `method="POST"`.
2. **Netlify Forms:** add `data-netlify="true"` and a hidden `form-name`
   input to any `<form>`, then redeploy on Netlify.

Search the codebase for `TODO: Replace with actual Formspree endpoint` to
find every form that needs a real endpoint.

## Connecting the Newsletter

Footer and page newsletter forms are marked with `TODO: Replace with
Mailchimp / ConvertKit form action + list ID` in `assets/js/main.js`
(`initGenericNewsletterForms`). Point the form's `action` at your provider's
embed endpoint per their documentation.

## Google Maps

The Contact page (`pages/contact.html`) includes a placeholder map block
marked `<!-- GOOGLE MAPS API PLACEHOLDER -->`. Replace it with an `<iframe>`
embed or the Maps JavaScript API using your own API key — never commit a
real API key into a public repository without domain restrictions enabled.
