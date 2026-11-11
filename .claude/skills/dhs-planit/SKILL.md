---
name: dhs-planit
description: Run the Architect once for a request. Use when the user runs /dhs-planit. Offers the next step; does not start it.
---

# /dhs-planit

Spec only. Launch the Architect once. When that finishes, offer `/dhs-doit` or `/dhs-shipit`. Do not start implementation or review. Do not launch Implementer, Consultant, or Reviewer. There is no user-facing Consultant skill.

Read `harness.config.json` at run time. Do not guess `agents.baseBranch`, status strings, tracker maps, `fetchFields`, content language, or the product line. Do not invent CLI commands. Do not merge a PR.

Stops (not questions) are one line:

```text
BLOCKED: <what stopped> — <what the user or another skill must do>
```

Shape: `.dhs/references/BLOCKED.md`.

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

If the live Architect file is missing from **this host’s** `agentsDir` in `.dhs/references/hosts.json`:

```text
BLOCKED: live agents are missing — run /dhs-setup
```

## Mode

From **intent**, not a required slash flag. A launch may name `interactive`, `critical`, or `autonomous`. If the user asked for the work to be done alone (`samodzielnie`, `sam`, `bez pytań`, `autonomicznie`, `autonomous`), use `autonomous`; never fall back to `interactive` then. Otherwise default `interactive`. Pass that mode to the Architect. Definitions: PRD Modes (also in the Architect file).

Reply in the language of the user’s messages in this session, every message, including the final report and any `wrap_up` text. Never switch to another language. Spec, prompt, log, and tracker text are the Architect’s job (`agents.contentLanguage`).

## Several keys

If the prompt has the line `Fan-out child: yes`, this session is a child: run the one key here and skip this section. Otherwise, two or more keys named, and `sessionSpawn` in `.dhs/references/hosts.json` for this host is `start_session`: follow `.dhs/references/session-fanout.md` with skill `planit`, one child session per key. Do not launch Architect here. Two or more keys and `sessionSpawn` is `manual`: print one `/dhs-planit <KEY>` command per key and stop. One key: continue below.

## Resolve the request

The user may give a sentence, an existing basename, or a Jira key. Pass that to the Architect. Do not write spec, prompt, or log yourself. The Architect uses the **active tracker only** (files if `agents.tracker` is absent; Jira if it is present). Read `agents.tracker.artifactsOnTrackerOnly`: when `false`, artifact bodies are repo files only. Never mirror.

## Launch Architect once

Follow the live Architect file for this host (`<agentsDir>/architect.md` from `.dhs/references/hosts.json` — a copy from `/dhs-setup`, not a symlink to `.dhs/agents/`). Do not duplicate that procedure here.

Pass at least:

- `Mode: <mode>`
- The user request (and task key if they named one)
- For an existing spec: say in the launch that the Architect owns the existing-spec rules (overwrite in `autonomous`, proposal in `interactive`, see the Architect file). Do not summarize or rewrite the spec in the parent.
- Conversation language when you know it

If the Architect needs a brainstorm round: **stop and ask `/dhs-brainstorm`**. Do not run the round, do not interview personae, do not launch a facilitator. Then stop this skill; do not start `/dhs-doit`.

If the Architect stops with a `BLOCKED:` line or a question (`Q<n>`), report that and stop. Do not continue to implementation.

## After Architect finishes

Report the task key, title, type, tracker, and that status stays at the configured `todo` string.

Offer the next step. Do **not** start it:

- `/dhs-doit` — implement this spec (Consultant loop inside Implementer)
- `/dhs-shipit` — full path from here

Do not start Reviewer. Do not call git scripts. When Jira is the active tracker, the Architect calls `.dhs/scripts/jira`; this skill does not. Do not write spec, prompt, or log yourself.
