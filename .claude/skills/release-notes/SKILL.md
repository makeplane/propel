---
name: release-notes
description: "Generate release notes for a `makeplane/propel` release PR (semver, e.g. `release: vX.Y.Z`) that targets `main`. Reads PR commits, filters out noise, categorizes by conventional-commit type, optionally enriches via Plane MCP, and writes the result as the PR description."
user_invocable: true
---

# Release Notes Generator

Generate structured release notes from a `makeplane/propel` release PR by parsing its commit list, then update the PR description.

## Versioning

propel follows **semver** — the release version is `vX.Y.Z` (major.minor.patch). Versions are managed by [Changesets](https://github.com/changesets/changesets), so the release PR is usually the automated **"Version Packages"** PR that bumps `@makeplane/propel` and targets `main`.

- Read the target version from the PR title (`release: vX.Y.Z`), the Changesets "Version Packages" body, or the bumped `package.json`.
- Release PRs always target **`main`**. Never target a `preview`/`master` branch.
- Never invent a version — always take it from the PR/changeset.

## When to Use

- User links/mentions a propel release PR (e.g. `release: v1.2.0`, or the Changesets "Version Packages" PR) and asks for release notes
- User asks to "create release notes" / "update PR description" for a release PR targeting `main`

## Steps

### 1. Fetch commits

```bash
gh pr view <PR_NUM> --json title,body,baseRefName,headRefName,commits \
  --jq '.commits[] | .messageHeadline + "\n---BODY---\n" + .messageBody + "\n===END==="'
```

For a quick scan first:

```bash
gh pr view <PR_NUM> --json commits \
  --jq '.commits[] | {oid: .oid[0:10], message: .messageHeadline}'
```

### 2. Filter out noise

**Always exclude** these commits — mechanical, not user-facing:

| Pattern                                      | Reason                    |
| -------------------------------------------- | ------------------------- |
| `fix: merge conflicts`                       | Merge artifact            |
| `Merge branch '...' of github.com:...`       | Merge artifact            |
| `Revert "..."` (when immediately re-applied) | Internal churn            |
| `chore: version packages` / Changesets bumps | Release bookkeeping       |

### 3. Parse work item IDs

Most meaningful commits begin with a Plane work item identifier in brackets:

- `[WEB-XXXX]` — web/frontend product items
- `[MOBILE-XXXX]`, `[API-XXXX]`, etc.

Always preserve these IDs in the release notes — they let readers click through to the source ticket.

### 4. (Optional) Enrich via Plane MCP

For larger features where the commit headline is terse, fetch the work item:

```
mcp__plane__retrieve_work_item_by_identifier(project_identifier="WEB", issue_identifier=6874)
```

Use the returned `name` and `description_stripped` to flesh out the bullet. Skip this for routine fixes — commit body is usually enough. Don't enrich every item (slow + work item descriptions are often empty).

### 5. Categorize by conventional-commit type

Three prefixes are **hard mappings** — no interpretation needed:

| Commit prefix                          | Section               |
| -------------------------------------- | --------------------- |
| `fix:`, `fix(scope):`                  | 🐛 Bug Fixes — always |
| `refactor:`, `chore:`, `chore(scope):` | 🔧 Chores — always    |
| `chore(deps):`, dependabot bumps       | 🔧 Chores — always    |

`feat:` is the only prefix that requires judgment. Read the commit title and ask: **is this a true new capability, or an improvement to something that already exists?**

| The commit title reads like…                                                                                                                                        | Section         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| New screen, flow, or capability that did not exist before ("add X", "introduce Y", "implement Z", "support A")                                                      | ✨ New Features |
| Improvement to an existing feature, UI tweak, performance gain, behavioural change, sort order, default value ("improve X", "update Y", "optimise B", "enhanced A") | 🔧 Enhancements |

Commits with no conventional prefix: omit unless they carry a work item ID, in which case apply the same `feat:` judgment above.

### 6. Format

Use the semver version taken from the PR (see **Versioning** above):

```markdown
# Release vX.Y.Z

## ✨ New Features

- - [TICKET-ID] Human-readable description of the new capability
    Optional 1–2 sentence elaboration drawn from the commit body.

🔧 Enhancements

- - [TICKET-ID] Human-readable description of what improved

🐛 Bug Fixes

- - [TICKET-ID] Human-readable description of what was broken and is now fixed

🔧 Chores

- - [TICKET-ID] Human-readable description of the internal change
```

Rules:

- Section header is emoji + space + label — no `#`, no `##`, no bold
- Blank line between the section header and the first bullet, and between sections
- Each bullet starts with `* [TICKET-ID]` — include the work item ID in brackets when the commit has one; rewrite the commit subject into a clear, user-facing sentence (never copy a cryptic commit message verbatim)
- Add a sub-line elaboration (indented 2 spaces) only when the commit body has substance worth surfacing: acceptance criteria, scope notes, or gotchas like "behind feature flag", "requires migration"
- No bold (`**`), no italics, no PR numbers `(#NNNN)` appended to bullets
- Drop empty sections entirely

### 7. Update the PR description

```bash
gh pr edit <PR_NUM> --body "$(cat <<'EOF'
<release notes markdown>
EOF
)"
```

Always use a HEREDOC with single-quoted `'EOF'` so backticks/dollars in the notes are preserved.

## Quick Reference: end-to-end

```bash
PR=42
gh pr view $PR --json commits --jq '.commits[] | .messageHeadline + "\n---\n" + .messageBody + "\n==="' > /tmp/commits.txt
# read /tmp/commits.txt, filter, categorize, draft notes
gh pr edit $PR --body "$(cat <<'EOF'
... release notes ...
EOF
)"
```

## Common Mistakes

- **Including `fix: merge conflicts`** — merge artifact, no functional content
- **Including the Changesets `version packages` bump** — release bookkeeping, not a user-visible change
- **Dropping the work item ID** — readers rely on `[WEB-XXXX]` to navigate to the ticket
- **Over-enriching with MCP lookups** — work item descriptions are often empty; commit body is usually richer
- **Using `--body` without HEREDOC** — backticks/dollar signs get shell-interpreted and corrupt the notes
- **Editing the title** — release PR titles are version markers; only edit the body
- **Inventing or reformatting the version** — propel is semver (`vX.Y.Z`); take the exact version from the PR/changeset

## Release conventions

- Release PRs always target **`main`**
- PR title format: `release: vX.Y.Z` — semver (major.minor.patch), managed by Changesets
- Commits coming from feature branches usually carry a work item ID (e.g. `[WEB-XXXX]`); commits without one are usually infra/chores
