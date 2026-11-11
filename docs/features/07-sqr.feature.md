---
id: 07-sqr
title: sqr(x, y)
status: todo
type: feature
depends: []
relates: []
---

# sqr(x, y)

## Abstract

Return the Euclidean length `Math.sqrt(x*x + y*y)` of a 2D vector.

## Requirements

- Module exports `sqr` as a named CommonJS export.

## Acceptance criteria

- `sqr(3, 4)` returns `5`.
- `sqr(0, 0)` returns `0`.
- `sqr(3, '4')` throws `TypeError`.

## Architectural decisions

Plain CommonJS module, no new dependencies.
