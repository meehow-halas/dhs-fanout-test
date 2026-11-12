---
id: 07-sqr
title: sqr(x, y)
status: done
type: feature
depends: []
relates: []
---

# sqr(x, y)

## Abstract

Return the Euclidean length `Math.sqrt(x*x + y*y)` of a 2D vector. Adds a small numeric helper to this fixture repo for dhs developers (`docs/prd.md`).

## Requirements

- Module exports `sqr` as a named CommonJS export.
- The module lives at `src/sqr.js` (one file per helper).
- Either argument whose `typeof` is not `'number'` throws `TypeError`.
- The result is `Math.sqrt(x*x + y*y)`.

## Acceptance criteria

- `sqr(3, 4)` returns `5`.
- `sqr(0, 0)` returns `0`.
- `sqr(3, '4')` throws `TypeError`.
- `sqr('3', 4)` throws `TypeError`.
- `sqr(-3, -4)` returns `5`.
- `npm test` exits 0 and covers every criterion above.

## Architectural decisions

Plain CommonJS module, no new dependencies. Validation by `typeof` only. Tests use Node built-ins `node:test` and `node:assert`, run by the existing `npm test` (`node --test`).
