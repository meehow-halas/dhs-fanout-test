---
name: dhs-setup
description: First-time dhs setup and later parameter changes. Use when the user runs /dhs-setup or needs to configure this project's dhs install, models, base branch, packs, AGENTS.md, or Jira tracker.
---

# /dhs-setup

Finish first-time setup, or later change the same config. The CLI does not configure the project.

Generate from `.dhs/` only. Do not invent CLI commands. Do not `npm install -g`. Do not write to `~/.claude/`, `~/.cursor/`, `~/.config/opencode/`, or any other machine-wide path. Do not commit.

Read `.dhs/references/hosts.json`. Install and this skill **always write every row**. Do not ask which hosts to use. If that file is missing, stop:

```text
BLOCKED: dhs install has not been run here — run dhs install (npx -p dev-harness-layer dhs install or npx -p github:nbmh/dev-harness-layer dhs install), then /dhs-setup again
```

Ask **one question at a time**. Wait. Do not dump a questionnaire. Stops (not questions) are one line:

```text
BLOCKED: <what stopped> — <what the user or another skill must do>
```

---

## Entry

1. If `.dhs/` is missing, or `/dhs-setup` is absent from **every** `skillsDir` in `.dhs/references/hosts.json` (present in **any** listed `skillsDir` is enough):

```text
BLOCKED: dhs install has not been run here — run dhs install (npx -p dev-harness-layer dhs install or npx -p github:nbmh/dev-harness-layer dhs install), then /dhs-setup again
```

2. If `.dhs/VERSION` is missing: same stop.

3. If `harness.config.json` is **missing** → **First run**. If it is **present** → **Later run**.

Do not overwrite keys the user did not confirm. Do not regenerate generated files as a silent first-run repeat. A later-run template mismatch (`.dhs/VERSION` ≠ `dhs.generatedFrom`) is not a first-run repeat: finish incomplete role `model` maps first, then regenerate live agents, work skills, and rules, then continue the later-run path.

---

## Role model maps

`agents.roles.<role>.model` must be an object whose keys are every `id` in `.dhs/references/hosts.json`. Each value is a non-empty string. A JSON string is not a map. Do not copy another host’s model onto a live file.

Interview defaults come from that host row’s `modelSuggest` (`architect` / `implementer` / `consultant` / `reviewer`). If that field is missing, ask without a suggestion. Do not translate one host’s model id into another’s. Do not `if (id === "claude-code")` for suggestion text.

If generation needs a model and `agents.roles.<key>.model[<host.id>]` is missing or empty:

```text
BLOCKED: role model missing for host <id> — run /dhs-setup
```

**Per-host confirm (first run, legacy, missing host).** For each host in `.dhs/references/hosts.json` (table order), prefill all four roles for that host’s `id`, show a table (architect / implementer / consultant / reviewer → model), then **one question per host**: whether to change any of those models. Skip / no = accept the table. Yes = the user may reply once with overrides (e.g. `architect: opus`); apply only named roles; leave the rest from prefill. If parsing is unclear, one follow-up question only. Do not stamp live `model:` until every host is confirmed.

**Show each table once.** The table and its question appear once, in the question itself. Do not repeat the same table or the same question in a message before it, after it, or in the closing summary. The same rule applies to every confirmation in this skill (project name, tracker, language, Jira offer): one message per question, no re-printed copies.

**Question wording.** Frame the question as **change**, not **keep**. Do not ask “Keep these models?”, “Czy zostawić te modele?”, or similar — **yes** on a keep-framed question means accept, but this flow treats **yes** as “I want overrides”. After the table, use a **change** question plus helper text in this shape (replace `<host label>` with a readable name from the host row’s `id`, e.g. `claude-code` → Claude Code):

```text
Change any role models for <host label>? Reply skip or no to keep the table as shown. Reply yes and list overrides in one message (e.g. architect: opus).
```

**Reply mapping.** Accept the table: `skip`, `no`, `nie`, empty / Enter, or clear “keep / ok / leave as shown” intent (including Polish *zostaw*, *git*). Apply overrides: `yes`, `tak`, `change`, or a `role: model` list without yes. If you asked a keep-framed question by mistake and the user answered as if keeping (e.g. **tak** with no override list), accept the table; do not ask again for overrides.

**Legacy string.** If `model` is a string, the map is incomplete. Prefill every role on every host `id` with that string. Then use **per-host confirm** on each host (mention `modelSuggest` for that host in helper text when a role’s suggest differs from the prefill). Write the map when all hosts are confirmed.

**Missing host key.** Same **per-host confirm** when the table has an `id` the map does not (for example a new row after upgrade). Prefill that host’s four roles from that row’s `modelSuggest` when present; if `modelSuggest` is missing for a role, ask for that role in the follow-up for that host only.

---

## First run

`harness.config.json` is missing.

### 1. Read the repo

Read the tree (README, manifests, existing docs, default-branch clues, `AGENTS.md` / `CLAUDE.md` / host dirs from `hosts.json`). State inferred choices so the user can object. Do not silently take `main`, `master`, or the current checkout as the base branch.

### 2. Project PRD

Look for an existing product requirements document (typical `docs/prd.md`, or a path the repo already treats as the PRD).

- If one exists: **use it. Do not rewrite it.** Put that path in `agents.docs`.
- If none exists: gather product facts from the repo. Ask one question at a time for each fact the repo does not contain. Ask at least: purpose, users, scope, and **non-goals** (what must not be built). Do not invent any of these from the repo's current contents. Then write `docs/prd.md`. Put that path in `agents.docs`.
- A section the user did not answer is written as `TBD — not stated by the user`, not as a rule. Do not write non-goals the user did not state. An empty non-goals list is written as `None stated`.
- Agents treat `TBD` lines as no constraint and must not report a conflict with them. A conflict is reported only against a stated non-goal or scope line.

Config stores a one-line `product` plus doc paths, **not** the PRD body.

### 3. Questions (one at a time)

Do not write `harness.config.json` or generate live files until these are confirmed.

**Roles.** Only architect, implementer, consultant, reviewer. No other roles. No brainstorm-facilitator model question. For **each** host in `.dhs/references/hosts.json` (table order), use **per-host confirm** from **Role model maps** (including **Question wording** and **Reply mapping**): prefill each role from that row’s `modelSuggest.<role>` when present; one question per host with the four-role table and optional overrides. Write `agents.roles.<role>.model` as a map keyed by host `id`. Each value must be a non-empty string. Do not translate one host’s model id into another’s.

**`agents.contentLanguage`.** Language of files and tracker text. Ask once. Suggest the conversation language.

**`agents.baseBranch`.** The git branch `.dhs/scripts/` cut task branches from, open PRs against, merge into a task branch on **update**, and return to after the PR is opened. Ask once. Suggested default is `dev`. If the repo already names a default branch, state that inference so the user can object. Without this key, the scripts have no base and must not guess one. Do not write this value into generated agent markdown.

**Project rule (optional).** One question, after models, content language, and base branch. Say what it is: a standing instruction for the agents on this project, beyond the generated framework packs — for example “never edit the legacy billing module”, “PRs always target `develop`”, “tests only through pytest”. Store it on the roles (`rules`; reviewer `checklist` when it is a review constraint). **Skip is the default:** empty is fine. Do not ask for a list or a second rule. If the user already stated such a rule earlier in this conversation, record it and do not ask again.

**Packs.** After detection (below), state which packs you will generate. Honour `packsIgnored` if the user names packs to skip.

Start the live config from `.dhs/references/harness.config.json`. Fill answers. Leave `agents.statuses` at the skeleton defaults unless the user confirmed other strings. Leave `jiraOffer` `null` until the Jira offer. Omit `agents.tracker`. Set `dhs.generatedFrom` to the trimmed contents of `.dhs/VERSION`. Do not put credentials in config.

### 4. Generate from `.dhs/`

Then write `harness.config.json` and generate live files (see **Generation**).

### 5. `AGENTS.md` / `CLAUDE.md`

After writing config and generating files, **always** inspect project-root `AGENTS.md` and `CLAUDE.md`. Every combination is in scope: neither, only `AGENTS.md`, only `CLAUDE.md`, or both. Do not skip a file that exists.

The dhs source is `.dhs/references/AGENTS.md`.

Treat a symlink as the target’s body, read once. If `CLAUDE.md` already links to `AGENTS.md` (or the reverse), that is one existing document, not two. If a named path exists but the symlink is broken, treat that path as missing and use the other file if it exists.

Build the **proposed** `AGENTS.md` in this order; **do not write yet**:

| What exists at project root | Merge input (then always merge with the dhs template) |
|-----------------------------|--------------------------------------------------------|
| Neither | dhs template only |
| Only `AGENTS.md` | that file, then the dhs template |
| Only `CLAUDE.md` | that file, then the dhs template |
| Both (two regular files) | merge `AGENTS.md` with `CLAUDE.md` first (keep project-specific instructions, drop duplicated paragraphs), then merge that with the dhs template |
| Both, already the same via symlink | the single target body, then the dhs template |

Do not replace an existing project file with a raw copy of the template. Show the user the **full** proposed markdown and wait for acceptance. Required on first run in every row, including “neither”. If they reject it, take their edits (one question) and show the body again until they accept.

After acceptance, the **result is always** a regular project-root `AGENTS.md` with the accepted body — even when the project originally had only `CLAUDE.md`.

Then `CLAUDE.md` when the project **originally** had a `.claude/` directory **and/or** a `CLAUDE.md`. If neither was there, do not create `CLAUDE.md`.

| Originally | After the write |
|------------|-----------------|
| No `.claude/`, no `CLAUDE.md` | `AGENTS.md` only |
| No `.claude/`, `CLAUDE.md` existed | `AGENTS.md` plus `CLAUDE.md` |
| `.claude/` present, no `CLAUDE.md` | `AGENTS.md` plus `CLAUDE.md` |
| `.claude/` present, `CLAUDE.md` existed | `AGENTS.md` plus `CLAUDE.md` |

When `CLAUDE.md` is required: prefer a relative file symlink `CLAUDE.md` → `AGENTS.md`. If it is already that symlink, leave it. If it was a regular file, replace it with the symlink (content is already in `AGENTS.md`). Detect the host OS and create the link the way that OS expects (Unix: `ln -s AGENTS.md CLAUDE.md`; Windows: a file symlink such as `mklink CLAUDE.md AGENTS.md` — not a directory junction). **Having `CLAUDE.md` when it is required matters more than the link.** If the symlink cannot be created for any reason, write `CLAUDE.md` as an **independent regular file** with the same accepted body as `AGENTS.md`. Tell the user they are two files because the link failed. Do not stop setup. Do not omit `CLAUDE.md` when `.claude/` was present or when `CLAUDE.md` already existed.

### 6. Jira offer

After writing config and generating files (and after the agents-file step), offer Jira **once**. See **Tracker**. Decline → set `jiraOffer` to `declined`. Do not commit.

---

## Later run

`harness.config.json` is present.

If `.dhs/VERSION` is missing:

```text
BLOCKED: dhs install has not been run here — run dhs install (npx -p dev-harness-layer dhs install or npx -p github:nbmh/dev-harness-layer dhs install), then /dhs-setup again
```

If any role `model` is still a string, or a map is missing a `hosts.json` `id`, finish **Role model maps** first. Do not regenerate live agents until every role has a complete map.

If `.dhs/VERSION` (trimmed) does not equal `dhs.generatedFrom`: regenerate live agents, work skills, and rule packs from `.dhs/` (same copy rules as first run), set `dhs.generatedFrom` to `.dhs/VERSION`, and tell the user the installed package templates changed. That message must name the work-skill rename: `/dhs-feature` was renamed to `/dhs-shipit`; leftover live `dhs-feature` was removed from every `skillsDir`. Do not rewrite `AGENTS.md` or `CLAUDE.md`; mention they may still contain the old name. Then continue below.

**Status migration (once, on a later run).** If `agents.statuses` has the key `code review` and no `implemented` key, the flow changed. Rename it to `implemented` (key and value) in config and tell the user. Do not edit spec files. List every spec under `docs/features/` (or the mapped tracker) whose `status:` is `code review`, and tell the user to set it to `implemented`, or to `in review` if a review is running. `in review` stays valid.

Then **one change at a time**. Show current and new value, wait for confirmation, then write. Do not overwrite keys the user did not confirm.

| Change | Effect |
|--------|--------|
| Role `model` cell `(role, host)` | Rewrite that live agent’s **frontmatter** `model:` only, in **that** host’s `agentsDir`. If the user names a role without a host, ask which host. Do not regenerate the body. Do not rewrite other hosts. |
| `packsIgnored` or detected frameworks | Regenerate rule packs. |
| `agents.baseBranch` | `harness.config.json` only. |
| Statuses, tracker maps, `fetchFields`, content language, product line | Config only. Do **not** regenerate agent bodies. |

- Do not touch `agents.brainstorm` (that is `/dhs-brainstorm`).
- Do not create or rewrite the project PRD.
- Do not remake or re-merge `AGENTS.md`.
- Do not commit.

If `.claude/` is present and `CLAUDE.md` is still missing: create the symlink the same way as on first run; if the link fails, write `CLAUDE.md` as an independent file with the current `AGENTS.md` body. If `CLAUDE.md` already exists as a regular file on a later run, do not overwrite it and do not re-run the first-run merge.

If the user names another config key (model, base branch, …), do that key first, then the tracker offer only when there is still no tracker and the offer was not declined — unless they explicitly asked to add/change/remove Jira, in which case do the tracker path even after a decline.

---

## Tracker (Jira)

First-run offer and every later run. Do not invent a `dhs` CLI for Jira. Call `.dhs/scripts/jira meta` (Jira Cloud REST; not MCP, not raw `curl`) and write config. Switching does **not** migrate old tasks. Token never in chat or git.

Credentials: the user puts the token in a project-local ignored file `harness.credentials.local.json` (`{"jiraToken":"…"}`). `dhs install` already ignores that filename. Never paste the token in chat. Never write a real token into `harness.config.json`.

**Token step (Add and token rotation on Change).** After URL, user, and project key are in `agents.tracker` (write to `harness.config.json` as needed so `jira meta` can run):

1. If `harness.credentials.local.json` is missing at the project root, create it with `{"jiraToken":""}` only. If it exists, do not overwrite an existing token — show the path and ask the user to set or update `jiraToken` locally.
2. Tell the user to paste the token in that file (never in chat). One question: confirm when the token is in the file.
3. Run `.dhs/scripts/jira meta`. On `OK`, briefly confirm the connection and continue. On `BLOCKED:`, show the full `BLOCKED:` line, explain what to fix (token, URL, user, project key, or access), and loop: user fixes → confirm again → `jira meta` until `OK` or they stop.
4. Then fetch mapping data from the successful `meta` output (statuses, issue types, custom fields) and continue mapping below.

**Artifact storage (one question, after meta OK, before status/field mapping).** Default: no or skip → `artifactsOnTrackerOnly: true`. Yes → `false`.

- **EN:** “Should Jira be used only to read task information, with spec, prompt, and log stored independently in files?”
- **PL:** “Czy Jira ma służyć tylko do odczytu informacji o zadaniu, a spec, prompt i logi mają być przechowywane niezależnie w plikach?”

When `artifactsOnTrackerOnly` is `false`, do not ask where spec, prompt, or log live on the issue; leave `fields.spec`, `fields.prompt`, and `fields.log` empty. Still map statuses, issue types, and `fetchFields`. After **yes**, you may state in one sentence that workflow still uses Jira transitions and `jira get` reads file bodies — agents do not call `jira set` for spec/prompt/log.

On **Change**, the user may toggle `artifactsOnTrackerOnly` one at a time. Moving to `true` requires mapping `fields.*` again; moving to `false` drops those mappings. No automatic migration of ticket content into files.

| Intent | What happens |
|--------|----------------|
| **Add** (no tracker yet, user asks or accepts the offer) | Ask URL, user, project key (one question at a time). Write those three keys into `agents.tracker`, then do **Token step**. Then **Artifact storage**. Then, one question at a time, map **each** key `todo`, `inProgress`, `codeReview`, `inReview`, `done` to a Jira status from that project’s real list (numbered), or skip = `null`. Map `blocker` if they use dependencies. If `artifactsOnTrackerOnly` is `true`, map where spec and prompt live (two custom fields, description, or comments) and map log if used. Issue types for `feature` and `bug`. Write `agents.tracker` from `.dhs/references/harness.tracker.json` plus answers (`artifactsOnTrackerOnly`, `statuses`, `issueTypes`, `fields`, `fetchFields` as needed, `url`, `user`, `projectKey`). Agents must not pick a Jira status that is not in this map. Do not compose `curl`. |
| **Change** (tracker already there) | One question: change integration or remove it. Change = same mapping questions for the fields they named, including **Artifact storage** when they ask. If they rotate the token or you need fresh project metadata, run **Token step** and `jira meta` once; do not re-run `meta` for every small mapping edit. |
| **Remove** | Confirm, drop `agents.tracker` from config, delete or clear `harness.credentials.local.json`. Project is files-only again. `jiraOffer` does not block a later **Add**. |

`null` on a tracker status means that step does not transition. There is no file fallback and no invented name.

After a tracker change, write the mapping into `harness.config.json`. Do not regenerate agent markdown for `fetchFields` or the task key pattern.

Decline on first run: `jiraOffer: "declined"`. Do not ask again until a later run **Add** (explicit, or the later-run offer rule above).

---

## Generation

Sources are always `.dhs/`. Live agent bodies must **not** interpolate `agents.baseBranch`, status strings, tracker maps, `fetchFields`, content language, or the product line. Those are read from `harness.config.json` at run time.

Loop **every** object in `.dhs/references/hosts.json` `hosts`. Drive paths from the row (`skillsDir`, `agentsDir`, `rulesDir`, `rulesExt`). Do not hardcode a single host directory. Do not skip a row.

### Live agents

Copy `.dhs/agents/` files into **each** `agentsDir`. **Copies, not symlinks.**

| Source | Live file | Role key |
|--------|-----------|----------|
| `.dhs/agents/architect.md` | `<agentsDir>/architect.md` | `architect` |
| `.dhs/agents/implementer.md` | `<agentsDir>/implementer.md` | `implementer` |
| `.dhs/agents/consultant.md` | `<agentsDir>/consultant.md` | `consultant` |
| `.dhs/agents/reviewer.md` | `<agentsDir>/reviewer.md` | `reviewer` |

Set frontmatter `model:` from `agents.roles.<key>.model[<host.id>]`. If that entry is missing or empty, stop with `BLOCKED: role model missing for host <id> — run /dhs-setup`. Do not copy another host’s model. Leave `name`, `description`, and `tools` as in the template. Hosts that ignore `tools:` still get the field.

When the host `id` is `cursor` and the role is `consultant`, also set `readonly: true`. Do not set `readonly` on architect, implementer, or reviewer.

When the host `id` is `opencode`, set `mode: subagent` on each of the four copies. When the host `id` is `opencode` and the role is `consultant`, also set:

```yaml
permissions:
  - action: edit
    resource: "*"
    effect: deny
```

Do not set those `permissions` on architect, implementer, or reviewer.

Do not add a fifth agent. Do not copy brainstorm templates from `.dhs/brainstorm/` into any `agentsDir`.

On VERSION mismatch regeneration: replace those four live files in **every** `agentsDir` from `.dhs/agents/` and re-apply `model:` from `agents.roles.<key>.model[<host.id>]` (and Cursor `readonly` on consultant, OpenCode `mode: subagent` and consultant `permissions`) from **current** config.

On a confirmed role `model` cell change only: rewrite that one file’s `model:` line in **that** host’s `agentsDir`.

### Work skills

Install writes **only** `/dhs-setup` live (already in every `skillsDir`). This skill generates the rest.

Copy these directories from `.dhs/skills/` to **each** `skillsDir`, if they exist in `.dhs/skills/`:

- `dhs-planit`
- `dhs-doit`
- `dhs-checkit`
- `dhs-shipit`
- `dhs-brainstorm` (when present)

Do **not** overwrite the install-owned `/dhs-setup` skill from this copy step. If a listed template is missing, still copy the others; the copied stub (when present) stops with `BLOCKED:` until a later package fills the body.

In **each** `skillsDir`, if a leftover `dhs-feature` directory exists, delete it. Do not leave it as an alias.

When the host `id` is `cursor`, add frontmatter `disable-model-invocation: true` on each copied work-skill `SKILL.md` (not on `/dhs-setup`). The package templates may omit that field.

### Rule packs

Detect frameworks from the repo. Generate from `.dhs/packs/`. Monorepo: pack only on trees that use it (scope that pack’s `paths:` globs to those trees). Honour `packsIgnored` (skip those pack directory names).

| Pack id (`.dhs/packs/<id>/`) | Detect when |
|------------------------------|-------------|
| `javascript` | JS sources or a JS package without TypeScript as the primary language |
| `typescript` | `tsconfig.json`, TypeScript in the manifest, or `.ts` / `.tsx` |
| `react-native` | `react-native` / Expo in the manifest or RN app config |
| `angular` | `angular.json` or `@angular/core` |
| `nextjs` | `next` in the manifest or `next.config.*` |
| `python` | `pyproject.toml`, `requirements.txt`, `Pipfile`, or `.py` |
| `django` | Django manifest / `manage.py` / Django settings |
| `fastapi` | `fastapi` in the Python manifest or imports |

A tree may match more than one pack (e.g. TypeScript + Next.js). State the set so the user can object.

Write live rules under **each** `rulesDir` as `dhs-<packId>-<basename><rulesExt>`. Same markdown body. Frontmatter from `rulesExt`:

- `.md`: keep `paths:` (YAML list), rewritten for monorepo trees.
- `.mdc`: `description` (short, from the pack title), `globs` from the same path list (comma-separated if the host wants a string), `alwaysApply: false`. Cursor ignores plain `.md` in `.cursor/rules/`.

When the host `id` is `opencode`, after writing that host’s `dhs-*` rule files, merge the glob `.opencode/rules/*.md` into **`.opencode/opencode.json`** (not project-root `opencode.json` / `opencode.jsonc`):

- If `.opencode/opencode.json` is missing, create `{ "instructions": [".opencode/rules/*.md"] }`.
- If it exists, parse JSON. Ensure `instructions` is an array and contains `.opencode/rules/*.md` exactly once. Do not remove other instructions or other keys.
- Invalid JSON in that file: stop with `BLOCKED: invalid JSON at .opencode/opencode.json — fix the file, then /dhs-setup again`.
- Do not edit a project-root `opencode.json` or `opencode.jsonc`. OpenCode combines `instructions` from both configs.
- Uninstall does not remove this glob (setup-owned, like the rule files).

On regenerate: in **each** `rulesDir`, delete existing `dhs-*` files this skill wrote, then write the current filtered set. Do not delete rule files that are not `dhs-` prefixed. Leave the OpenCode `instructions` glob in place.

---

## Do not

- Commit.
- Write credentials, tokens, or secrets into chat, git, or `harness.config.json`.
- Generate live agents, work skills, or rule packs via `dhs install` (install already did its job).
- Repeat first-run PRD / `AGENTS.md` work on a later run.
- Guess `main`, `master`, or the current checkout as `agents.baseBranch`.
- Interpolate runtime config into agent markdown bodies.
- Add CLI subcommands or a global install.
- Use a product name other than `dhs`.
- Ask the user which hosts to write. Write every row in `hosts.json`.
- Copy one host’s role `model` onto another host’s live agent file.
- Invent a Codex or `.agents/` tree in this version.
