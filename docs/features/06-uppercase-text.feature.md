---
id: 06-uppercase-text
title: uppercase_text(s)
status: todo
type: feature
depends: [05-concat-text]
relates: []
---

# uppercase_text(s)

## Abstract

Return `s` in upper case, built on `concat_text`.

## Requirements

- Module exports `uppercase_text` as a named CommonJS export.

## Acceptance criteria

- `uppercase_text('abc')` returns `'ABC'`.
- The implementation calls `concat_text('', s)` before uppercasing.
- `uppercase_text(7)` throws `TypeError`.

## Architectural decisions

Plain CommonJS module, no new dependencies.
