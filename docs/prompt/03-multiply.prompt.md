# Implementation prompt

Files tracker path: `docs/prompt/<basename>.prompt.md`. Basename: `03-multiply`. Reference files by path. The Implementer still writes their own plan.

## Goal

Add `multiply(x, y)` returning `x * y`, exported as a named CommonJS export, with a `TypeError` when either argument is not of type `number`. Done when every acceptance criterion in `docs/features/03-multiply.feature.md` holds and `npm test` passes with the new test file.

## Order

Phase-grain order (coherent slices, not one file per step).

1. Module: `src/multiply.js` with `multiply(x, y)` and the type check, exported as `module.exports = { multiply }`.
2. Tests: `test/multiply.test.js` covering the three acceptance criteria plus a non-number case for each argument position.

## New dependencies

None. Plain CommonJS, no packages.

## Existing code to reuse

- `src/sqr.js` — same two-argument shape, same `'use strict'` header, same `typeof ... !== 'number'` guard and `TypeError` message style. Mirror it.
- `test/sqr.test.js` — test layout for `node --test`. Mirror it.

## What not to change

- `docs/features/03-multiply.feature.md` — spec, owned by the Architect; do not edit.
- `src/sqr.js`, `src/add*`, `src/subtract*`, and every other existing `src/` and `test/` file — leave alone.
- `package.json` — no script or dependency changes.
- `CHANGELOG.md` — Reviewer's job, not the Implementer's.
