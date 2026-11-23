---
title: "Plugins"
description: "A plugin is an optional capability added to LINEA without touching its core."
sidebar:
  order: 12
---

The official plugins live in [`lbdudc/linea-plugins`](https://github.com/lbdudc/linea-plugins), which also holds the catalog (`marketplace.json`) and how to write your own. The official Docker images already carry them.

## Definition

A **plugin** is an optional capability added to LINEA without changing its core. The rule for deciding whether a feature should be a plugin is that **LINEA must work completely without it**. Essential functions (git servers, modules, registry) belong to the core or to configuration.

A plugin can provide server routes (`/api/plugins/<id>/…`), pages and menu entries, panels on existing screens, a service of its own and settings that can be configured from the interface. It is installed, enabled and disabled **without restarting**, from the **Plugins** view, which only administrators can open.

## Bundled plugins

| Plugin | Role | Runs |
|---|---|---|
| `analytics-plugin` | Feature model analysis with flamapy: satisfiability, dead features, false optionals and number of configurations. Adds a strip of figures and an analysis panel to the editor. | Routes and interface in LINEA, plus a Python service (FastAPI and flamapy) in its own container. |
| `agents-plugin` | AI agents, reachable as pages under the **Agents** tab. Users sign in to LINEA only, which forwards calls to the agents service on their behalf. | Pages and a proxy in LINEA, and its service (the `agents-plugin/service` folder, with its own database, no web, deployed apart; it reaches repositories through LINEA's API, whatever the git host). |
| `spl-code-editor` | The **Code** tab of simple SPLs: file editor, feature to code annotations and a trial derivation without making a product. | Routes and interface in LINEA. |

## Installation and configuration

1. Sign in as an administrator, open **Plugins** (`/plugins`) and browse the catalogue.
2. Install and enable the plugin.
3. **Configure** opens a form generated from the settings the plugin declares.
4. The plugin's card shows whether its service is available (periodic health check) and, when the plugin runs a Docker service, the state of its containers.
5. A plugin with a required setting that has no value cannot be enabled; the card shows the missing setting.

### Setting precedence

`default value` < `environment variable` < `value saved in the Plugins view` < `linea.config.yml`

Values coming from the file are locked in the view. The **Download config** action produces a `linea.config.yml` with the current configuration; secrets are replaced by `${VARIABLE}`.

### Environment variables

LINEA reads `LINEA_SERVICE_KEYS`, `EVENT_WEBHOOK_SECRET`, `PLUGINS_DIR` (alternative plugins folder) and `LINEA_PLUGINS` (plugins installed at startup). What a plugin needs (the address of its service, a shared key) is a **setting of that plugin**, with its own environment variable named in the plugin's manifest (`FLAMAPY_API_URL` for analytics; `AGENTS_URL` and `AGENTS_SERVICE_KEY` for agents): set it in **Configure**, in `linea.config.yml` or in the environment.

### Plugin services

A plugin that needs a container declares the compose file that runs it in its manifest (`service`). **Enabling the plugin starts it** (`docker compose up -d --build --remove-orphans`: a container the compose file no longer has goes away) and **disabling it stops it** (`stop`: the containers and their data stay). The card has **Start service** and **Stop service** buttons of their own, and shows the state of the containers:

| State | Meaning |
|---|---|
| Running | All the containers are up (`2/3` counts the ones up). |
| Starting | A container is being created or its health check is still running. |
| Degraded | It is up, but a container crashed, was killed or is unhealthy. |
| Failed | Nothing is up and a container crashed. |
| Stopped | Nothing is up. |
| Docker unavailable | The server has no Docker CLI or cannot reach the daemon, and the service does not answer either. |
| External | The server cannot see Docker (it is LINEA's own Docker image, say), but the service answers: it is run outside LINEA, and the start, stop and logs buttons are not shown. |

If the plugin is on and its service does not answer, the card says so with the reason: with the containers up, *check its address in Configure, or the logs*; with no way to see them, *start it, or check the address*. While a start is in flight only "Starting" is shown.

The **Logs** button opens a dialog with the containers (state, health, ports) and what they have said: pick one container or all, the last 100 to 2000 lines, follow them live, copy them. Secrets of the plugin's settings and terminal colour codes are removed from what it shows. If the service does not start, the plugin stays enabled and the card says why. Only administrators see any of this.

This needs the Docker CLI where LINEA's **server** runs, which is the case when you run LINEA from a checkout. Inside LINEA's Docker image the plugin folders do not carry their `service/`, so there the services are started by hand, with the compose file each plugin ships for it:

```bash
cd linea/deploy
docker compose -f docker-compose.yml -f ../../linea-plugins/analytics-plugin/linea.compose.yml up -d --build
```

Without it LINEA runs normally, but the plugins that need a service show as unavailable. `LINEA_PLUGINS_SRC` says where the plugins are checked out when it is not `../../linea-plugins`.

## Structure of a plugin

```
plugins/
  marketplace.json         catalogue: [{ id, path, icon?, description? }]
  <id>/
    plugin.json            manifest
    server/index.js        optional: export default { register(ctx) }
    client/index.js        optional: export default { register(ui) }
    service/               optional: own service (Dockerfile, compose)
    linea.compose.yml      optional: wires LINEA's Docker deployment to that service
    test/server, test/client
```

- **`plugin.json`** declares `id` (lowercase letters, digits and hyphens), name and description (`en`, `es`, `gl`), `requires.linea` (compatible version range), `settings` and, where relevant, `remote` (`baseUrl`, `health`, `events`) and `service` (`compose`, `project`, `env`: the compose file inside the plugin's folder that LINEA starts and stops).
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

The rule behind it: LINEA never names a plugin's container or variable. Everything a plugin needs to run, its compose file included, lives in the plugin's folder.

More documentation: the plugins repository's `README.md`, `docs/linea/plugins.md` (the contract, including [the Docker service](https://github.com/lbdudc/linea/blob/main/docs/linea/plugins.md#81-a-service-that-runs-in-docker)) and `docs/linea/architecture.md`.
