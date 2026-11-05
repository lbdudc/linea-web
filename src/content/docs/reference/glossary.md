---
title: "Glossary"
description: "Terminology used in LINEA: product lines, features, modules, metamodels and generation."
sidebar:
  order: 3
---

| Term | Definition |
|---|---|
| **ALM** | *Application Lifecycle Management*: managing the whole lifecycle of an application (creation, versioning, testing and deployment). |
| **Annotation** | A mark in the code (`/*% if (feature.X) { %*/ … /*% } %*/`) that makes its presence depend on a feature. |
| **bango** | Library of metamodels and models (Langium grammars, editors and views) used by LINEA. |
| **`bigbang`** | A product branch that holds the code exactly as LINEA generated it. Only LINEA changes it. |
| **CI/CD** | Continuous integration and delivery: automatic checks and deliveries on every change. |
| **Configuration** | Choosing or tuning an alternative for a function the core requires. See [Configuration overview](/configure/overview/). |
| **Derivation (generation)** | Building a product's code from the line, its features and its models. |
| **Feature** | A property a product may include or omit. |
| **flamapy** | A feature model analysis tool, used by the analysis plugin. |
| **`generation/X.Y.Z`** | A temporary branch for one generation; it is merged into `bigbang` and deleted. |
| **Git host** | The git server that hosts the repositories: `local`, GitLab or GitHub. |
| **Lockfile (`linea.lock.json`)** | The exact package versions an SPL was resolved to. |
| **`main`** | A product's default branch: generated code plus manual changes. |
| **Metamodel** | The formal definition of a type of model. See [Metamodels](/concepts/metamodels/). |
| **Model** | A document expressed in the language of a metamodel. |
| **Feature model** | The tree of features and their constraints, written in UVL; in LINEA, a model of the `featuremodel` metamodel. See [Feature models](/concepts/feature-models/). |
| **Module** | A reusable package (features, code and models). See [Modules](/concepts/modules/). |
| **MR / PR** | *Merge request* (GitLab), *pull request* (GitHub) or *change request* (local host): a proposal to merge branches. |
| **Core** | Functionality required by every line or product. |
| **Profile** | A user's active git host; LINEA shows a single remote at a time. |
| **Platform** | The base code, configuration and transformations from which an SPL's products are derived. |
| **Plugin** | An optional capability that can be turned on at runtime. See [Plugins](/configure/plugins/). |
| **Product** | An application generated from an SPL, with its own repository. |
| **Registry** | The set of available modules and metamodels; it lives in git, not in a database. |
| **Feature selection** | The features a product has chosen (`models/featureselection.featureselection`). |
| **SPL (line)** | *Software Product Line*: a repository that gathers modules, the feature model and the platform to generate products. |
| **`spl.json`** | The line's manifest: name, type, metamodels and direct modules. |
| **`spec.draft.json` / `spec.json`** | A product's saved specification and its deployed specification (in `.linea/`). |
| **UVL** | *Universal Variability Language*: a textual format for feature models, used by modules in `model.uvl`. |
