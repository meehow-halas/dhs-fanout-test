---
name: dhs-checkit
description: One Reviewer round per named task (review, update from base, or close after merge). Use when the user runs /dhs-checkit.
---

# /dhs-checkit

One Reviewer round per named task. Parse intent: **review** (default), **update** from base, or **close** after the user confirms merge. One variant for the whole invocation. Do not chain stages. Do not launch Architect. Do not merge the GitHub PR.

Prefer reporting ❌ and offering `/dhs-doit`. Do not chain into Implementer unless this invocation is a review ❌ handoff the user **asked to fix here**. `/dhs-shipit` owns the fix-round loop.

Read `harness.config.json` at run time. Do not guess `agents.baseBranch`, status strings, tracker maps, `fetchFields`, content language, or the product line. Do not invent CLI commands.

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

If the live Reviewer file is missing from **this host’s** `agentsDir` in `.dhs/references/hosts.json`:

```text
BLOCKED: live agents are missing — run /dhs-setup
```

## Mode

From **intent**. A launch may name `interactive`, `critical`, or `autonomous`. If the user asked for the work to be done alone (`samodzielnie`, `sam`, `bez pytań`, `autonomicznie`, `autonomous`), use `autonomous`; never fall back to `interactive` then. Otherwise default `interactive`. Pass that mode to the Reviewer.

Reply in the conversation language.

## Variant

Parse the user message. Do not mix variants.

| Intent | Variant | When |
|--------|---------|------|
| review (default) | `review` | Anything that is not update or close |
| update from base | `update` | User asks to update, rebase is not used: merge base into the task branch via the script |
| close after merge | `close` | User says the PR is merged **and** confirms that |

**Close** without a confirmed merge:

```text
BLOCKED: merge not confirmed — confirm the GitHub PR is merged, then /dhs-checkit close
```

**Update** and **close** rules live in the Reviewer file (`update-from-base`, verify merge, `done`, `return-to-base`). This skill names the variant; it does not compose `git` or `gh`.

## Several keys

If the prompt has the line `Fan-out child: yes`, this session is a child: run the one key here and skip this section. Otherwise, two or more keys named, and `sessionSpawn` in `.dhs/references/hosts.json` for this host is `start_session`: follow `.dhs/references/session-fanout.md` with skill `checkit` and the same variant for every child, one child session per key. The parent runs `.dhs/scripts/start-task` per key before spawning; do not launch Reviewer here. `close` is serial (`fanout-plan` returns `mode: serial`). Two or more keys and `sessionSpawn` is `manual`: print the commands per key and stop. One key: continue below.

## Resolve the tasks

Need an existing spec + prompt on the **active tracker** (repo files when Jira has `artifactsOnTrackerOnly: false`). User named one or more basenames or issue keys → those tasks. Otherwise the task they clearly mean. If several match and they did not list them, one question in `interactive`; otherwise:

```text
BLOCKED: task is ambiguous — name the feature basename or Jira key
```

If spec or prompt is missing for a named task, stop **that** task and continue the others:

```text
BLOCKED: spec and prompt are missing — run /dhs-planit or /dhs-shipit
```

## Launch Reviewer

This skill is the parent. Follow the live Reviewer file for this host (`<agentsDir>/reviewer.md` from `.dhs/references/hosts.json` — a copy from `/dhs-setup`, not a symlink to `.dhs/agents/`). Do not duplicate that procedure here.

For each resolved task:

1. Run `.dhs/scripts/start-task <task>` from the launch checkout if a worktree is not already printed for it. Copy `worktree:`. Do not compose `git`.
2. Launch Reviewer with at least:
   - `Mode: <mode>`
   - `Variant: review` or `Variant: update` or `Variant: close` (same variant for every task)
   - Task key
   - `Worktree: <abs>`
   - The user request
   - Conversation language when you know it

N>1: in parallel when the runtime allows; otherwise sequential worktrees. Interactive acceptance is **per task**; do not accept the whole list with one yes. A `Q<n>` or `BLOCKED:` on one task does not stop siblings.

One round per task in this invocation. Do not start a second Reviewer round for the same task here. Do not start Implementer after ❌ unless the user asked to fix those items in this same invocation; even then, prefer `/dhs-doit` unless they were explicit. ⚠️ does not start a fix round.

Do not merge. After a clean accepted review, the Reviewer may open a PR; this skill reports each URL and stops.

## After Reviewer finishes

Report the variant, each task key, ✅/⚠️/❌, status, `worktree:`, and any script `OK` / `UNCHANGED` / `BLOCKED:` lines.

- Open ❌ → offer `/dhs-doit` (those items only, same list) or `/dhs-shipit` for a single task. Do not start them unless the user already asked to fix in this invocation.
- Clean review waiting for merge → the user merges on GitHub; close is a later `/dhs-checkit` after they confirm.
- Update finished → report; do not review unless they also asked for review (they did not: this invocation was update only).
- Close finished → report `done`.
