---
id: 04-divide
title: divide(x, y)
status: todo
type: feature
depends: []
relates: []
---

# divide(x, y)

## Abstract

Return `x / y` for two numbers; zero divisor throws `RangeError`.

## Requirements

- Module exports `divide` as a named CommonJS export.

## Acceptance criteria

- `divide(10, 2)` returns `5`.
- `divide(1, 0)` throws `RangeError`.
- `divide('1', 2)` throws `TypeError`.

## Architectural decisions

Plain CommonJS module, no new dependencies.
