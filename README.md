# linea-web

Landing y documentación de [LINEA](https://github.com/lbdudc/linea-web), construidas con [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

## Requirements

- Node.js 22 (`nvm use 22`)

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Development server at `localhost:4321` |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve `dist/` locally |

## Structure

```
src/pages/index.astro         # landing page
src/components/Configurator   # interactive feature configurator
src/styles/                   # tokens (from the LINEA app), landing and Starlight theme
src/content/docs/
├── introduction.md
├── fundamentals/             # what is LINEA, metamodels, modules
├── setup/                    # installation, plugins
├── usage/                    # getting started
├── internals/                # creating an SPL, generating a product, CI/CD
└── reference/                # glossary
```

The documentation comes from the project wiki of `linea/linea` on GitLab (October 2026), translated to English. Diagrams are written in ```` ```mermaid ```` blocks.

## Deploying to GitHub Pages

The site is published to **https://lbdudc.github.io/linea-web/** by `.github/workflows/deploy.yml` on every push to `main`.

One-time setup in the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

How it works:

- GitHub Pages serves a project site under `/<repository>/`, so the workflow builds with `BASE_PATH=/linea-web`. `astro.config.mjs` reads it, and `scripts/apply-base.mjs` (run by `npm run build`) adds the prefix to the links written by hand in the pages and the Markdown.
- Locally `BASE_PATH` is empty and the site is served from the root.
- To test the Pages build on your machine:

  ```bash
  BASE_PATH=/linea-web npm run build
  BASE_PATH=/linea-web npm run preview   # http://localhost:4321/linea-web/
  ```

- With a custom domain, set `BASE_PATH: /` and `SITE_URL` to the domain in the workflow.
