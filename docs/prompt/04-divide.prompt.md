# Implementation prompt — 04-divide

Spec: `docs/features/04-divide.feature.md`. The Implementer writes their own plan.

## Goal

`src/divide.js` exports `divide(x, y)` per the spec, with behaviour tests runnable via `npm test`.

## Order

1. Module: `src/divide.js` with the named CommonJS export `divide`, type check before zero check.
2. Tests: `node:test` + `node:assert` file covering every acceptance criterion (including `-0` and `divide('1', 0)`); make `npm test` run them (e.g. `node --test`).

## New dependencies

None. Use Node built-ins only.

## Existing code to reuse

- None. The repository has no application code yet; `package.json` has only a placeholder `test` script.

## What not to change

- `package.json` — only the `scripts.test` value may change; do not change `main` or add dependencies.
- Do not create `index.js` or a shared aggregate module; other fixture tasks own their own files.
- `docs/features/` other than this task's spec, `docs/prd.md`, `harness.config.json`, `.dhs/`, `AGENTS.md`, `CLAUDE.md`.
