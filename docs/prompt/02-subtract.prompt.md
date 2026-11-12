# Implementation prompt — 02-subtract

Spec: `docs/features/02-subtract.feature.md` (source of truth). The Implementer writes their own plan.

## Goal

`src/subtract.js` exports `subtract(x, y)` returning `x - y` for two numbers and throwing `TypeError` otherwise, with behaviour tests runnable via `npm test`.

## Order

1. Module: `src/subtract.js` with the named CommonJS export `subtract`; `typeof` check on both arguments (`'number'`), throw `TypeError` on failure, then return the difference.
2. Tests: `test/subtract.test.js` using `node:test` + `node:assert`, covering every acceptance criterion (`subtract(5, 3)`, `subtract(0, 4)`, `subtract(1, null)`), plus a non-number first argument so both argument positions are checked.

## New dependencies

None. Use Node built-ins only.

## Existing code to reuse

- `src/divide.js` — pattern reference (`typeof` validation, `TypeError`, named CommonJS export).
- `test/divide.test.js` — test style reference.
- `package.json` `scripts.test` (`node --test`) — already runs `test/`.

## What not to change

- `package.json`.
- Existing `src/*.js` modules and their tests in `test/` (including `src/add.js` / `test/add.test.js` if task `01-add` has landed).
- Do not create `index.js` or an aggregate module.
- `docs/features/` (including this task's spec), `docs/prd.md`, `harness.config.json`, `.dhs/`, `AGENTS.md`, `CLAUDE.md`.
