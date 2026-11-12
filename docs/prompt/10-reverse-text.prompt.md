# Implementation prompt — 10-reverse-text

Spec: `docs/features/10-reverse-text.feature.md` (source of truth). The Implementer writes their own plan.

## Goal

`src/reverse-text.js` exports `reverse_text(s)` per the spec, built on `concat_text`, with behaviour tests runnable via `npm test`.

## Order

1. Module: `src/reverse-text.js` with the named CommonJS export `reverse_text`; call `concat_text('', s)` through the module object, then reverse by code points.
2. Tests: `test/reverse-text.test.js` using `node:test` + `node:assert`, covering every acceptance criterion (including observing the `concat_text('', s)` call by replacing the export on the `src/concat-text.js` module object).

## New dependencies

None. Use Node built-ins only.

## Existing code to reuse

- `src/concat-text.js` — `concat_text`, provides validation.
- `src/uppercase-text.js` — pattern reference (module-object call to `concat_text`, delegated `TypeError`).
- `test/uppercase-text.test.js` — reference for observing the `concat_text` call.
- `package.json` `scripts.test` (`node --test`) — already runs `test/`.

## What not to change

- `package.json`.
- `src/concat-text.js` and other existing `src/*.js` modules and their tests in `test/`.
- Do not create `index.js` or an aggregate module.
- `docs/features/` (including this task's spec), `docs/prd.md`, `harness.config.json`, `.dhs/`, `AGENTS.md`, `CLAUDE.md`.
