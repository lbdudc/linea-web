---
title: "What is LINEA"
description: "LINEA is a web application for managing software product lines (SPL) and the lifecycle of the products derived from them."
sidebar:
  order: 1
---

## Purpose

LINEA is a web application for managing **software product lines (SPL)** and the lifecycle of the products derived from them. It extends the principles of Application Lifecycle Management (ALM) to product lines.

## The problem it addresses

When an organisation develops similar applications for different customers, there are two strategies:

- **Cloning the project** for each customer. It is quick at first, but a defect fix has to be replicated by hand in every copy and the maintenance cost grows with the number of variants.
- **A product line (SPL)**. A single set of assets is maintained with all the possible code, annotated with the features it belongs to. For each customer a subset of features is selected and the tool generates the corresponding application.

LINEA implements the second strategy: it stores the line, lets you select features, generates products and keeps them in sync with the line.

## Core concepts

| Concept | Definition |
|---|---|
| **Feature** | A property a product may include or omit (for example “maps” or “payments”). |
| **Feature model** | A tree that defines the existing features and the constraints between them. |
| **SPL (line)** | A repository holding the assets needed to generate products: the modules used, the feature model and, depending on the type, platform code. |
| **Product** | An application generated from an SPL with a specific selection of features. It has its own repository. |
| **Module** | A reusable package (code, features and models) that an SPL can incorporate. |
| **Metamodel** | The formal definition (grammar) of a type of model. |
| **Model** | A document expressed in the language of a metamodel. Each product has its own. |
| **Derivation (generation)** | The process by which LINEA builds the code of a product from the line, its feature selection and its models. |

### A feature model, in UVL

```text
features
    Shop
        mandatory
            Catalog
        optional
            Account
            Maps
            Payments

constraints
    Payments => Account
```

A product picks features from the tree (`Catalog`, `Account`, `Maps`) and LINEA generates only the code that belongs to them. See [Feature models](/concepts/feature-models/).

## Core, configuration and plugins

Each capability of LINEA belongs to exactly one of the following three categories:

| Category | Description | Examples |
|---|---|---|
| **Core** | Functionality required by every line or product. LINEA does not work without it. | SPL engine, modules, metamodels, registry, products, generation, accounts, model editor. |
| **Configuration** | Choosing or tuning one of several alternatives for a function the core needs. | Git server (local, GitLab, GitHub), administrators, location of the repositories. |
| **Plugin** | An optional capability. LINEA is complete without it and it can be turned on or off at runtime. | Model analysis with flamapy, AI agents. |

## Project components

| Repository | Role |
|---|---|
| `linea` | The application: server (Node.js/Express with MongoDB) and web client (Vue). |
| `linea-core` | The engine library, with no network or process access: module resolution, feature model composition, product derivation. |
| `linea-git` | Library for accessing git servers (local, GitLab, GitHub). |
| `bango` | Metamodel and model engine (Langium grammars) and their editors. |
| `linea-cli` | Command line interface. |
| `linea-mcp` | MCP server for using LINEA from AI assistants. |
| `linea-ci` | Verification commands for SPLs and products (see [CI/CD](/internals/ci-cd/)). |
| `plugins` | `analytics-plugin`, `agents-plugin` and `hello-plugin`. |
| `metamodels`, `modules` | Sample registry of publishable metamodels and modules. |
| `linea-agents` | AI agents service, deployed independently. |

## Data storage

- **Git server.** Lines and products are repositories; they are the source of truth for code and models.
- **MongoDB.** Stores user accounts, a record of each line and each product (with links to their repository), the generation history and settings.
- **Package registry.** Has no database: it lives in a group or repository on the git server.
