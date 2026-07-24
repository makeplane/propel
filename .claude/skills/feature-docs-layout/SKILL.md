---
name: feature-docs-layout
description: Use when saving or creating any design, spec, brainstorming, or implementation-plan markdown doc in this repo — including docs produced by the superpowers brainstorming/writing-plans skills, or any time you are about to choose a path under docs/ (especially docs/superpowers/) or decide where feature documentation lives.
user_invocable: true
---

# Feature Docs Layout

## Overview

Every planning, design, and implementation document for a feature is the **system of record** for how that feature was built. Keep them together in ONE per-feature directory:

```
docs/<feature-slug>/<doc>.md
```

**Never** write to `docs/superpowers/` and **never** date-prefix filenames.

## The Rule

- `<feature-slug>` — kebab-case, descriptive, stable (e.g. `bulk-work-item-archive`). No dates, no `superpowers`.
- All docs for one feature live in the same folder, side by side.

## Quick Reference

| Doc                                        | Path                                        |
| ------------------------------------------ | ------------------------------------------- |
| Design / spec (from brainstorming)         | `docs/<feature-slug>/design.md`             |
| Implementation plan (from writing-plans)   | `docs/<feature-slug>/plan.md`               |
| Anything else (research, decisions, notes) | `docs/<feature-slug>/<descriptive-name>.md` |

## Picking the slug

1. If `docs/<feature-slug>/` already exists for this feature, **reuse it** — add your doc there, don't make a new folder.
2. Otherwise derive a kebab-case slug from the feature name; match the branch slug if one exists (see `branch-name`).

## Overriding superpowers (important)

The superpowers `brainstorming` and `writing-plans` skills default to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` and `docs/superpowers/plans/YYYY-MM-DD-<feature>.md`. **Both skills explicitly state that user preferences for the doc location override this default. This skill is that preference.** So when following them:

- design / spec → `docs/<feature-slug>/design.md`
- plan → `docs/<feature-slug>/plan.md`

Do not create `docs/superpowers/`. If you find docs already there, move them into `docs/<feature-slug>/` (precedent: PR #7684).

## Common Mistakes

| Mistake                                                    | Fix                       |
| ---------------------------------------------------------- | ------------------------- |
| `docs/superpowers/specs/2026-06-12-foo-design.md`          | `docs/foo/design.md`      |
| `docs/superpowers/plans/2026-06-12-foo.md`                 | `docs/foo/plan.md`        |
| `docs/2026-06-12-foo-design.md` (date prefix at top level) | `docs/foo/design.md`      |
| Design and plan in different top-level folders             | Both under `docs/foo/`    |
| New folder when `docs/foo/` already exists                 | Reuse the existing folder |

## Examples (existing in this repo)

`docs/permissions/`, `docs/data-layer/`, `docs/work-item-types/`, `docs/pi-prediction-entity-abstraction/design.md`, `docs/rich-text-external-endpoints/plan.md`.
