## Quick orientation for AI coding agents

This is a small, static marketing site (no build step). Key principles: pages are plain HTML, shared header/footer are fetched at runtime, CSS uses semantic variables and strict ordering, and JS is split between a main-only script and a sub-page common script.

Keep changes conservative: follow the on-disk `_template.html` and `RULES.md` as the authoritative source of conventions.

### Primary files/dirs to read first
- `_template.html` — canonical template for all sub-pages (must copy to create new pages).
- `index.html` — main page (loads `js/main.js` and has extra behaviors: hero video, sliders).
- `components/header.html`, `components/footer.html` — injected into pages at runtime by `js/include.js`.
- `js/include.js` — fetches and injects components, then dispatches `componentsLoaded`.
- `js/common.js` — sub-page behaviors; listens for `componentsLoaded` and `DOMContentLoaded`.
- `js/main.js` — main-page-only behaviors (hero video, slider, etc.).
- `css/variables.css`, `css/style.css`, `css/sub.css` — order matters (variables → common → sub).
- `RULES.md` — authoritative conventions (naming, spacing, color variables, restrictions).

### Big-picture architecture notes
- Static site served over HTTP. `include.js` uses `fetch()` to load `components/*.html`; therefore pages must be served via HTTP (file:// won't work reliably).
- Header/footer are single sources of truth; editing them affects every page that uses `#header-wrap` / `#footer-wrap` placeholders.
- `index.html` is intentionally separate: it uses `main.js` and heavier interactive logic; other pages use `common.js` only.

### Project-specific conventions (enforce these exactly)
- Filenames and folders: lowercase only.
- New sub-pages: always copy `_template.html` (do not duplicate existing pages).
- HTML body classes for sub-pages: set `class="is-sub-page [page-name]-page"` on `<body>` (see `_template.html`).
- CSS link order (must be preserved):

```html
<link rel="stylesheet" href="/css/variables.css">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/sub.css">
```

- JS load order for sub-pages (must be preserved): `js/include.js` then `js/common.js` (both deferred). `index.html` uses `js/main.js` instead of `js/common.js`.
- CSS rules: use semantic variables from `variables.css` (no hardcoded hex), avoid `!important`, and prefer the provided spacing/typography variables.

### Integration & sequencing pitfalls for agents
- When changing header/footer, remember `include.js` injects them asynchronously and then fires `componentsLoaded`. Attach logic to `componentsLoaded` or ensure idempotent init in `common.js` (it uses `dataset.initialized`).
- Because `include.js` uses `fetch()`, local debugging must use an HTTP server (see commands below).

### Useful, concrete examples
- New sub-page skeleton: copy `_template.html`, rename `about/my-page.html`, set `<body class="is-sub-page my-page-page">`, and write content inside `<main class="sub-content-wrapper"><div class="sub-inner">...</div></main>`.
- To make a global header change: edit `components/header.html` and coordinate — this will reflect on all pages that load the component.
- To add a sub-page script rely on `document.addEventListener('componentsLoaded', ...)` so the script sees the injected header/footer.

### Local preview & rule checks (PowerShell-friendly)
- Start a quick static server (requires Python):

```powershell
# from repository root
python -m http.server 8000
# Open http://localhost:8000/index.html
```

- If Node.js is available, an alternative:

```powershell
npx http-server -c-1 -p 8000
# or: npx serve -l 8000
```

- Quick content checks (PowerShell):

```powershell
# find hardcoded forbidden hex values in css
Select-String -Path .\css\*.css -Pattern "#4e6eff|#2D65F3|#001cff|#2B3A8B"

# find !important usage
Select-String -Path .\css\*.css -Pattern "!important"
```

### When to avoid changes
- Do not add new global CSS files or reorder the existing CSS includes.
- Do not create ad-hoc HTML includes; use `components/header.html` and `components/footer.html` only.

### Edge cases and test notes for agents
- Editing `components/*` and testing via file:// will fail due to fetch/CORS; always use an HTTP server.
- `common.js` protects against double-init via `dataset.initialized`; prefer using that pattern when adding global init.

If anything here is unclear or you'd like me to expand examples (new page PR checklist, live-debug checklist, or sample small automated checks), tell me which section to improve. 
