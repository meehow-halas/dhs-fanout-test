---
id: 10-reverse-text
title: reverse_text(s)
status: todo
type: feature
depends: [05-concat-text]
relates: []
---

# reverse_text(s)

## Abstract

Return the characters of a string in reverse order, rejecting non-strings.

## Requirements

- Module exports `reverse_text` as a named CommonJS export.

## Acceptance criteria

- `reverse_text('abc')` returns `'cba'`.
- `reverse_text('')` returns `''`.
- `reverse_text(42)` throws `TypeError`.

## Architectural decisions

Plain CommonJS module, no new dependencies.
