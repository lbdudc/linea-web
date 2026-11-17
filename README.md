# linea-web

The landing page and the documentation of [LINEA](https://github.com/lbdudc/linea), built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build). Live at **https://lbdudc.github.io/linea-web/**.

The documentation describes the published artifacts: the Docker images (`ghcr.io/lbdudc/linea-*`), the npm packages (`@lbdudc/linea-*`), [`linea-plugins`](https://github.com/lbdudc/linea-plugins) and [`linea-metamodels`](https://github.com/lbdudc/linea-metamodels). When a release changes a command, an image name or a setting, update the pages that show it (`install/`, `get-started/`, `reference/`).

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
src/data/links.ts             # every outward link and install command of the landing (repositories, npm, GHCR): change a URL here once
src/pages/index.astro         # landing page
src/components/Configurator   # interactive feature configurator
src/styles/                   # tokens (from the LINEA app), landing and Starlight theme
src/content/docs/
├── introduction.mdx
├── get-started/              # quickstart (Docker)
├── install/                  # Docker, command line and npm packages, development stack
├── configure/                # git hosts, plugins, registry, settings, production checklist
├── concepts/                 # what is LINEA, line types, feature models, metamodels, modules
├── guides/                   # getting started with lines and products
├── internals/                # creating an SPL, generating a product, CI/CD, releasing
└── reference/                # environment variables, linea.config.yml, glossary
```

The documentation started from the project wiki of the internal GitLab (October 2026), translated to English. Diagrams are written in ```` ```mermaid ```` blocks.

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
