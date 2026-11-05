---
title: "Getting started"
description: "The basic workflow, from signing in to generating a product."
sidebar:
  order: 1
---

This page describes the basic workflow, from signing in to generating a product.

## 1. Signing in

- With **GitLab or GitHub:** through the sign-in button and by authorising the application.
- With the **local** host: with a username and password provided by an administrator.

Sessions last about two hours; when one expires you have to sign in again.

## 2. Creating an SPL

Under **Lines → New line**, enter the name (letters, numbers, `.`, `-` and `_`), the version, the description, the git server group and the type of line:

| Type | Description | Recommended use |
|---|---|---|
| `plain` | A feature model and a platform of its own code. | Learning, trials and small lines. |
| `project` | The above plus the selected metamodels. | Your own models without modules. |
| `modular` | Composed of modules from the registry. | Recommended: reuse of functionality. |

The internal procedure is described in [What happens when an SPL is created](/internals/creating-an-spl/).

## 3. Feature model

The line's editor lets you define the feature tree: root, mandatory and optional features, alternatives and constraints. It is written in UVL:

```text
features
    Shop
        mandatory
            Catalog
        optional
            Account
            Maps
            Payments
                or
                    Card
                    Transfer

constraints
    Payments => Account
```

See [Feature models](/concepts/feature-models/) for the full vocabulary.

- In a **modular** line, the model is composed automatically from the modules and is read-only. Selection is done in the **Modules** tab.
- In a `plain` or `project` line, the model is edited directly. A newly created model contains only the root and **must be edited before generating**; otherwise generation fails (*abstract feature cannot be leaf*).
- If the analysis plugin is active, metrics and panels about the model are available (satisfiability, dead features, etc.).

## 4. Modules (modular lines)

In the **Modules** tab you select packages from the [registry](/concepts/modules/). LINEA resolves versions, checks compatibility and records the result in `spl.json` and `linea.lock.json`. If the composition is not valid, saving is not allowed and the package and file responsible are reported.

## 5. Creating a product

In the line, **New product** asks for the name, the version and the features you want. LINEA creates a repository for the product ([details](/internals/generating-a-product/#before-generating-creating-the-product)).

In the **Model config** tab you write the models for each metamodel required by the modules. You get text views with autocompletion, a generated form, diagram, tree and JSON. The **Save** action commits the models to the product repository.

## 6. Generation

The **Generate** action builds the code and proposes it in the repository through *merge requests*. The generation log details each stage. The possible results are:

- **No changes:** there is nothing to commit and the version is not incremented.
- **Generated:** a new version, a `generation/X.Y.Z` branch merged into `bigbang`, a tag and a `bigbang → main` *merge request*.
- **Conflicts:** you are notified with a link to the *merge request* for manual resolution.

The full procedure is described in [What happens when a product is generated](/internals/generating-a-product/).

## 7. Verification and delivery

Every commit triggers the product's pipeline, provided the host supports it. The product page shows the status of the latest pipeline, its jobs and, on failure, the end of the log, and lets you retry. Once the `bigbang → main` *merge request* is merged, the `main` branch contains the generated version. See [CI/CD](/internals/ci-cd/).

## 8. Command line

`linea-cli` works on folders that are git clones: `get` fetches an SPL and its products; `push` verifies, commits and opens the *merge request*; `spl new` and `product new` create items; `generate` generates locally and `generate --remote` delegates derivation to LINEA. The exact commands are in the package's README.
