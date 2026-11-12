# Implementation prompt — 05-concat-text

Spec: `docs/features/05-concat-text.feature.md` (source of truth). The Implementer writes their own plan.

## Goal

A CommonJS module exports `concat_text(x, y)` per the spec, with behaviour tests runnable via `npm test`.

## Order

1. Module: `src/concat-text.js` with the named CommonJS export `concat_text`; reject non-string arguments with `TypeError`. The spec names no file location; use this path so dependants `06-uppercase-text` and `10-reverse-text` have a stable import.
2. Tests: `test/concat-text.test.js` using `node:test` + `node:assert`, covering every acceptance criterion in the spec.

## New dependencies

None. Use Node built-ins only.

## Existing code to reuse

- `src/divide.js` — style reference (`'use strict'`, `typeof` validation, named export).
- `package.json` `scripts.test` (`node --test`) — already runs `test/`.

## What not to change

- `package.json`.
- `src/divide.js`, `test/divide.test.js`.
- Do not create `index.js` or an aggregate module; sibling tasks own their own files.
- `docs/features/` (including this task's spec), `docs/prd.md`, `harness.config.json`, `.dhs/`, `AGENTS.md`, `CLAUDE.md`.
