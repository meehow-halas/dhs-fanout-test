# Implementation prompt

## Goal

`src/multiply.js` exports a named CommonJS `multiply(x, y)` that returns `x * y` for two `number` arguments and throws `TypeError` otherwise, covered by a `node --test` test file that exercises every acceptance criterion in `docs/features/03-multiply.feature.md`.

## Order

1. Module and behaviour tests: add `src/multiply.js` and a test file (e.g. `test/multiply.test.js`) using `node:test` and `node:assert`; tests call the real exported function via `require`, cover each acceptance criterion (including the `TypeError` case in both argument positions and a missing argument), and include at least one non-trivial product so a hardcoded return would fail.
2. Verify: run `node --test test/multiply.test.js` and record the result in the log.

## New dependencies

None. Use the built-in `node:test` and `node:assert` only.

## Existing code to reuse

- None: the repo has no application code yet. Follow the shape of sibling specs `docs/features/01-add.feature.md` and `docs/features/02-subtract.feature.md` (named CommonJS export, `TypeError` on non-numbers).

## What not to change

- `package.json` — shared by all fixture tasks; do not edit scripts or add dependencies.
- `harness.config.json`, `AGENTS.md`, `CLAUDE.md`, `docs/prd.md`, `.dhs/` — harness and project config.
- Other tasks' specs under `docs/features/` and any other function modules under `src/` (e.g. `src/add.js`, `src/subtract.js` from related tasks `01-add`, `02-subtract`).
- No shared `index.js` / barrel file.
