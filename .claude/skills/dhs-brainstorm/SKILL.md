---
name: dhs-brainstorm
description: CRUD brainstorm members, build app context, and run a consult round. Use when the user runs /dhs-brainstorm or when Architect /dhs-planit needs a persona round.
---

# /dhs-brainstorm

Members, app context, and a consult. Orchestrate the round. Do **not** role-play personae or the facilitator. Do not put a facilitator in `agents/`. Do not invent CLI commands. `/dhs-setup` does not edit members.

Read `harness.config.json` at run time. Do not guess `agents.baseBranch`, status strings, tracker maps, `fetchFields`, content language, or the product line.

Stops (not questions) are one line:

```text
BLOCKED: <what stopped> — <what the user or another skill must do>
```

Shape: `.dhs/references/BLOCKED.md`.

Templates live under `.dhs/brainstorm/` (package `brainstorm/`): `member.md`, `persona-output-format.md`, `facilitator.md`, `report-template.md`, `app-context.md`. Live member files and app context go under **every** `brainstormDir` in `.dhs/references/hosts.json`. Config is the source of truth; regenerate those files from config. Do not keep live members under `.dhs/` (install replaces that tree).

---

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

---

## This host

Read `.dhs/references/hosts.json`. This session’s host `id` is the row whose `skillsDir` contains the `/dhs-brainstorm` skill that loaded. Use that row’s `agentsDir` and `brainstormDir`. If no row matches:

```text
BLOCKED: this skill is not in a hosts.json skillsDir — run /dhs-setup
```

---

## Intent

From the user message. Ask **one question** if it is unclear. Do not dump a menu.

| Intent | Do |
|--------|----|
| Members CRUD | Create, edit, or remove members. List if they ask. |
| App context | Build or update `app-context.md` in every `brainstormDir`. |
| Direct consult | A question or a spec. Threshold does **not** apply. |
| During specification | `/dhs-planit` or Architect inside `/dhs-shipit` asked for a round. |

This skill does not start because `/dhs-shipit` decided to. `/dhs-shipit` never starts a round by itself.

---

## Config shape

`agents.brainstorm` in `harness.config.json`. `/dhs-setup` does not write members or the brainstorm model.

| Key | Role |
|-----|------|
| `consult` | `any` \| `significant` (default if unset) \| `broad` |
| `model` | Map keyed by host `id`. One string per host for every persona turn and the facilitator. No per-persona model. Suggest that host’s `modelSuggest.brainstorm` when asking. |
| `members` | Array of `{ id, description, identity, cares, dislikes }`. `identity` / `cares` / `dislikes` are string lists. |

Do not add a facilitator (or any brainstorm runner) to `agents.roles`.

`agents.brainstorm.model` must have a non-empty string for every `id` in `hosts.json`. A JSON string is not a map. Do not copy another host’s model.

**Per-host confirm.** For each host in `.dhs/references/hosts.json` (table order), prefill `agents.brainstorm.model[<host.id>]` from that row’s `modelSuggest.brainstorm` when present, show the default model id (persona and facilitator turns share this one string), then **one question per host**: whether to change it. Skip / no = accept. Yes = one reply with the new model id. Write the map before a round when every host is confirmed.

**Question wording.** Frame as **change**, not “keep this model?”. After showing the default id, use helper text in this shape:

```text
Change the brainstorm model for <host label>? Reply skip or no to keep <default id>. Reply yes with the new model id in one message.
```

**Reply mapping.** Accept default: `skip`, `no`, `nie`, empty, or clear keep intent. New id: `yes`, `tak`, `change`, or the new id alone. If you mistakenly asked to “keep” and the user answered like accept (e.g. **tak** with no id), keep the default.

**Legacy string.** If `model` is a string, prefill every host `id` with that string, then **per-host confirm** (mention `modelSuggest.brainstorm` in helper text when it differs from the prefill).

**Missing host key.** Same **per-host confirm** when the table has an `id` the map does not; prefill from `modelSuggest.brainstorm` when present.

If a round needs a model and `agents.brainstorm.model[<host.id>]` is missing or empty:

```text
BLOCKED: brainstorm model missing for host <id> — finish model map in /dhs-brainstorm
```

---

## Members CRUD

Live files: `<brainstormDir>/members/<id>.md` for **every** `brainstormDir` in `.dhs/references/hosts.json`, generated from `.dhs/brainstorm/member.md` plus the member object. Fill `{{id}}`, `{{description}}`, and bullet lists for `identity`, `cares`, `dislikes`. After create, edit, or remove: **regenerate** those files from config. Do not hand-edit generated member markdown. On remove, delete the file in every `brainstormDir` and drop the object from `members`.

**Create — first member in this project** (no `members` yet, or the array is empty). Ask once, one question at a time:

1. Consult threshold (`any` / `significant` / `broad`). Default if they skip: `significant`. Write `agents.brainstorm.consult`.
2. Model for persona and facilitator turns. If `model` is already a complete map with every host `id`, reuse it. Otherwise use **per-host confirm** from above and write `agents.brainstorm.model` as a map keyed by host `id`.

Later creates reuse those keys. Do not ask again unless the user is changing them here (not in `/dhs-setup`). A model change is one cell `(host)` unless the map is incomplete.

Then ask for `id`, `description`, `identity`, `cares`, `dislikes` (one question at a time). Append to `members` and write the markdown.

Members are markdown personae, not `@`-targets and not dhs roles.

---

## App context

Path: `<brainstormDir>/app-context.md` in every `brainstormDir`. Skeleton: `.dhs/brainstorm/app-context.md`. Write the same confirmed body to each copy.

Build from the repo: one-line `product`, `agents.docs`, README, and those docs. State inferences so the user can object. Gaps: **one question at a time**. Show the proposed file. Write only after the user confirms.

A consult needs this file ready in **this host’s** `brainstormDir`. If it is missing there or the user has not confirmed it:

```text
BLOCKED: app context is not ready — finish app context in /dhs-brainstorm
```

---

## When to consult during specification

`/dhs-planit` or Architect inside `/dhs-shipit` stops and asks this skill. They do not interview personae.

Consult **on its own** (without the user naming a question) only when there are **at least two** members **and** the work passes `agents.brainstorm.consult`:

- `any` — every user-visible change
- `significant` (default if unset) — hard to reverse, or changes how the product is used
- `broad` — new module, onboarding, pricing, navigation rebuild

If that bar is not met and they did not ask for a direct consult, do not run a round.

---

## Direct consult

Needs a ready app context and **at least one** member. Threshold does not apply.

If the user names members, ask those. Otherwise ask every member.

If there are no members:

```text
BLOCKED: no brainstorm members — create a member in /dhs-brainstorm
```

Then run the round with the question or spec as **material**.

---

## Round

Split:

```text
material (spec or question)
    → each persona, alone, without Architect context
    → facilitator collates, without scoring or picking a winner
    → Architect receives PART A and decides
```

1. Ready app context (or stop and finish it).
2. **Persona turns.** Isolated one-shot per member. Parallel when the runtime allows. Launch prompt = this host’s member file (`<brainstormDir>/members/<id>.md`) + `.dhs/brainstorm/persona-output-format.md` + this host’s app context + material. Name `Conversation language: <name>` when you know it. Model: `agents.brainstorm.model[<host.id>]` for this host (see **This host**). If that key is missing, stop with the brainstorm-model `BLOCKED:` above. Tools: Read only. No git. No spec edits. Personae do not see each other, Architect notes, `Q<n>` leanings, or a “corrected” spec.
3. **Facilitator** when two or more members were asked: isolated one-shot from `.dhs/brainstorm/facilitator.md`. Input = persona replies + `.dhs/brainstorm/report-template.md`. Same model (`agents.brainstorm.model[<host.id>]`). Read only. Do not write a file. Do not read the spec to correct anyone. One member → that reply **is** PART A; skip the facilitator.
4. **Architect** with **PART A only** plus the material. Follow the live Architect file for this host (`<agentsDir>/architect.md` from `.dhs/references/hosts.json`). Do not pass persona transcripts. Pass `Mode:` from intent (default `interactive`). Architect decides on every blocker, conflict, and gap. Agreement among personae is not required and is not proof. A persona opinion is not user approval.
5. Show the Architect’s decisions. The user resolves leftover conflicts. Do **not** hide a blocker the Architect rejected.
6. **Interactive:** write `docs/brainstorm/<slug>-<YYYY-MM-DD>.md` only after the user confirms the round. Use the settled-record section of the report template. Leave out persona replies and PART A. **Critical/autonomous:** Architect consumes PART A; do **not** write that file.
7. One round unless the user asks for another, and then only for what changed.

Do not paste persona transcripts back into the chat or into the Architect launch. If every persona says almost the same thing, that is a weak set — the facilitator flags it under review quality.

Settled records stay files under `docs/brainstorm/`. They are not the task tracker.

---

## Do not

- Role-play a persona or the facilitator in this skill.
- Copy facilitator templates into any `agentsDir` or `agents.roles`.
- Interview personae from Architect, Implementer, Consultant, or Reviewer.
- Hand-edit generated member markdown.
- Touch `agents.roles` for a brainstorm model.
- Copy one host’s brainstorm `model` onto another host’s launch.
- Write persona transcripts into the settled record.
- Start a second round unless the user asks.
- Commit.
