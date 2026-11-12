---
name: dhs-shipit
description: Full path Architect → Implementer (Consultant inside) → Reviewer. Use when the user runs /dhs-shipit. Starts at the first missing stage.
---

# /dhs-shipit

Full path for **one task**. Single-stage skills do not chain; **this** skill runs the pipeline. Starts at the first missing stage. Does not merge the GitHub PR. There is no user-facing Consultant skill (Consultant stays inside Implementer). A list of keys:

```text
BLOCKED: /dhs-shipit is one task — spec with /dhs-planit, then /dhs-doit with the list
```

Read `harness.config.json` at run time. Do not guess `agents.baseBranch`, status strings, tracker maps, `fetchFields`, content language, or the product line. Do not invent CLI commands.

Stops (not questions) are one line:

```text
BLOCKED: <what stopped> — <what the user or another skill must do>
```

Shape: `.dhs/references/BLOCKED.md`. If a `.dhs/scripts/` helper refuses, copy its `BLOCKED:` line, stop that path, and do not work around it with raw `git` or `gh`.

Do not pause between stages when there is no question and no stop. Report once at the end or at the first stop.

This skill does **not** start a brainstorm round by itself. If Architect (inside this skill) needs a round, stop and ask `/dhs-brainstorm`. Do not interview personae in-process.

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

If a live agent this stage needs is missing from **this host’s** `agentsDir` in `.dhs/references/hosts.json` (`architect.md`, `implementer.md`, `reviewer.md`):

```text
BLOCKED: live agents are missing — run /dhs-setup
```

## Mode

From **intent**. A launch may name the mode so **every** agent in this run shares it. If the user asked for the work to be done alone (`samodzielnie`, `sam`, `bez pytań`, `autonomicznie`, `autonomous`), use `autonomous` for the whole run, including the close round; never fall back to `interactive` then. Otherwise default `interactive`. Pass the same `Mode:` to Architect, Implementer, and Reviewer.

| Mode | Ask the user |
|------|----------------|
| `interactive` | One question at a time, when it is reached. Stop this pipeline on that question. |
| `critical` | One question only for a **critical** decision, then stop. Otherwise agents decide, record, continue. Clean review = PR URL; do not merge. |
| `autonomous` | Ask nothing. Clean review = PR URL; do not merge. |

Reply in the conversation language.

## Several keys

This skill runs one task. If the prompt has the line `Fan-out child: yes`, this session is a child: run the one key here and skip this section. Otherwise, two or more keys named, and `sessionSpawn` in `.dhs/references/hosts.json` for this host is `start_session`: follow `.dhs/references/session-fanout.md` with skill `shipit`, one child session per key (each child runs the full pipeline for its key). Two or more keys and `sessionSpawn` is `manual`: print one `/dhs-shipit <KEY>` command per key and stop. One key: continue below.

## Resolve the task

Active tracker only: files if `agents.tracker` is absent; Jira if present (artifact bodies per `agents.tracker.artifactsOnTrackerOnly`). Never mirror.

- New work (a sentence, no key) → no spec yet.
- Named basename or issue key → load spec, prompt, log, status from that tracker. Two or more keys → stop (`BLOCKED: /dhs-shipit is one task` above).
- Status strings: `agents.statuses` (files) or mapped `agents.tracker.statuses` (Jira). Compare to those values; do not translate them.

If status is already the configured **`done`** string, stop. Do not re-run Architect, Implementer, or Reviewer:

```text
BLOCKED: task is already done — the PR is opened; use /dhs-checkit update only if the branch needs it
```

## Pipeline

Start at the first missing stage. Skip stages that are already done.

### 1. No spec or prompt → Architect

Follow the live Architect file for this host (`<agentsDir>/architect.md` from `.dhs/references/hosts.json`). Do not duplicate it.

Pass `Mode:`, the request, conversation language when known.

If Architect asks `/dhs-brainstorm`: stop and ask that skill; do not run the round here; do not continue the pipeline.

If Architect stops on `BLOCKED:` or `Q<n>`, stop the pipeline and report.

On success, status stays `todo`. Continue to stage 2 without pausing.

### 2. Spec + prompt, no implementation → Implementer

No implementation means status is still the configured `todo` string (Architect does not advance past `todo`).

Follow the live Implementer file for this host (`<agentsDir>/implementer.md`) inline in this session, not as a subagent. Launch Consultant from this session after each phase (Agent tool); do not launch Consultant as a skill.

Run `.dhs/scripts/start-task <task>` from the launch checkout. Pass the same `Mode:`, the task key, and `Worktree: <abs>` from the script. Implementer may call `start-task` again (idempotent). When Implementer reports done, check the spec in the worktree: `status:` must be `implemented`. Otherwise stop with `BLOCKED: status <value> after implementation — the Implementer did not finish the status steps for <task>`.

If Implementer stops on `BLOCKED:` or `Q<n>`, stop the pipeline and report.

On success, status is `implemented`. Continue to stage 3 without pausing.

### 3. Implementation exists → Reviewer

Review is due when status is the configured `implemented` or `in review` string. If it is `in progress`, a fix round is open after a ❌: run stage 2 again.

Follow the live Reviewer file for this host (`<agentsDir>/reviewer.md`). One review round: `Variant: review`.

Pass the same `Mode:`, the task key, and `Worktree: <abs>`. Do not merge.

If Reviewer stops on `BLOCKED:` or `Q<n>` (including interactive acceptance), stop the pipeline and report.

- No open ❌ → stage 5.
- Open ❌ → stage 4.
- ⚠️ only → do not start a fix round; continue to stage 5 if Acceptance allows, else report.

### 4. Open ❌ → Implementer (those items only), then Reviewer again

Max **three** Reviewer rounds total for this task (count Reviewer reports in the log plus this run). The same ❌ with no code change ends the loop: report and stop.

Apply the Implementer procedure inline in this session with **only** the open ❌ items. Consultant runs again only on phases those fixes belong to (Implementer’s caps). Then Reviewer again (`Variant: review`).

Do not start a fourth Reviewer round.

### 5. Finish

- `interactive`: stop on agent questions (already handled). After a clean review, Reviewer waits for explicit acceptance, then git allowlist (commit, push, PR, return to base). Do not merge.
- `critical` / `autonomous`: a clean Reviewer run is acceptance. Report the PR URL. Do not merge.

The Reviewer opens the PR and sets `done`. The user merges it on GitHub; this skill is finished.

## Launch payload (every agent)

- `Mode: <same mode for the whole run>`
- Task key when it exists
- `Worktree: <abs>` for Implementer and Reviewer (not Architect)
- User request
- Conversation language when known
- Stage 4: the ❌ list only

Live files are copies from `/dhs-setup` under every `agentsDir` in `.dhs/references/hosts.json`, not symlinks to `.dhs/agents/`. In this session use the copy this host loaded.
