---
id: 02-subtract
title: subtract(x, y)
status: done
type: feature
depends: []
relates: []
---

# subtract(x, y)

## Abstract

Return the difference `x - y` of two numbers, rejecting non-numbers.

## Requirements

- Module exports `subtract` as a named CommonJS export.

## Acceptance criteria

- `subtract(5, 3)` returns `2`.
- `subtract(0, 4)` returns `-4`.
- `subtract(1, null)` throws `TypeError`.

## Architectural decisions

Plain CommonJS module, no new dependencies.
