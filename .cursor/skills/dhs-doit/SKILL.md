---
name: dhs-doit
description: Run the Implementer (Consultant loop inside) for one or more existing specs. Use when the user runs /dhs-doit. Same skill for features and bugs.
disable-model-invocation: true
---

# /dhs-doit

Implementation only. Launch the Implementer for an existing spec + prompt. Same skill for `type: feature` and `type: bug`. One task or a list. This session applies the Implementer procedure inline and launches Consultant after each phase. Do not spec. Do not launch Architect or Reviewer. There is no user-facing Consultant skill.

Read `harness.config.json` at run time. Do not guess `agents.baseBranch`, status strings, tracker maps, `fetchFields`, content language, or the product line. Do not invent CLI commands. Do not merge a PR. Do not edit `CHANGELOG.md`.

Stops (not questions) are one line:

```text
BLOCKED: <what stopped> — <what the user or another skill must do>
```

Shape: `.dhs/references/BLOCKED.md`. If a `.dhs/scripts/` helper refuses, copy its `BLOCKED:` line, stop that path, and do not work around it with raw `git` or `gh`.

## Guard

Before any work. Compare `.dhs/VERSION` and `dhs.generatedFrom` after trimming whitespace.

1. If `.dhs/` or `.dhs/VERSION` is missing:

```text
BLOCKED: dhs install has not been run here — run dhs install (npx -p dev-harness-layer dhs install or npx -p github:nbmh/dev-harness-layer dhs install), then /dhs-setup
```

2. If `harness.config.json` is missing:

```text
BLOCKED: setup is incomplete — run /dhs-setup
```

3. If `.dhs/VERSION` does not match `dhs.generatedFrom` in `harness.config.json`:

```text
BLOCKED: generated files do not match the installed templates — run /dhs-setup
```

If the live Implementer file is missing from **this host’s** `agentsDir` in `.dhs/references/hosts.json`:

```text
BLOCKED: live agents are missing — run /dhs-setup
```

## Mode

From **intent**. A launch may name `interactive`, `critical`, or `autonomous`. If the user asked for the work to be done alone (`samodzielnie`, `sam`, `bez pytań`, `autonomicznie`, `autonomous`), use `autonomous`; never fall back to `interactive` then. Otherwise default `interactive`. Pass that mode to the Implementer.

Reply in the conversation language.

## Several keys

If the prompt has the line `Fan-out child: yes`, this session is a child: run the one key here and skip this section. Otherwise, two or more keys named, and `sessionSpawn` in `.dhs/references/hosts.json` for this host is `start_session`: follow `.dhs/references/session-fanout.md` with skill `doit`, one child session per key. The parent runs `.dhs/scripts/start-task` per key before spawning; do not launch Implementer here. Two or more keys and `sessionSpawn` is `manual`: print the `start-task` and `/dhs-doit <KEY>` commands per key and stop. One key: continue below.

## Resolve the tasks

Need an existing spec **and** prompt on the **active tracker** (files if `agents.tracker` is absent; Jira if present — bodies on issue or in repo per `agents.tracker.artifactsOnTrackerOnly`). Never mirror.

- User named one or more basenames or issue keys → those tasks, in that order.
- Otherwise pick the task they clearly mean. If several match and they did not list them, one question in `interactive`; otherwise:

```text
BLOCKED: task is ambiguous — name the feature basename or Jira key
```

For **each** named task independently:

If spec or prompt is missing:

```text
BLOCKED: spec and prompt are missing — run /dhs-planit or /dhs-shipit
```

Read status from the active tracker. Compare to `agents.statuses` (files) or mapped `agents.tracker.statuses` (Jira). If status is already the configured `in review` or `done` string:

```text
BLOCKED: task is already in review or done — use /dhs-checkit for update or close; do not re-implement
```

A basename/key in `depends` that is not at the configured `done` status is a stop **for that task** (Implementer also enforces this). Do not work around it. Continue the other named tasks.

## Launch Implementer

Follow the live Implementer file for this host (`<agentsDir>/implementer.md` from `.dhs/references/hosts.json` — a copy from `/dhs-setup`, not a symlink to `.dhs/agents/`) **inline in this session**. Do not launch Implementer as a subagent: subagents cannot launch Consultant. Do not duplicate that procedure here. Launch Consultant from this session (Agent tool) after each phase; do not expose Consultant as a skill.

For each task that passed resolve:

1. Run `.dhs/scripts/start-task <task>` from the launch checkout. Copy its `worktree:` path. Do not compose `git`.
2. Apply the Implementer procedure in this session with at least:
   - `Mode: <mode>`
   - Task key (basename or issue key)
   - `Worktree: <abs>`
   - The user request
   - Conversation language when you know it
   - If this is a Reviewer ❌ handoff the user asked to fix **in this invocation**: the ❌ items only (Consultant again only on phases those fixes belong to)

N>1 in this session (no fan-out): run the tasks one after another, one worktree per task. Parallel runs come only from session fan-out (`.dhs/references/session-fanout.md`), where each key gets its own session.

A `BLOCKED:` on one task stops that task; report it and continue with the next one.

When all phases have `continue`, status stays `in progress`. Do not start Reviewer.

## After Implementer finishes

Report each task key, its `worktree:`, and that status remains `in progress` (or that task’s `BLOCKED:`). Offer `/dhs-checkit` (one Reviewer round, same list) or `/dhs-shipit` for a single leftover. Do **not** start review.
