---
id: 09-clamp
title: clamp(x, min, max)
status: done
type: feature
depends: []
relates: []
---

# clamp(x, min, max)

## Abstract

Limit `x` to the inclusive range `[min, max]`; `min > max` throws `RangeError`. Adds a small numeric helper to this fixture repo for dhs developers (`docs/prd.md`).

## Requirements

- Module exports `clamp` as a named CommonJS export.
- The module lives at `src/clamp.js` (one file per helper).
- Any argument whose `typeof` is not `'number'` throws `TypeError`; this check runs before the range check.
- `min > max` throws `RangeError`. `min === max` is allowed.
- Returns `min` when `x < min`, `max` when `x > max`, otherwise `x`.

## Acceptance criteria

- `clamp(5, 0, 3)` returns `3`.
- `clamp(-1, 0, 3)` returns `0`.
- `clamp(1, 4, 2)` throws `RangeError`.
- `clamp(2, 0, 3)` returns `2`.
- `clamp(3, 0, 3)` returns `3`.
- `clamp(9, 4, 4)` returns `4`.
- `clamp('5', 0, 3)` throws `TypeError`.
- `clamp(1, 0, '3')` throws `TypeError`.
- `npm test` exits 0 and covers every criterion above.

## Architectural decisions

Plain CommonJS module, no new dependencies. Validation by `typeof` only (NaN is not specially handled). Tests use Node built-ins `node:test` and `node:assert`, run by the existing `npm test` (`node --test`).
