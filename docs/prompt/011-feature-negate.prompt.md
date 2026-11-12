# Implementation prompt

Files tracker path: `docs/prompt/<basename>.prompt.md`. Basename: `011-feature-negate`. Reference files by path. The Implementer still writes their own plan.

## Goal

Add `negate(x)` returning `-x`, exported as a named CommonJS export, with a `TypeError` when `x` is not of type `number`. Done when every acceptance criterion in `docs/features/011-feature-negate.feature.md` holds and `npm test` passes with the new test file.

## Order

Phase-grain order (coherent slices, not one file per step).

1. Module: `src/negate.js` with `negate(x)` and the type check, exported as `module.exports = { negate }`.
2. Tests: `test/negate.test.js` covering the five acceptance criteria.

## New dependencies

None. Plain CommonJS, no packages.

## Existing code to reuse

- `src/multiply.js` — same single-guard style, same `'use strict'` header, same `typeof ... !== 'number'` guard and `TypeError` message style. Mirror it.
- `test/multiply.test.js` — test layout for `node --test`. Mirror it.

## What not to change

- `docs/features/011-feature-negate.feature.md` — spec, owned by the Architect; do not edit.
- `src/multiply.js`, `src/sqr.js`, `src/subtract.js`, and every other existing `src/` and `test/` file — leave alone.
- `package.json` — no script or dependency changes.
- `CHANGELOG.md` — Reviewer's job, not the Implementer's.
