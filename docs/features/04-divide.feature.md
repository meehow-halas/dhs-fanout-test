---
id: 04-divide
title: divide(x, y)
status: in review
type: feature
depends: []
relates: []
---

# divide(x, y)

## Abstract

Return `x / y` for two numbers; zero divisor throws `RangeError`. Non-number arguments throw `TypeError`. This is a small arithmetic helper in the dhs fan-out test fixture, used by dhs developers to exercise the harness on a real task.

## Requirements

- Module exports `divide` as a named CommonJS export.
- The module lives in its own file, `src/divide.js`, so sibling helper tasks do not edit the same file.
- `divide(x, y)` returns `x / y` when both arguments are numbers (`typeof === 'number'`) and `y` is not zero.
- If either argument is not of type `number`, throw `TypeError`. The type check runs before the zero check.
- If `y` is `0` or `-0`, throw `RangeError`.
- Tests cover every acceptance criterion and run through `npm test`.

## Acceptance criteria

- `divide(10, 2)` returns `5`.
- `divide(1, 0)` throws `RangeError`.
- `divide(1, -0)` throws `RangeError`.
- `divide('1', 2)` throws `TypeError`.
- `divide(1, '2')` throws `TypeError`.
- `divide('1', 0)` throws `TypeError` (type check first).
- `npm test` exits 0 and runs the `divide` tests.

## Architectural decisions

- Plain CommonJS module, no new dependencies. Tests use Node's built-in `node:test` and `node:assert` so no test framework is added.
- One file per helper (`src/divide.js`) to avoid merge conflicts with the other fixture tasks (01–10) that may run in parallel.
- Type validation uses `typeof` only; `NaN` and `Infinity` are numbers and are not rejected (not requested).
