<p align="center">
  <img src="./public/moss-logo.png" alt="Moss logo" width="96">
</p>

<h1 align="center">Moss Website</h1>

<p align="center">
  <strong>Game servers that keep growing, quietly.</strong><br>
  The public site for <a href="https://github.com/T1nkiePlayz/Moss">Moss</a>, the open-source Minecraft Java server controller: landing page, documentation, downloads, changelog and roadmap.
</p>

<p align="center">
  <img src="https://github.com/T1nkiePlayz/Moss-Website/actions/workflows/ci.yml/badge.svg" alt="CI">
  <img src="https://img.shields.io/github/last-commit/T1nkiePlayz/Moss-Website?style=flat-square" alt="Last commit">
  <img src="https://img.shields.io/badge/stack-Astro%20%7C%20zero%20client%20framework-informational?style=flat-square" alt="Stack">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT licence">
</p>

> [!NOTE]
> **This repository is the website only.** The controller lives in [T1nkiePlayz/Moss](https://github.com/T1nkiePlayz/Moss).

## Design decisions

- **Static and tiny.** Built with [Astro](https://astro.build): every page is pre-rendered HTML and CSS. The only JavaScript is about 20 lines for the theme toggle and the copy button.
- **No accounts, on purpose.** Moss is self-hosted and signs people in through the owner's own Supabase project, so a website login would have nothing to manage. There is no dashboard, no cookies, no analytics and no trackers.
- **Docs come from the product.** The documentation pages are derived from the Moss repository's README and `docs/`, so install, configuration and security text matches the software.
- **Accessible by default.** Semantic landmarks, skip link, visible focus, light and dark themes, reduced-motion support, and a layout that holds at phone width.

## Pages

| Route | Purpose |
|---|---|
| `/` | Landing page: features, tour, runtimes, comparison, security, FAQ |
| `/docs/…` | Getting started, configuration, sign-in setup, runtimes, security, architecture, API |
| `/download/` | Release download, verification and build-from-source steps |
| `/changelog/`, `/roadmap/` | Release highlights and direction |
| `/privacy/`, `/terms/` | Policies (also used for OAuth app listings) |

## Development

```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # type-check, build, then check every internal link and #anchor in dist/
npm run preview
```

Layout: `src/pages/` (routes; docs are Markdown in `src/pages/docs/`), `src/layouts/`, `src/components/`, `src/data/site.ts` (navigation, docs index, constants), `src/styles/global.css` (design tokens shared with the Moss panel), `public/` (logo, screenshots, social image), `scripts/check-links.mjs`.

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`, taking the site URL and base path from `actions/configure-pages`, so it works under `user.github.io/Moss-Website/` and on a custom domain without changes. Enable it under **Settings → Pages → Source: GitHub Actions**. GitHub Pages on a private repository needs a paid plan.

## License

MIT. See [LICENSE](LICENSE). The Moss name and logo belong to the Moss project.
