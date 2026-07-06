# @makeplane/propel

Plane's open-source React component library, built on [Base UI](https://base-ui.com) and [Tailwind CSS v4](https://tailwindcss.com).

## Installation

```bash
pnpm add @makeplane/propel
# or
npm install @makeplane/propel
```

Propel has three peer dependencies you install in your app: `react` and
`react-dom` (v18 or v19), and `tailwindcss` (v4). Tailwind v4 targets Safari
16.4+, Chrome 111+, and Firefox 128+.

## Usage

Propel ships its design tokens as Tailwind v4 _source_ CSS. It does **not**
import Tailwind itself, so your app stays in control of its own Tailwind build —
just import propel's styles after Tailwind in your app's entry CSS:

```css
/* app.css */
@import "tailwindcss";
@import "@makeplane/propel/styles";
```

That single import registers propel's tokens **and** registers propel's compiled
components as a Tailwind source, so the utility classes propel uses are generated
automatically — no manual `@source` needed.

Then import each component or hook from its own subpath — there is no root
barrel, so you only ever pull in (and tree-shake to) what you use:

```tsx
import { Button } from "@makeplane/propel/components/button";
import { useDisclosure } from "@makeplane/propel/hooks/use-disclosure";

export function Example() {
  const disclosure = useDisclosure();
  return <Button variant="primary">Click me</Button>;
}
```

| Import pattern                        | Resolves to        |
| ------------------------------------- | ------------------ |
| `@makeplane/propel/components/<name>` | a single component |
| `@makeplane/propel/hooks/<name>`      | a single hook      |

### Styles

| Import                                | Contents                                                  |
| ------------------------------------- | --------------------------------------------------------- |
| `@makeplane/propel/styles`            | Everything — design tokens + animations (`propel.css`)    |
| `@makeplane/propel/styles/variables`  | Design tokens only (`:root` custom properties + `@theme`) |
| `@makeplane/propel/styles/animations` | Keyframes / animation utilities only                      |

The tokens use the Tailwind v4 multi-theme pattern (light/dark/high-contrast via
`[data-theme]`), so theming is driven by a `data-theme` attribute on a host
element.

## Browser support

Propel targets modern evergreen browsers. The baseline is set by Tailwind v4 and
by the color tokens, which use `oklch()` and `color-mix()`:

| Browser     | Minimum |
| ----------- | ------- |
| Chrome/Edge | 111     |
| Firefox     | 128     |
| Safari/iOS  | 16.4    |

Internet Explorer is not supported. The Firefox 128 and Safari/iOS 16.4 floors are
set by Tailwind v4's own baseline (cascade layers and `@property`), not by the color
tokens: `oklch()` and `color-mix()` are actually supported earlier (Firefox 113,
Safari 16.2). Below those floors the Tailwind-generated CSS doesn't apply correctly.

## Development

This package is built with [`vp pack`](https://viteplus.dev/guide/pack) (tsdown).

```bash
vp install          # install workspace dependencies
vp run build        # build the library (JS + .d.ts + CSS) into dist/
vp run dev          # rebuild on change (watch mode)
vp check            # format, lint, type-check
vp test             # run tests
```

- **No root barrel.** Each component lives in `src/components/<name>/index.ts`
  and each hook in `src/hooks/<name>/index.ts`. The build emits one entry per
  folder; static wildcard `exports` (`./components/*`, `./hooks/*`) expose them
  as `@makeplane/propel/components/<name>` / `hooks/<name>` automatically — no
  `exports` edits and no barrel to maintain when you add a folder.
- **Component folders have a public boundary.** `index.tsx` only re-exports the
  public API for that component folder. Public components and public child
  components live in sibling kebab-case files (`button.tsx`,
  `accordion-trigger.tsx`, `table-cell.tsx`). Do not use `Object.assign` or
  namespace-style APIs such as `Foo.Bar`; export `FooBar` as its own component
  instead.
- **Keep shared implementation private and accurately named.** Shared class
  maps, CVA variants, and helpers should live in private sibling files such as
  `*-styles.ts`, `*-shared.tsx`, or a real `*-context.tsx` when React context is
  involved. Do not create public child files that only re-export from a
  monolithic parent file.
- `vp pack` needs at least one component or hook to build (a component library
  with zero entries has nothing to compile).
- Compose classes with [`clsx`](https://github.com/lukeed/clsx) only — **do not
  add `tailwind-merge`**. Component variants should be expressed with stable,
  non-conflicting class sets (e.g. `class-variance-authority`) rather than merged
  at runtime.
- Design tokens live in `src/styles/` and are copied unprocessed into
  `dist/styles/` (they must stay as Tailwind source for the consumer to compile).

## License

[AGPL-3.0-only](./LICENSE) © Plane
