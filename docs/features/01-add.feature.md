---
id: 01-add
title: add(x, y)
status: todo
type: feature
depends: []
relates: []
---

# add(x, y)

## Abstract

Return the numeric sum of two numbers, rejecting non-numbers.

## Requirements

- Module exports `add` as a named CommonJS export.

## Acceptance criteria

- `add(2, 3)` returns `5`.
- `add(-1, 1)` returns `0`.
- `add('2', 3)` throws `TypeError`.

## Architectural decisions

Plain CommonJS module, no new dependencies.
