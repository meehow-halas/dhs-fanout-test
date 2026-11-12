# Feature log — 08-max-of

| date | agent | action | note |
|------|-------|--------|------|
| 2026-11-12 | architect | proposal | Mode: interactive. Existing spec left unchanged; proposed spec and proposed prompt below, pending user approval (Q1). Prompt not written yet. Status stays `todo`. Dependencies: depends [], relates []; no other task touches `max_of` (09-clamp and 10-reverse-text own separate files). Brainstorm not needed (small helper, not `significant`). |
| 2026-11-12 | architect | proposed changes | (1) Abstract: add "for whom" sentence (`docs/prd.md`) — reason: template asks what/why/for whom. (2) Requirement: module file `src/max-of.js` — reason: spec names no location; one file per helper as `src/divide.js`, `src/sqr.js`. (3) Requirement: argument that is not an array (`Array.isArray`) throws `TypeError` — reason: spec does not say what happens for `max_of(5)` or `max_of('abc')`. (4) Requirement: check order — not an array -> `TypeError`; empty array -> `RangeError`; any element whose `typeof` is not `'number'` -> `TypeError` — reason: pins which error wins, same type-first style as `divide`. (5) Requirement: result equals `Math.max` over the elements, so `NaN` in the array yields `NaN` — reason: `typeof NaN === 'number'`, so without a rule a plain `>` loop and `Math.max` ship different results. (6) Requirement: input array is not mutated — reason: preserve caller data. (7) ACs added: `max_of([-5, -2, -9])` returns `-2`; `max_of([7])` returns `7`; `max_of(5)` throws `TypeError`; `max_of([1, NaN])` returns `NaN`; input array unchanged; `npm test` exits 0 — reason: cover each rule above. (8) Architectural decisions: no spread into `Math.max` (`Math.max(...values)` can overflow the call stack on very large arrays); tests via `node:test`/`node:assert` — reason: robustness and "no new dependencies". No existing sentence or AC removed. |
| 2026-11-12 | architect | question | Q1: Approve the proposed spec (file `src/max-of.js`, non-array -> `TypeError`, check order, `NaN` follows `Math.max`, no mutation, added ACs) and overwrite the spec file, then write the prompt? — Recommendation: approve (existing ACs unchanged; closes the non-array and `NaN` gaps and fixes the file path). |
| 2026-11-12 | architect | approved | Q1: approved by user (relayed by launching skill). Spec overwritten with the proposed spec (read back from disk: `status: todo`, new requirements and ACs present; original text preserved in the proposal row above plus the 3 original ACs, which are unchanged); prompt written to `docs/prompt/08-max-of.prompt.md`. Status stays `todo`. Nothing committed. |
| 2026-11-12 | implementer | started | Mode: interactive. start-task OK, branch `08-max-of`, worktree `.git/dhs-worktrees/08-max-of`. Status set to `in progress`. |
| 2026-11-12 | implementer | implemented | Mode: interactive. Branch `08-max-of`, 2 phases. Phase 1: `src/max-of.js` (Consultant pass 1: continue, no must-fix). Phase 2: `test/max-of.test.js` (Consultant pass 1: rework, C2.1 must-fix + C2.2/C2.3 should-fix; fixed; pass 2: continue). `node --test test/max-of.test.js`: 10 pass, 0 fail. Files created: `src/max-of.js`, `test/max-of.test.js`. Files changed: none. Files deleted: none. Status set to `implemented`. |
| 2026-11-12 | reviewer | review started | Mode: interactive. Status set to `in review`. |
| 2026-11-12 | reviewer | final review | Mode: interactive. 0 open issues. All requirements and ACs met; `node --test` passes. Non-blocking note: `max_of([-0, 0])` sign-of-zero behaviour differs from `Math.max` (not in spec). User accepted. Status set to `done`. |

## Proposed spec

```markdown
---
id: 08-max-of
title: max_of(values)
status: todo
type: feature
depends: []
relates: []
---

# max_of(values)

## Abstract

Return the largest number of a non-empty numeric array. Adds a small numeric helper to this fixture repo for dhs developers (`docs/prd.md`).

## Requirements

- Module exports `max_of` as a named CommonJS export.
- The module lives at `src/max-of.js` (one file per helper).
- An argument that is not an array (`Array.isArray` is false) throws `TypeError`.
- An empty array throws `RangeError`.
- An array containing any element whose `typeof` is not `'number'` throws `TypeError`.
- Checks run in this order: not an array, empty, element types.
- The result equals `Math.max` over the elements; an array containing `NaN` returns `NaN`.
- The input array is not mutated.

## Acceptance criteria

- `max_of([1, 9, 3])` returns `9`.
- `max_of([-5, -2, -9])` returns `-2`.
- `max_of([7])` returns `7`.
- `max_of([])` throws `RangeError`.
- `max_of([1, 'x'])` throws `TypeError`.
- `max_of(5)` throws `TypeError`.
- `max_of([1, NaN])` returns `NaN`.
- The array passed to `max_of` has the same contents and order after the call.
- `npm test` exits 0 and covers every criterion above.

## Architectural decisions

Plain CommonJS module, no new dependencies. Validation by `Array.isArray` and `typeof` only. Do not spread the array into `Math.max` (`Math.max(...values)` can exceed the call-stack argument limit on very large arrays). Tests use Node built-ins `node:test` and `node:assert`, run by the existing `npm test` (`node --test`).
```

## Proposed prompt

```markdown
# Implementation prompt — 08-max-of

Spec: `docs/features/08-max-of.feature.md` (source of truth). The Implementer writes their own plan.

## Goal

`src/max-of.js` exports `max_of(values)` per the spec, with behaviour tests runnable via `npm test`.

## Order

1. Module: `src/max-of.js` with the named CommonJS export `max_of`; validation in the spec's order before computing; no spread into `Math.max`.
2. Tests: `test/max-of.test.js` using `node:test` + `node:assert`, covering every acceptance criterion.

## New dependencies

None. Use Node built-ins only.

## Existing code to reuse

- `src/divide.js`, `src/sqr.js` — style reference (`'use strict'`, JSDoc, `typeof` validation, named export).
- `package.json` `scripts.test` (`node --test`) — already runs `test/`.

## What not to change

- `package.json`.
- Existing `src/*.js` and `test/*.test.js` files.
- Do not create `index.js` or an aggregate module; sibling tasks (09-clamp, 10-reverse-text) own their own files.
- `docs/features/` (including this task's spec), `docs/prd.md`, `harness.config.json`, `.dhs/`, `AGENTS.md`, `CLAUDE.md`.
```
