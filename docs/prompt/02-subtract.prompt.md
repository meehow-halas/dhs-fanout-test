# Implementation prompt — 02-subtract

Spec: `docs/features/02-subtract.feature.md`. The Implementer still writes their own plan.

## Goal

A CommonJS module `src/subtract.js` exporting the named function `subtract(x, y)` that returns `x - y` for two numbers and throws `TypeError` when either argument is not of type `number`, covered by a `node:test` file.

## Order

1. Module: `src/subtract.js` with `'use strict'` and `module.exports = { subtract }`; type check on both arguments before subtracting.
2. Tests: `test/subtract.test.js` covering every acceptance criterion (`subtract(5, 3) === 2`, `subtract(0, 4) === -4`, `subtract(1, null)` throws `TypeError`) plus a non-number first argument; run with `npm test` (`node --test`).

## New dependencies

None.

## Existing code to reuse

- `src/divide.js` — pattern for a two-argument numeric helper: `typeof` check on both arguments, `TypeError` message prefixed with the function name, named CommonJS export.
- `test/divide.test.js` — test style (`node:test`, `node:assert`, `require('../src/<name>.js')`).

## What not to change

- `src/*.js` and `test/*.test.js` other than the two new files.
- `package.json` — no new scripts or dependencies.
- `docs/features/02-subtract.feature.md` — the spec is the contract; status changes belong to other roles.
