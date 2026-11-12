---
id: 06-uppercase-text
title: uppercase_text(s)
status: done
type: feature
depends: [05-concat-text]
relates: []
---

# uppercase_text(s)

## Abstract

Return `s` in upper case, built on `concat_text`. Exercises a task that depends on another task's module (`05-concat-text`). Audience: dhs developers using this fixture repo (`docs/prd.md`).

## Requirements

- Module exports `uppercase_text` as a named CommonJS export.
- The module lives at `src/uppercase-text.js` and uses `concat_text` from `src/concat-text.js`.
- `uppercase_text(s)` calls `concat_text('', s)` and returns the upper-cased result (`String.prototype.toUpperCase`).
- Input whose `typeof` is not `'string'` throws `TypeError` (raised by `concat_text`; String objects are rejected).

## Acceptance criteria

- `uppercase_text('abc')` returns `'ABC'`.
- `uppercase_text('aBc1!')` returns `'ABC1!'`.
- `uppercase_text('')` returns `''`.
- The implementation calls `concat_text('', s)` before uppercasing.
- `uppercase_text(7)` throws `TypeError`.
- `uppercase_text(new String('a'))` throws `TypeError`.
- `npm test` exits 0 and covers every criterion above.

## Architectural decisions

Plain CommonJS module, no new dependencies. Validation is delegated to `concat_text`, not duplicated. `concat_text` is called through the required module object at call time (not a destructured binding), so a test can observe the call by replacing the export on that module object. Tests use `node:test` and `node:assert`, run by the existing `npm test`.
