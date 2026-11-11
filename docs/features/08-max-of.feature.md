---
id: 08-max-of
title: max_of(values)
status: todo
type: feature
depends: []
relates: []
---

# max_of(values)

## Abstract

Return the largest number of a non-empty numeric array.

## Requirements

- Module exports `max_of` as a named CommonJS export.

## Acceptance criteria

- `max_of([1, 9, 3])` returns `9`.
- `max_of([])` throws `RangeError`.
- `max_of([1, 'x'])` throws `TypeError`.

## Architectural decisions

Plain CommonJS module, no new dependencies.
