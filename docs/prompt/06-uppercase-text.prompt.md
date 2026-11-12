# Implementation prompt — 06-uppercase-text

Spec: `docs/features/06-uppercase-text.feature.md` (source of truth). The Implementer writes their own plan.

## Goal

`src/uppercase-text.js` exports `uppercase_text(s)` per the spec, built on `concat_text`, with behaviour tests runnable via `npm test`.

## Order

1. Module: `src/uppercase-text.js` with the named CommonJS export `uppercase_text`; call `concat_text('', s)` through the required `./concat-text.js` module object, then upper-case the result.
2. Tests: `test/uppercase-text.test.js` using `node:test` + `node:assert`, covering every acceptance criterion. For the delegation AC, replace `concat_text` on the `src/concat-text.js` module object with a recording wrapper (restore it after), and assert it was called with `('', s)` and that its return value is what gets upper-cased.

## New dependencies

None. Use Node built-ins only.

## Existing code to reuse

- `src/concat-text.js` — `concat_text` (validation and concatenation); import, do not copy.
- `src/divide.js`, `src/concat-text.js` — style reference (`'use strict'`, JSDoc, named export).
- `test/concat-text.test.js` — test style reference.
- `package.json` `scripts.test` (`node --test`) — already runs `test/`.

## What not to change

- `src/concat-text.js`, `test/concat-text.test.js` (task 05 is `done`).
- `src/divide.js`, `test/divide.test.js`, `package.json`.
- Do not create `index.js` or an aggregate module; sibling tasks own their own files.
- `docs/features/` other than this task's spec, `docs/prd.md`, `harness.config.json`, `.dhs/`, `AGENTS.md`, `CLAUDE.md`.
