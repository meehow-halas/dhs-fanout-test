# Implementation prompt — 07-sqr

Spec: `docs/features/07-sqr.feature.md` (source of truth). The Implementer writes their own plan.

## Goal

`src/sqr.js` exports `sqr(x, y)` per the spec, with behaviour tests runnable via `npm test`.

## Order

1. Module: `src/sqr.js` with the named CommonJS export `sqr`; type check on both arguments before computing.
2. Tests: `test/sqr.test.js` using `node:test` + `node:assert`, covering every acceptance criterion.

## New dependencies

None. Use Node built-ins only.

## Existing code to reuse

- `src/divide.js` — style reference (`'use strict'`, `typeof` validation, named export).
- `package.json` `scripts.test` (`node --test`) — already runs `test/`.

## What not to change

- `package.json`.
- `src/divide.js`, `src/concat-text.js` and their tests.
- Do not create `index.js` or an aggregate module; sibling tasks own their own files.
- `docs/features/` (including this task's spec), `docs/prd.md`, `harness.config.json`, `.dhs/`, `AGENTS.md`, `CLAUDE.md`.
