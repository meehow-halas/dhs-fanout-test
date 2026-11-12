---
id: 011-feature-negate
title: negate(x)
status: done
type: feature
depends: []
relates: []
---

# negate(x)

## Abstract

Return the negation `-x` of a number, rejecting non-numbers. Callers need a single-argument helper that flips the sign of a value, consistent with the existing numeric helpers (`multiply`, `subtract`, `sqr`).

## Requirements

- Module exports `negate` as a named CommonJS export.
- `negate(x)` returns `-x` when `x` is of type `number`.
- `negate(x)` throws `TypeError` when `x` is not of type `number`.

## Acceptance criteria

- `negate(3)` returns `-3`.
- `negate(-4)` returns `4`.
- `negate(0)` returns a value equal to `0`.
- `negate('3')` throws `TypeError`.
- `negate(undefined)` throws `TypeError`.

## Architectural decisions

Plain CommonJS module, no new dependencies. Type check is `typeof x !== 'number'`, the same guard as `multiply` (Q2). `NaN` and `Infinity` pass the guard and are negated like any other number (same as `multiply`, Q1 of task `03-multiply`).
