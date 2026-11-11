# Implementation prompt

## Goal

`src/add.js` exports a named CommonJS `add(x, y)` that returns `x + y` for two `number` arguments and throws `TypeError` otherwise, covered by a behaviour test that exercises every acceptance criterion in `docs/features/01-add.feature.md` and passes under `node --test`.

## Order

1. Module and behaviour tests: add `src/add.js` and a test file (for example `test/add.test.js`) using `node:test` and `node:assert/strict`. Tests `require` the real module, cover each acceptance criterion, check the `TypeError` in both argument positions, and include a sum that a hardcoded return value would fail.
2. Verify: run `node --test test/add.test.js` and record the result in the log.

## New dependencies

None. Built-in `node:test` and `node:assert` only.

## Existing code to reuse

- None: the repository has no application code yet. `package.json` declares no `type`, so `.js` files are CommonJS.
- Keep the shape consistent with sibling specs `docs/features/02-subtract.feature.md` and `docs/features/03-multiply.feature.md` (named CommonJS export, `TypeError` on non-numbers).

## What not to change

- `package.json` — shared by all parallel fixture tasks; do not edit `scripts`, `main`, or dependencies.
- No shared `index.js` / barrel file, and no modules for other operations under `src/`.
- `docs/prd.md`, `harness.config.json`, `AGENTS.md`, `CLAUDE.md`, `.dhs/`, `.claude/`, `.cursor/`, `.opencode/`.
- Other tasks' specs, prompts, and logs under `docs/`.
