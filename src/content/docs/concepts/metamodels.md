---
title: "Metamodels and models"
description: "A metamodel is the formal definition (grammar) of a type of model; a model is a document written in its language."
sidebar:
  order: 2
---

## Definition

A **metamodel** is the formal definition (grammar) of a type of model: it establishes which constructs are valid. A **model** is a document expressed in the language of a metamodel. Products are described by models, from which LINEA generates the code.

| Metamodel | Example model |
|---|---|
| `datamodel` | `entity Road { property name: String required pk }` |
| `featuremodel` | The feature tree of the SPL. |
| `gui`, `menus`, `forms`, `lists`, `security`, `sensors`, `gismodel`, `statics` | The product's interface, menus, forms, lists, security, sensors, geographic information and static resources. |

## Contents of a metamodel

A metamodel is a package (repository) with the following elements:

| File | Role |
|---|---|
| `metamodel.json` (root) | Name, version, description and dependencies (`requires`). |
| `grammars/<name>.langium` | Langium grammar: the supported syntax. |
| `constraints/<name>.js` | Validations the grammar cannot express (for example, requiring exactly one primary key per entity); they produce errors or warnings. |
| `specs/<name>.js` | Transformation of the model into the specification JSON consumed by the code templates. |
| `imports/<name>.js` | The inverse transformation: builds the model from the specification JSON. |
| `scopes/<name>.js` | Scoping rules for references (for example, a constraint may name any feature in the tree, not only those at its own level). |
| `visualizations/<name>.js` | Custom views (class diagram of the data model, sensor diagram). |
| `cases/<name>.json` | Test cases: input text and the expected errors or warnings. |

Metamodels in the sample repository: `basic`, `browser`, `common`, `datamodel`, `featuremodel`, `forms`, `gismodel`, `gui`, `lists`, `menus`, `security`, `sensors` and `statics`.

## Relationship with modules and products

```
SPL ──uses──▶ Module ──requires──▶ Module
                │  └──requires──▶ Metamodel ◀──instance of── Model ◀──provided by── Product
                └──────offers───▶ Model (read-only in products)
```

- A module declares the metamodels it needs.
- A product must provide a model of **each** metamodel required, directly or transitively, by **all** the modules of its SPL.
- Models are stored in the product repository: `.linea/models/<metamodel>.<extension>`.
- The `featuremodel` metamodel is present in every SPL: the line's feature model (`models/featuremodel.featuremodel`) and each product's feature selection (`models/featureselection.featureselection`) are models of this metamodel.

## Editing a product's models

The **Model config** tab shows the feature model and one entry for each required metamodel. Each model offers these views:

- **Text**, with autocompletion and problem markers.
- **Form**, generated from the grammar.
- **Diagram** of the whole product, **tree** and **JSON**.
- **Custom views** of the metamodel, as extra tabs. They let you move and link nodes and edit in a side panel; every change is equivalent to a change in the model text, so the same checks apply. Node positions are stored in `.linea/layouts.json`.

The **Save** action commits the models to the product repository and the server verifies them again. A single engine in the browser serves all the product's models, so they can reference each other.

## Metamodel studio

A metamodel's page includes the **Studio**: dedicated editors for the grammar and its scripts, test cases with results, the composed grammar, the grammar as a tree and an interactive preview of an instance. Saving writes all changes in a single commit and validates the manifest first; if it is not valid, nothing is written.

## Security considerations

Metamodel scripts (`constraints`, `specs`, etc.) run **without isolation** on the server and in the browser. The `LINEA_TRUSTED_NAMESPACES` variable determines which git groups packages are accepted from; include only groups under the organisation's control.

## Engine

Metamodels and models are handled with **bango** (`@lbdudc/bango`), based on Langium. LINEA serves its precompiled packages from the client and uses its studio and view renderer.
