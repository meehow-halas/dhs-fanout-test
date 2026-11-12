# Implementation prompt

Task: `02-subtract`. Spec: `docs/features/02-subtract.feature.md`. Log: `docs/feature-log/02-subtract.log.md`.

## Goal

Add `subtract(x, y)` that returns `x - y` for two numbers, throws `TypeError` when either argument is not a number, and is available as a named CommonJS export. Done when every acceptance criterion in the spec passes under the project test runner.

## Order

1. Add the `subtract` module and its tests together (one phase): source under `src/`, tests under `test/`, following the existing `divide` pair.

## New dependencies

None.

## Existing code to reuse

- `src/divide.js` — pattern for a single-function CommonJS module with `'use strict'`, a `typeof` argument check that throws `TypeError`, and `module.exports = { name }`.
- `test/divide.test.js` — pattern for `node:test` + `node:assert` tests (arrange, act, assert).
- `.claude/rules/dhs-javascript-modules.md` and `.claude/rules/dhs-javascript-tests.md` — module and test rules that apply to the new files.

## What not to change

- `src/divide.js` — leave this alone.
- `src/sqr.js`, `src/clamp.js`, `src/max-of.js`, `src/concat-text.js`, `src/uppercase-text.js`, `src/reverse-text.js` — leave these alone.
- `test/divide.test.js` and all other existing tests — do not edit or weaken.
- `package.json`, `CHANGELOG.md`, `AGENTS.md`, `docs/` artifacts for other tasks — do not edit.
- `.claude/`, `.cursor/`, `.opencode/` agent, skill, and rule files — do not edit.
