# Propel component operating protocol

`@plane/propel` is a React component library built on Base UI + Tailwind v4. This file is the
**exact** protocol for building and changing components. Follow it literally; when something here
conflicts with an older habit, this wins.

## Tiers — what goes where

Code flows in one direction only: **`base` → `ui` → `components` → `patterns`**. A tier may import
from tiers below it, never above. `internal/` is shared implementation usable by any tier.

| Tier           | Path                     | What it is                                                                                                                                                                                                                                           | May contain                                                                                                             |
| -------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **base**       | `src/base/<name>/`       | Extensions of Base UI — primitives we add where Base UI has a gap (e.g. `BaseTextArea` = `Field.Control` rendering `<textarea>`). Follow Base UI's conventions **exactly**: expose `className`, `style`, `render`, `forwardRef`. Named `Base<Name>`. | unstyled (no cva/Tailwind), but **passes `className`/`style` through** like any Base UI primitive                       |
| **ui**         | `src/ui/<name>/`         | A `base`/Base UI primitive with cva style **baked in**, reduced to a **single** element. Same shape as `base` _minus_ `className`/`style` (the cva owns the styling). All styling lives here.                                                        | one element per part; cva in `variants.ts`; **does not expose `className`/`style`**; `useRender` for intrinsic elements |
| **components** | `src/components/<name>/` | The composition layer: ready-made components that assemble `ui` parts so consumers don't hand-wire them.                                                                                                                                             | composition only — **no cva, no `cx`, no class strings**; **does not expose `className`/`style`**                       |
| **patterns**   | `src/patterns/`          | App-level example compositions (demonstrations), not shipped primitives.                                                                                                                                                                             | composition of `components`/`ui`                                                                                        |
| **internal**   | `src/internal/`          | Private shared implementation: class-string helpers (`node-slot`, `scrollbar`, `surface`), type utils (`variant-props`), internal compositions (`overlay-panel`). Not public API.                                                                    | extracted ONLY on cross-primitive duplication                                                                           |
| **hooks**      | `src/hooks/<name>/`      | Hooks.                                                                                                                                                                                                                                               | —                                                                                                                       |

## `index.tsx` re-exports

- A component-dir `index.tsx` does **`export * from "./<file>"`** for each local public file — never
  a hand-enumerated `export { A, type B } from "./file"`. Every file in a component dir is public;
  if something must NOT be public, it lives in `src/internal` (or stays unexported in `variants.ts`).
- **A file exports only its own symbol(s)** — don't have one file re-export a sibling part (e.g.
  `button.tsx` must not `export { ButtonIcon } from "./button-icon"`); the index stars each file.
- **Never `export *` from `ui` inside a `components` index** — it would re-export the `ui` element
  the components ready-made replaces (name collision). Cross-tier re-exports stay **explicit**.
- **Don't `export *` from `./variants`** — it holds cvas (not public). A part's public variant
  types are re-exported by its own component file (`export type { … } from "./variants"`), which the
  index then stars. Renames (`export { X as Y }`) also stay explicit.

## Hard rules

1. **One element per `ui` part.** A `ui` part renders a single element — a Base UI primitive, a
   `base` primitive, or an intrinsic element via Base UI's `useRender`
   (`useRender({ defaultTagName, render, props: mergeProps(defaults, props) })`, defaults first).
   No `Context.Provider` wrap, no second element/frame, no baked default child (a slot renders
   `{children}`, never `children ?? <Default/>`). If you need more structure, add a NEW named
   `ui` part and compose the parts in `components`.

2. **All composition lives in `components`** (and `patterns`). Providers, multi-element frames,
   defaults, and wiring belong here — never in `ui`.

3. **`cva`/`cx` live only in `ui`; `className`/`style` exposure stops at `base`.** `base` follows
   Base UI exactly and **exposes `className`/`style`** (it is unstyled — `ui` is what styles it).
   `ui` and `components` do **not** expose `className`/`style`: `ui` bakes its styling into a cva
   (the cva owns the class), `components` only composes. The `components` tier holds no class
   strings, no `cx`, no cva — a styling need there means a missing `ui` part, so add the `ui` part.

4. **No cross-component coupling.** A component derives its props and styling from its **own** cva
   — never from another component's `Props`, variant types, or cva. (Wrong: `IconButtonProps =
Omit<ButtonProps, …>`, or `iconButtonVariants` calling `buttonVariants()`.) If two primitives
   share chrome, extract the shared cva/helper to `internal/` and have both depend on _that_.

5. **No `Root` suffix.** `Root` is a Base UI idiom propel does not use. The styled root element of
   an anatomy is named after the part itself (`ui` `IconButton`, not `IconButtonRoot`); sibling
   anatomy parts are `IconButtonIcon`, `IconButtonSpinner`, etc. When a `components` ready-made
   composes the same-named `ui` part, alias the import descriptively (e.g.
   `import { IconButton as IconButtonElement }`) — never `as IconButtonRoot`.

6. **Name after the Base UI primitive; no synonyms.** `Menu` not `Dropdown`; `ScrollArea` not
   `Scroller`. One Base-UI-named API per concept.

6a. **`ui` mirrors Base UI's anatomy.** Expose the same parts and roles Base UI defines, flattened
from its dot-namespace to standalone exports: `Accordion.Root` → `Accordion`, `Accordion.Item`
→ `AccordionItem`, `Accordion.Trigger` → `AccordionTrigger`, `Accordion.Panel` →
`AccordionPanel`. Don't invent a decomposition Base UI doesn't have, and don't collapse parts
it separates. You MAY add extra named parts for a region Base UI bundles into one element but
that needs its own styled element (e.g. `AccordionTriggerIndicator`), named for the region;
those extra parts are composed in `components`. (Base UI ships no primitive? Add the missing
anatomy in `base` first, following Base UI conventions, then style it in `ui`.)

7. **React context is a `components` concern — definition, provider, AND consumption.** A `ui`
   part never calls `useContext`; it takes the shared value (`variant`/`magnitude`/`density`/…) as
   a **prop**. The context's `createContext` + `Provider` + the `useContext` read all live in
   `components`; the consuming `components` part reads the context and passes the value down,
   omitting it from its own public API. (The value _type_ may stay in `ui`, derived from the cva.)

7a. **Don't destructure props you don't use.** Spread `{...props}` straight through to the
element; pull a prop out of the signature only to transform, redirect, or omit it. Never peel
`children` out just to render it back (`function X({ children, ...props }) { return <E {...props}>{children}</E> }`)
— let it flow through the spread (`function X(props) { return <E {...props} /> }`); Base UI
primitives and intrinsic elements render their own `children`. Only destructure `children` when
you actually wrap or transform it.

## Variants & variant-prop types

8. **One cva per `ui` part, in `ui/<name>/variants.ts`, named `<camelCasePartName>Variants`.**
   `Menu` → `menuVariants`, `IconButton` → `iconButtonVariants`, `AccordionTriggerTitle` →
   `accordionTriggerTitleVariants`. No generic names (`rootVariants`, `groupVariants`, …).

9. **Variant-prop types are derived and exported from `variants.ts`** (never inline in the
   component file, never hand-assembled in the component). Per cva:

   ```ts
   import { cva, cx, type VariantProps } from "class-variance-authority";
   import { type StrictVariantProps } from "../../internal/variant-props";

   export const iconButtonVariants = cva(/* … */);

   // per-axis types (for consumers), derived from the cva:
   type IconButtonVariantConfig = VariantProps<typeof iconButtonVariants>;
   export type IconButtonVariant = NonNullable<IconButtonVariantConfig["variant"]>;
   export type IconButtonTone = NonNullable<IconButtonVariantConfig["tone"]>;

   // the props type used by the component:
   export type IconButtonVariantProps = StrictVariantProps<typeof iconButtonVariants>;
   ```

10. **The component's `Props` use `<Name>VariantProps` directly — no hand-built "own props".**

    ```ts
    export type IconButtonProps = Omit<BaseButton.Props, "className" | "style"> &
      IconButtonVariantProps;
    ```

11. **A variant axis is optional iff it has a default.** `StrictVariantProps` (`internal/variant-props.ts`)
    makes every axis **required + non-null** unless the cva configures a default for it, in which
    case it is optional. This makes impossible states unrepresentable: you can never omit an axis
    that has no fallback.

12. **No `defaultVariants` today → every axis is required.** We have not settled which axes get
    sensible defaults, so no cva defines `defaultVariants` and every variant prop is required at
    the call site. The helper is forward-looking: when a default is later added, declare it as
    `const <name>DefaultVariants = { … } as const`, pass `defaultVariants: <name>DefaultVariants`
    to the cva, and pass `keyof typeof <name>DefaultVariants` as the second arg to
    `StrictVariantProps` — that axis then becomes optional automatically.

    ```ts
    export type ButtonVariantProps = StrictVariantProps<
      typeof buttonVariants,
      keyof typeof buttonDefaultVariants // omit entirely while there are no defaults
    >;
    ```

13. **Any real default, when introduced, is a `components` concern**, not `ui` — the ready-made
    resolves the effective value (from context or its own fallback) and passes it to the `ui`
    primitive, which itself has no default.

## Before you commit

- [ ] Every touched `ui` part renders one element; no `className` prop anywhere.
- [ ] cva only in `ui/.../variants.ts`, named after the part, no `Root`, no generic names.
- [ ] Variant types via `StrictVariantProps` in `variants.ts`; `Props = Omit<Base.Props, "className" | "style"> & <Name>VariantProps`.
- [ ] No borrowing of another component's `Props`/cva/variant types; shared styling lives in `internal/`.
- [ ] No `defaultVariants` (every axis required) unless a real default is intentionally introduced.
- [ ] Context (if any) defined + provided + consumed in `components`; `ui` is prop-driven.
- [ ] Run a **full** `vp check --fix` (not scoped, not `--no-fmt`) and `vp test` — both green — before pushing.
