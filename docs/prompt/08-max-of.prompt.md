# Implementation prompt — 08-max-of

Spec: `docs/features/08-max-of.feature.md` (source of truth). The Implementer writes their own plan.

## Goal

`src/max-of.js` exports `max_of(values)` per the spec, with behaviour tests runnable via `npm test`.

## Order

1. Module: `src/max-of.js` with the named CommonJS export `max_of`; validation in the spec's order before computing; no spread into `Math.max`.
2. Tests: `test/max-of.test.js` using `node:test` + `node:assert`, covering every acceptance criterion.

## New dependencies

None. Use Node built-ins only.

## Existing code to reuse

- `src/divide.js`, `src/sqr.js` — style reference (`'use strict'`, JSDoc, `typeof` validation, named export).
- `package.json` `scripts.test` (`node --test`) — already runs `test/`.

## What not to change

- `package.json`.
- Existing `src/*.js` and `test/*.test.js` files.
- Do not create `index.js` or an aggregate module; sibling tasks (09-clamp, 10-reverse-text) own their own files.
- `docs/features/` (including this task's spec), `docs/prd.md`, `harness.config.json`, `.dhs/`, `AGENTS.md`, `CLAUDE.md`.
