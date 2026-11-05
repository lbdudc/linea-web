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
