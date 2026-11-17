---
title: Releasing
description: "How a release of LINEA is made: a GitHub Release publishes the npm packages and the Docker images."
sidebar:
  order: 9
---

A release is a **GitHub Release** of [lbdudc/linea](https://github.com/lbdudc/linea) with a tag `vX.Y.Z`. The tag is the version of everything.

| What | Where | Made by |
|---|---|---|
| `@lbdudc/linea-core`, `-git`, `-cli`, `-ci`, `-plugin-sdk` | npm | the *Release* workflow, with npm trusted publishing (no token) and provenance |
| Release notes: every commit since the previous `vX.Y.Z` tag | the release page | the same workflow |
| `ghcr.io/lbdudc/linea-server`, `linea-client` | GitHub Container Registry, amd64 and arm64 | the *Docker* workflow; tags `X.Y.Z`, `X.Y`, `latest` |
| `ghcr.io/lbdudc/linea-flamapy`, `linea-agents` | the same | the *Release* workflow of [lbdudc/linea-plugins](https://github.com/lbdudc/linea-plugins) |

A tag with a suffix (`v1.2.3-rc.1`) is a prerelease: its npm packages go to the `next` dist-tag and not to `latest`.

The server and client images are built with the plugins of `linea-plugins` and the metamodels of `linea-metamodels` as they are at that moment, so a release of `linea` is also a snapshot of both.

Each npm package has a *trusted publisher* on npmjs.com (GitHub Actions, repository `lbdudc/linea`, workflow `release.yml`); that is what lets the workflow publish without a stored secret. A new package needs one before its first release.
