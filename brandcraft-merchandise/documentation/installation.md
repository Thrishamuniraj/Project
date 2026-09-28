# Installation

## Opening the Project

This template is plain HTML, CSS and vanilla JavaScript — there is no build step, bundler or package manager required.

1. Unzip / clone the project folder.
2. Open `pages/index.html` directly in a browser, **or** serve the folder with any static file server (recommended so relative paths and fetch-based features behave exactly like production).

### Serving locally (recommended)

Any of the following work from the project root:

```bash
# Python 3
python3 -m http.server 8080

# Node (http-server package)
npx http-server -p 8080
```

Then visit `http://localhost:8080/pages/index.html`.

## Required Dependencies

None. The template loads two Google Fonts (Sora for headings, Inter for body text) from `fonts.googleapis.com` via `<link>` tags in each page's `<head>`. If you need a fully offline build, download the font files and swap the `<link>` tags for local `@font-face` declarations in `assets/css/style.css`.

## Browser Support

Tested in current versions of Chrome, Firefox, Safari and Edge. The template uses standard CSS Grid, Flexbox, CSS custom properties and `IntersectionObserver` — all widely supported in browsers from the last 4+ years.

## Folder Structure

See [page-structure.md](page-structure.md) for what each page does, and [customization.md](customization.md) for how to edit colors, fonts, product data and forms.
