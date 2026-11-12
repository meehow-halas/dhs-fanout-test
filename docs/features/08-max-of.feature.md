---
id: 08-max-of
title: max_of(values)
status: done
type: feature
depends: []
relates: []
---

# max_of(values)

## Abstract

Return the largest number of a non-empty numeric array. Adds a small numeric helper to this fixture repo for dhs developers (`docs/prd.md`).

## Requirements

- Module exports `max_of` as a named CommonJS export.
- The module lives at `src/max-of.js` (one file per helper).
- An argument that is not an array (`Array.isArray` is false) throws `TypeError`.
- An empty array throws `RangeError`.
- An array containing any element whose `typeof` is not `'number'` throws `TypeError`.
- Checks run in this order: not an array, empty, element types.
- The result equals `Math.max` over the elements; an array containing `NaN` returns `NaN`.
- The input array is not mutated.

## Acceptance criteria

- `max_of([1, 9, 3])` returns `9`.
- `max_of([-5, -2, -9])` returns `-2`.
- `max_of([7])` returns `7`.
- `max_of([])` throws `RangeError`.
- `max_of([1, 'x'])` throws `TypeError`.
- `max_of(5)` throws `TypeError`.
- `max_of([1, NaN])` returns `NaN`.
- The array passed to `max_of` has the same contents and order after the call.
- `npm test` exits 0 and covers every criterion above.

## Architectural decisions

Plain CommonJS module, no new dependencies. Validation by `Array.isArray` and `typeof` only. Do not spread the array into `Math.max` (`Math.max(...values)` can exceed the call-stack argument limit on very large arrays). Tests use Node built-ins `node:test` and `node:assert`, run by the existing `npm test` (`node --test`).
