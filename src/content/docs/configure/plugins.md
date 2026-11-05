---
title: "Plugins"
description: "A plugin is an optional capability added to LINEA without touching its core."
sidebar:
  order: 12
---

## Definition

A **plugin** is an optional capability added to LINEA without changing its core. The rule for deciding whether a feature should be a plugin is that **LINEA must work completely without it**. Essential functions (git servers, modules, registry) belong to the core or to configuration.

A plugin can provide server routes (`/api/plugins/<id>/…`), pages and menu entries, panels on existing screens, a service of its own and settings that can be configured from the interface. It is installed, enabled and disabled **without restarting**, from the **Plugins** view, which only administrators can open.

## Bundled plugins

| Plugin | Role | Runs |
|---|---|---|
| `analytics-plugin` | Feature model analysis with flamapy: satisfiability, dead features, false optionals and number of configurations. Adds a strip of figures and an analysis panel to the editor. | Routes and interface in LINEA, plus a Python service (FastAPI and flamapy) in its own container. |
| `agents-plugin` | AI agents, reachable as pages under the **Agents** tab. Users sign in to LINEA only, which forwards calls to the agents service on their behalf. | Pages and a proxy in LINEA, and the `linea-agents` service (own repository and database, no authentication or web interface of its own), deployed independently. |
| `hello-plugin` | A minimal reference example: one route, one menu entry and one setting of each type. | In LINEA. |

The agents plugin only works with GitLab. Without an active GitLab host it stays disabled and hidden.

## Installation and configuration

1. Sign in as an administrator, open **Plugins** (`/plugins`) and browse the catalogue.
2. Install and enable the plugin.
3. **Configure** opens a form generated from the settings the plugin declares.
4. The plugin's card shows whether its service is available (periodic health check).
5. A plugin with a required setting that has no value cannot be enabled; the card shows the missing setting.

### Setting precedence

`default value` < `environment variable` < `value saved in the Plugins view` < `linea.config.yml`

Values coming from the file are locked in the view. The **Download config** action produces a `linea.config.yml` with the current configuration; secrets are replaced by `${VARIABLE}`.

### Environment variables

`FLAMAPY_API_URL` (analytics); `AGENTS_URL`, `AGENTS_SERVICE_KEY` and `LINEA_SERVICE_KEYS` (agents); `EVENT_WEBHOOK_SECRET`; `PLUGINS_DIR` (alternative plugins folder); `LINEA_PLUGINS` (plugins installed at startup).

### Plugin services

With Docker: `docker compose -f docker-compose.yml -f docker-compose.plugins.yml up -d --build`. Without the second file LINEA runs normally, but plugins that need a service show as unavailable.

## Structure of a plugin

```
plugins/
  marketplace.json         catalogue: [{ id, path, icon?, description? }]
  <id>/
    plugin.json            manifest
    server/index.js        optional: export default { register(ctx) }
    client/index.js        optional: export default { register(ui) }
    service/               optional: own service (Dockerfile, compose)
    test/server, test/client
```

- **`plugin.json`** declares `id` (lowercase letters, digits and hyphens), name and description (`en`, `es`, `gl`), `requires.linea` (compatible version range), `settings` and, where relevant, `remote` (`baseUrl`, `health`, `events`).
- **Server** (`register(ctx)`): `ctx.router()` for routes, `ctx.events.on()` for events and `ctx.settings()` to read settings at the time of use, so a change applies without a restart. Routes answer only while the plugin is enabled; otherwise they return `404 plugin_disabled`.
- **Client** (`register(ui)`): `ui.addNav()`, `ui.addRoute()`, `ui.addSlot()` (for example `featureModel.strip` and `featureModel.panels`) and `ui.addI18n()`.
- **Rules enforced by automated tests:** the core never names a plugin; a plugin imports only what the host gives it and never another plugin; an extension point exists only while some plugin uses it.

### Service authentication

A plugin with its own service uses a **service key**: it sends `Authorization: Service <key>` and `X-Act-As: <user>`, and LINEA lets it perform the operations that user could perform. Every use is logged with the service and the person. This is how agents need no authentication of their own.

## Classification criteria

| Capability | Category |
|---|---|
| Support for a new git server | Configuration and a provider in `linea-git`; never a plugin. |
| A function LINEA does not need in order to operate (reports, integrations) | Plugin. |
| A function required by every line (modules, generation) | Core. |

More documentation: `plugins/README.md` and `linea/docs/linea/architecture.md`.
