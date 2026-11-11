---
id: 09-clamp
title: clamp(x, min, max)
status: todo
type: feature
depends: []
relates: []
---

# clamp(x, min, max)

## Abstract

Limit `x` to the inclusive range `[min, max]`; `min > max` throws `RangeError`.

## Requirements

- Module exports `clamp` as a named CommonJS export.

## Acceptance criteria

- `clamp(5, 0, 3)` returns `3`.
- `clamp(-1, 0, 3)` returns `0`.
- `clamp(1, 4, 2)` throws `RangeError`.

## Architectural decisions

Plain CommonJS module, no new dependencies.
