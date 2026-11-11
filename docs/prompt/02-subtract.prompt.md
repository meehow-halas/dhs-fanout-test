# Implementation prompt

## Goal

`src/subtract.js` exports a named CommonJS `subtract(x, y)` that returns `x - y` for two `number` arguments and throws `TypeError` otherwise, covered by a `node --test` behaviour test that exercises every acceptance criterion in `docs/features/02-subtract.feature.md`.

## Order

1. Module and behaviour tests: add `src/subtract.js` and `test/subtract.test.js` using `node:test` and `node:assert`. Tests `require` the real module, cover each acceptance criterion (the `TypeError` in both argument positions and for a missing argument), and include a result that would expose swapped operands or a hardcoded return.
2. Verify: run `node --test test/subtract.test.js` and record the result in the log.

## New dependencies

None. Built-in `node:test` and `node:assert` only.

## Existing code to reuse

- None: the repository has no application code yet. `package.json` declares no `type`, so `.js` files are CommonJS.
- Keep the shape consistent with sibling specs `docs/features/01-add.feature.md` and `docs/features/03-multiply.feature.md` (named CommonJS export, `TypeError` on non-numbers).

## What not to change

- `package.json` — shared by all parallel fixture tasks; do not edit `scripts`, `main`, or dependencies.
- No shared `index.js` / barrel file, and no modules for other operations under `src/` (e.g. `src/add.js`, `src/multiply.js`).
- `docs/prd.md`, `harness.config.json`, `AGENTS.md`, `CLAUDE.md`, `CHANGELOG.md`, `.dhs/`, `.claude/`, `.cursor/`, `.opencode/`.
- Other tasks' specs, prompts, and logs under `docs/features/`, `docs/prompt/`, `docs/feature-log/`.
