# Implementation prompt — 09-clamp

Spec: `docs/features/09-clamp.feature.md` (source of truth). The Implementer writes their own plan.

## Goal

`src/clamp.js` exports `clamp(x, min, max)` per the spec, with behaviour tests runnable via `npm test`.

## Order

1. Module: `src/clamp.js` with the named CommonJS export `clamp`; type check on all three arguments, then the `min > max` range check, then clamping.
2. Tests: `test/clamp.test.js` using `node:test` + `node:assert`, covering every acceptance criterion.

## New dependencies

None. Use Node built-ins only.

## Existing code to reuse

- `src/divide.js` — style reference (`'use strict'`, JSDoc, `typeof` validation before `RangeError`, named export).
- `package.json` `scripts.test` (`node --test`) — already runs `test/`.

## What not to change

- `package.json`.
- Existing `src/*.js` modules and their tests in `test/`.
- Do not create `index.js` or an aggregate module; sibling tasks own their own files.
- `docs/features/` (including this task's spec), `docs/prd.md`, `harness.config.json`, `.dhs/`, `AGENTS.md`, `CLAUDE.md`.
