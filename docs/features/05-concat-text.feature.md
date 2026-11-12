---
id: 05-concat-text
title: concat_text(x, y)
status: done
type: feature
depends: []
relates: []
---

# concat_text(x, y)

## Abstract

Return `x + y` for two strings, rejecting non-strings.

## Requirements

- Module exports `concat_text` as a named CommonJS export.

## Acceptance criteria

- `concat_text('ab', 'cd')` returns `'abcd'`.
- `concat_text('a', 1)` throws `TypeError`.

## Architectural decisions

Plain CommonJS module, no new dependencies.
