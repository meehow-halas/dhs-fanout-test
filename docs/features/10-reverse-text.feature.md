---
id: 10-reverse-text
title: reverse_text(s)
status: done
type: feature
depends: [05-concat-text]
relates: []
---

# reverse_text(s)

## Abstract

Return the characters of a string in reverse order, rejecting non-strings. Built on `concat_text` (`05-concat-text`), like `06-uppercase-text`, to exercise a task that depends on another task's module. Audience: dhs developers using this fixture repo (`docs/prd.md`).

## Requirements

- Module exports `reverse_text` as a named CommonJS export.
- The module lives at `src/reverse-text.js` and uses `concat_text` from `src/concat-text.js`.
- `reverse_text(s)` calls `concat_text('', s)` and returns that result reversed by Unicode code points (a surrogate pair such as an emoji stays intact).
- Input whose `typeof` is not `'string'` throws `TypeError` (raised by `concat_text`; String objects are rejected).

## Acceptance criteria

- `reverse_text('abc')` returns `'cba'`.
- `reverse_text('')` returns `''`.
- `reverse_text(42)` throws `TypeError`.
- `reverse_text('a😀b')` returns `'b😀a'`.
- The implementation calls `concat_text('', s)` before reversing.
- `reverse_text(new String('ab'))` throws `TypeError`.
- `npm test` exits 0 and covers every criterion above.

## Architectural decisions

Plain CommonJS module, no new dependencies. Validation is delegated to `concat_text`, not duplicated. `concat_text` is called through the required module object at call time (not a destructured binding), so a test can observe the call by replacing the export on that module object. Reversal is by code points (`Array.from`), not UTF-16 code units; grapheme clusters (combining marks, ZWJ sequences) are not specially handled. Tests use `node:test` and `node:assert`, run by the existing `npm test` (`node --test`).
