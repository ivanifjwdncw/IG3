# RustyLoot Casino — Static Frontend

A static, SEO-optimised frontend for the **RustyLoot** online casino, built
directly from the [Figma design](https://www.figma.com/design/BeCLhs07g8NpxLf0XqpaOw/Casino-Web-Site--Community-?node-id=0-3)
using the Figma MCP server.

## What's inside

```
.
├── index.html            Semantic HTML5 markup with JSON-LD structured data
├── styles.css            Design tokens + responsive layout (sidebar / main / chat)
├── script.js             Leaderboard countdown, tabs, chat room switcher
├── robots.txt            Crawler directives
├── sitemap.xml           Multilingual sitemap (en / ru / es)
├── site.webmanifest      PWA-ready manifest
└── assets/
    ├── branding/         Logos, hero banner, background art
    ├── games/            Game tile artwork + title word-marks
    ├── icons/            Navigation, social, flags
    └── chat/             Avatars & emoji placeholders
```

## SEO highlights

- **Semantic HTML5** — `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, proper
  heading hierarchy (single `<h1>`, section `<h2>`s, topical `<h3>`s).
- **Meta tags** — title, description, keywords, canonical, theme-color, robots.
- **Open Graph & Twitter Card** — ready for rich link previews.
- **Hreflang** — declared for `en`, `ru`, `es` and `x-default`.
- **JSON-LD** — `Organization`, `WebSite` with `SearchAction`, `WebPage`,
  `BreadcrumbList`, `ItemList` (all 7 games) and `FAQPage`.
- **Accessibility** — skip link, ARIA roles on tabs/chat, `aria-live` on timer,
  keyboard-visible focus styles, `prefers-reduced-motion` opt-out.
- **Performance** — `preconnect` + `preload` for hero assets, `loading="lazy"`
  on below-the-fold tiles, static-only (no framework runtime).
- **PWA** — web manifest with theme colour matching the UI.

## Running locally

It's pure HTML/CSS/JS, so any static server works:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploying

Drop the whole folder into any static host (Netlify, Vercel, Cloudflare Pages,
S3+CloudFront, GitHub Pages). Before deploying, replace
`https://rustyloot.example.com` in `index.html`, `sitemap.xml`, `robots.txt`
with your production domain.

## Credits

Design: *Casino Web Site (Community)* on Figma. Artwork © original authors.
