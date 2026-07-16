# Toolchain: pnpm + Turborepo

This monorepo uses [pnpm](https://pnpm.io) (workspaces + catalog) for package
management and [Turborepo](https://turborepo.com) to orchestrate tasks. The
underlying tools run standalone: [tsdown](https://tsdown.dev) for library builds,
[Vitest](https://vitest.dev) for tests, and [Oxlint](https://oxc.rs) + [Oxfmt](https://oxc.rs)
for linting and formatting. Config lives in `turbo.json`, `.oxlintrc.json`,
`.oxfmtrc.json`, and per-package `tsdown.config.ts` / `vitest.config.ts`.

## Review Checklist

- [ ] Run `pnpm install` after pulling remote changes and before getting started.
- [ ] Run `pnpm check` (check:format + check:lint + check:types) and `pnpm test`
      before pushing. Use `pnpm fix` to auto-fix formatting + lint.
- [ ] Scripts follow a `check:*` / `fix:*` convention (`check:lint`, `check:format`,
      `check:types`; `fix:lint`, `fix:format`), each a Turbo task defined in `turbo.json`
      and per-package `package.json`. Run one package with
      `pnpm exec turbo run <task> --filter=<package>`.
- [ ] A pre-commit hook (simple-git-hooks + lint-staged) auto-formats staged files with
      Oxfmt. Skip it for a commit with `SKIP_SIMPLE_GIT_HOOKS=1`.
