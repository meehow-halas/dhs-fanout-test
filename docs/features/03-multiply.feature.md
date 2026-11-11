---
id: 03-multiply
title: multiply(x, y)
status: in review
type: feature
depends: []
relates: []
---

# multiply(x, y)

## Abstract

Return the product `x * y` of two numbers, rejecting non-numbers.

## Requirements

- Module exports `multiply` as a named CommonJS export.

## Acceptance criteria

- `multiply(3, 4)` returns `12`.
- `multiply(-2, 5)` returns `-10`.
- `multiply(2, undefined)` throws `TypeError`.

## Architectural decisions

Plain CommonJS module, no new dependencies.
