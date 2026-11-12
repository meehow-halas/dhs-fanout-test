# Changelog

- 04-divide (2026-11-12): add `divide(x, y)` helper in `src/divide.js` with TypeError/RangeError checks and `npm test` via `node --test`.
- 05-concat-text (2026-11-12): add `concat_text(x, y)` helper in `src/concat-text.js` with TypeError for non-strings and tests.
- 07-sqr (2026-11-12): add `sqr(x, y)` helper in `src/sqr.js` returning `Math.sqrt(x*x + y*y)` with TypeError for non-numbers and tests.
- 06-uppercase-text (2026-11-12): add `uppercase_text(s)` helper in `src/uppercase-text.js` built on `concat_text`, with tests.
- 09-clamp (2026-11-12): add `clamp(x, min, max)` helper in `src/clamp.js` with TypeError for non-numbers, RangeError for min > max, and tests.
- 08-max-of (2026-11-12): add `max_of(values)` helper in `src/max-of.js` with TypeError/RangeError checks, `Math.max` semantics for NaN, and tests.
