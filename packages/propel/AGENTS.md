# Propel component operating protocol

`@makeplane/propel` is a React component library built on Base UI + Tailwind v4. This file is the
**exact** protocol for building and changing components. Follow it literally; when something here
conflicts with an older habit, this wins.

## Tiers — what goes where

Code flows in one direction only: **`base` → `elements` → `components` → `patterns`**. A tier may import
from tiers below it, never above. `internal/` is shared implementation usable by any tier.

| Tier           | Path                     | What it is                                                                                                                                                                                                                                                                                                                                         | May contain                                                                                                                    |
| -------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **base**       | `src/base/<name>/`       | Extensions of Base UI — primitives we add where Base UI has a gap (e.g. `BaseTextArea` = `Field.Control` rendering `<textarea>`). Follow Base UI's conventions **exactly**: expose `className`, `style`, `render`, `forwardRef`. Named `Base<Name>`.                                                                                               | unstyled (no cva/Tailwind), but **passes `className`/`style` through** like any Base UI primitive                              |
| **elements**   | `src/elements/<name>/`   | A **styled intrinsic element**: one element via `useRender` with a cva baked in. **Base-UI-agnostic** — imports nothing from Base UI but `useRender`/`mergeProps`, and never wraps a Base UI or `base` primitive; the behavior grafts onto it in `components` via `render`. All styling lives here.                                                | one element per part via `useRender`; cva in `variants.ts`; **no `className`/`style`**; **no Base UI/`base` primitive import** |
| **components** | `src/components/<name>/` | The composition **and behavior** layer: grafts Base UI (and `base`) behavior onto `elements` styled elements via `render`, and owns every Root, provider, portal, context, and default — assembling `elements` parts so consumers don't hand-wire them.                                                                                            | composition + grafts only — **no cva, no `cx`, no class strings**; **no `className`/`style`**                                  |
| **patterns**   | `src/patterns/`          | App-level example compositions (demonstrations), not shipped primitives.                                                                                                                                                                                                                                                                           | composition of `components` only                                                                                               |
| **internal**   | `src/internal/`          | Private shared implementation: shared **styled `useRender` primitives** (deduped elements — e.g. `positioner`, `backdrop`, `arrow`), class-string helpers (`node-slot`, `scrollbar`, `surface`, `field-control-surface`, `control-group`, `control-input`), type utils (`variant-props`), internal compositions (`overlay-panel`). Not public API. | extracted on cross-family duplication (rule of 3)                                                                              |
| **hooks**      | `src/hooks/<name>/`      | Hooks.                                                                                                                                                                                                                                                                                                                                             | —                                                                                                                              |

## `index.tsx` re-exports

- A component-dir `index.tsx` does **`export * from "./<file>"`** for each local public file — never
  a hand-enumerated `export { A, type B } from "./file"`. Every file in a component dir is public;
  if something must NOT be public, it lives in `src/internal` (or stays unexported in `variants.ts`).
  Two blessed private exceptions the index deliberately does not export: a family's React context
  module (`<name>-context.ts`, rule 7) and an intra-family shared composition marked by a `.shared`
  suffix (`menu-content.shared.tsx`). Anything else unexported is a bug — either export it or move
  it.
- **A file exports only its own symbol(s)** — don't have one file re-export a sibling part (e.g.
  `button.tsx` must not `export { ButtonIcon } from "./button-icon"`); the index stars each file.
- **Never `export *` from `elements` inside a `components` index** — it would re-export the `elements` element
  the components ready-made replaces (name collision). Cross-tier re-exports stay **explicit**.
- **Don't `export *` from `./variants`** — it holds cvas and the `<Name>VariantProps` cva-props
  bundle, which stay **private**: a part imports `<Name>VariantProps` for its own `Props` (rule 10)
  but **never re-exports it**, and a cva is **never** re-exported (not by the part, not by the index,
  not across tiers). Only the **per-axis** types (`<Name>Magnitude`, `<Name>Tone`, …) are public —
  re-exported by the part's component file (`export type { <Name>Magnitude } from "./variants"`),
  which the index then stars. Renames (`export { X as Y }`) also stay explicit.

## Hard rules

1. **One element per `elements` part, via `useRender`.** An `elements` part renders exactly one **intrinsic**
   element through Base UI's `useRender`
   (`useRender({ defaultTagName, render, props: mergeProps(defaults, props) })`, defaults first),
   with its cva baked into `className`. It imports **nothing** from `@base-ui/react` except
   `useRender`/`mergeProps` — never a Base UI primitive, never a `base` primitive (rule 1a). No
   `Context.Provider` wrap, no second element/frame, no baked default child (a slot renders
   `{children}`, never `children ?? <Default/>`), and no authored `render={<X/>}` that injects
   another component/behavior — forwarding the consumer's own `render` (the `useRender` mechanism)
   IS the render-capability and is fine; baking a specific render target is composition. If you
   need more structure, add a NEW named `elements` part and compose the parts in `components`.

1a. **`elements` holds no behavior — the Base UI primitive grafts onto it in `components`.** An `elements` part
is a _styled element_, not a Base UI part; it never imports `@base-ui/react/<primitive>`. Every
Base UI behavior is wired in `components` (or a story, rule 2b) by grafting the Base UI part onto
the styled `elements` element via `render`, **behavior part outer, styled part as the render target** —
whether the primitive the part visually _is_ (`Autocomplete.Input`, `Dialog.Popup`), a foreign
primitive it merely _controls_ (`Collapsible.Trigger` under a list section, a menubar item that
opens a `Menu`), or a consumer-supplied control (`Clear`/`Trigger` as node props):

```tsx
<BaseAutocomplete.Input render={<AutocompleteInput magnitude="md" />} placeholder={…} />
<BaseDialog.Popup render={<DialogPopup />}>…</BaseDialog.Popup>
<BaseCollapsible.Trigger render={<ListSectionTrigger />}>…</BaseCollapsible.Trigger>
<BaseAutocomplete.Clear render={iconButton} />
```

The styled part is the element that actually renders, so its cva `className` applies; the Base UI
part contributes only behavior, props, and `data-*` state. Behavior-part-outer (styled part as the
render target) is also what keeps managed-visibility affordances a11y-correct: when Base UI
hides+unfocuses a `Clear`/`Trigger`, that state lands on the real rendered control, so a focusable
node is never left `aria-hidden`. **An `elements` part exists for every styled DOM element in the anatomy
— and only those:** a role that renders no element (`Root` context, `Portal`, `Provider`) has no
`elements` part and lives in `components`, using Base UI directly. (A `Root` that _does_ render a styled
container — `Accordion.Root`'s `<div>` — keeps its `elements` styled element, named per rule 5, with the
behavior grafted in `components`.)

2. **All composition AND behavior lives in `components`** (and `patterns`). The Base UI behavior
   grafts (rule 1a), Roots, portals, providers, multi-element frames, context, defaults, and wiring
   belong here — never in `elements`. An `elements` dir holds only styled elements and its `variants.ts`.

2a. **Icons (`lucide-react`) are a `components` concern.** An `elements` part is icon-agnostic: it never
imports `lucide-react`, rendering an icon as `{children}` (a slot) and sizing it through its cva
(`[&>svg]:size-4`). The ready-made `components` part supplies the default icon —
`{props.children ?? <Icon aria-hidden />}` (defaults belong in `components`, rule 2; the icon
carries no `className`, so its size comes from the `elements` cva). `lucide-react` may be imported
**only** in `components` source and in stories — never in `elements`, `base`, or `internal` source.

2b. **`elements` stories are pure UI-configuration showcases; behavior stories live in
`components`.** An `elements` story renders the styled parts DIRECTLY — every visual axis
(`magnitude`/`tone`/…) and every visual state, the states pinned statically via the `data-*`/aria
attributes Base UI would set (`data-pressed=""`, `data-highlighted=""`, `data-panel-open=""`,
`data-invalid=""`, `aria-current="page"`, …). It imports **nothing** from `@base-ui/react` and
never from `components`, and it carries **no behavior `play` tests** (a hidden CSS canary asserting
compiled styling is fine) — grafting, keyboard, and aria behavior are demonstrated AND tested in
the family's `components` story. A `base` story is the exception: `base` parts ARE behavior, so
their stories exercise it in-tier.

2c. **A story that needs hooks uses the named-function render pattern.** Hooks belong in a render
that is itself a component — write
`render: function Render(args) { const [x, setX] = React.useState(…); return …; }` directly on the
story. Never hoist a local example component above the meta and render `<SomeExample />` (it hides
the composition from the Docs "Show code" panel), and never call hooks from an arrow render.

3. **`cva`/`cx` live only in `elements`; `className`/`style` exposure stops at `base`.** `base` follows
   Base UI exactly and **exposes `className`/`style`** (it is unstyled — `elements` is what styles it).
   `elements` and `components` do **not** expose `className`/`style`: `elements` bakes its styling into a cva
   (the cva owns the class), `components` only composes. The `components` tier holds no class
   strings, no `cx`, no cva — a styling need there means a missing `elements` part, so add the `elements` part.

4. **No cross-component coupling.** A component derives its props and styling from its **own** cva
   — never from another component's `Props`, variant types, or cva. (Wrong: `IconButtonProps =
Omit<ButtonProps, …>`, or `iconButtonVariants` calling `buttonVariants()`.) If two primitives
   share chrome, extract the shared cva/helper to `internal/` and have both depend on _that_.

4a. **Dedupe identical styled elements into a shared `internal/` primitive.** An `elements` part is now a
Base-UI-agnostic styled element, so families that render the _same_ styled element (byte-identical
cva) must not each keep their own copy. When ≥3 families would repeat an element — the overlay
`Positioner`, `Backdrop`, `Arrow`, a menu-style `Separator` — extract ONE shared styled `useRender`
primitive to `internal/<element>` and graft it per-family in `components`
(`<BaseMenu.Positioner render={<Positioner />}>`); the family does not keep or re-export its own.
Keep `elements` lean — a family gets its OWN `elements` part only for an element it styles _distinctly_. (Rule
of 3: two occurrences can wait, the third extracts. Divergent styling stays per-family.)

5. **No `Root` suffix.** `Root` is a Base UI idiom propel does not use. The styled root element of
   an anatomy is named after the part itself (`elements` `IconButton`, not `IconButtonRoot`); sibling
   anatomy parts are `IconButtonIcon`, `IconButtonSpinner`, etc. When a `components` ready-made
   composes the same-named `elements` part, alias the import descriptively (e.g.
   `import { IconButton as IconButtonElement }`) — never `as IconButtonRoot`.

6. **Name after the Base UI primitive; no synonyms.** `Menu` not `Dropdown`; `ScrollArea` not
   `Scroller`. One Base-UI-named API per concept.

6a. **`elements` mirrors Base UI's _styled_ anatomy.** Expose the same styled parts and roles Base UI defines, flattened
from its dot-namespace to standalone exports: `Accordion.Root` → `Accordion`, `Accordion.Item`
→ `AccordionItem`, `Accordion.Trigger` → `AccordionTrigger`, `Accordion.Panel` →
`AccordionPanel`. Don't invent a decomposition Base UI doesn't have, and don't collapse parts
it separates. You MAY add extra named parts for a region Base UI bundles into one element but
that needs its own styled element (e.g. `AccordionTriggerIndicator`), named for the region;
those extra parts are composed in `components`. (Base UI ships no primitive? Add the missing
anatomy in `base` first, following Base UI conventions, then style it in `elements`.) Behavior-only roles
that render no element (`Root` context, `Portal`, `Provider`) are not `elements` parts (rule 1a) — they
live in `components`, keeping their flattened Base-UI name (`Autocomplete`, not `AutocompleteRoot`).
An identical styled element shared across families is a single `internal/` primitive, so the family
does not re-export it (rule 4a).

6b. **Custom prop names never reuse a native HTML/CSS attribute name.** `width`, `height`, `size`,
`type`, `color` are off-limits as style/layout props — an `elements` part is render-capable, so the name
would collide with the element's own attribute (and confuse readers). Use the controlled axis
vocabulary instead: `variant`, `tone`, `magnitude`, `emphasis`, `surface`, `density`, `elevation`,
`orientation`, `sizing`. (Full-width-vs-hug is `sizing: "hug" | "fill"` — mirroring Figma's resize —
not `width`.) Genuine native attributes (`type`, `disabled`, `href`, `aria-*`) pass through untouched.

6c. **`variant` is a smell — name the real axis, and split when values are different elements.**
A prop named `variant` is almost always too vague: the values express a specific concept
(`prominence`, `appearance`, `mode`, `layout`, `placement`) — name _that_. If the values would
render a **different element or semantics** (e.g. `<button>` vs `<a>`), or carry an axis that only
applies to one value, that's not a variant — it's a **separate component**. Separate **element**
(semantics) from **appearance** (look) — the full button/link 2×2 is `Button` (`<button>`+chrome),
`Anchor` (`<a>`+link text), and the two crosses `AnchorButton` (`<a>`+chrome — a nav link that looks
like a button) and `ButtonAnchor` (`<button>`+link text — an action that looks like a link); never a
`link` value on a button.
A value that's a content condition should be **derived**, not a prop; a capability should be a
**boolean**. (Shared appearance across the split lives in `internal/`, e.g. `control-chrome`.)

6d. **Part-of → prefix; specialization → `<qualifier><visual-family>` (the family it presents as is
the SUFFIX).** This one is error-prone — apply it literally:

- A part _of_ a component takes the component as a **prefix**: `ButtonIcon`, `ButtonLabel`,
  `AccordionTrigger`, `MenuItem` (mirrors Base UI anatomy, 6a).
- A standalone component is named **`<qualifier><family>`** where the **suffix = the visual family it
  presents as** (what it _looks like_) and the **prefix = a distinguishing content trait**
  (`IconButton` = icon-only Button, `AnchorButton` = link-styled Button).

**The element is NOT part of the name — it is a `render` concern.** Everything interactive here is
a Base UI `Button` graft; ONE component exists per LOOK, defaulting to `<button>`, and real
navigation renders an `<a>` through the same API (`nativeButton={false}` +
`render={<a href=… />}`):

| Look                    | Component                             | As a nav link                         |
| ----------------------- | ------------------------------------- | ------------------------------------- |
| button chrome           | `Button`                              | `nativeButton={false} render={<a />}` |
| icon-only button chrome | `IconButton`                          | same                                  |
| inline text-link look   | `AnchorButton` (a link-styled Button) | same                                  |

There is no `Anchor`, no `ButtonAnchor`, and no per-element twin family — those were collapsed
(2026-07): the old `<a>`-element variants are the `render` form of the look-named component. A
specialization still has its own parts, prefixed with its full name (`AnchorButtonLabel` if one
existed).

6e. **Slot parts use Base UI's suffix vocabulary — `Icon`, `Indicator`, `Group`, `Spinner`; never
`Slot` or `Node`.** Name the part for its slot _usage_, the way Base UI does:

- **`<Part>Icon`** — a decorative single-glyph slot. Bakes `aria-hidden` and sizes its child via
  the shared `nodeSlotClass` + inherited `--node-size` (`internal/node-slot`) — never an ad-hoc
  `[&>svg]:size-*`. A family gets its OWN icon part only for genuinely distinct styling (toast/
  banner/alert-dialog tones, avatar's scale, autocomplete/combobox focus-brightening); an icon slot
  that is only a tint/size of the shared chrome is the internal `Icon` (`tint`/`magnitude` axes,
  defaulting to `inherit`), composed by the `components` ready-made — icon-shaped controls
  (`IconButton`, `Toggle`, `ToolbarButton`, `ToolbarToggle`) wrap their bare svg children in it
  themselves, so consumers pass a bare glyph.
- **`<Part>Indicator`** — a state-reflecting part. Keep Base UI's own names where they exist
  (`ItemIndicator` for a selected marker, `Tabs`/`Progress`/`Meter`/`Slider` `Indicator` for
  geometry). Disclosure carets are ONE internal `DisclosureIndicator` (pass a **chevron-down**;
  `motion: disclose | pointEnd | flip`, `tint`, `magnitude`) composed at the trigger — the trigger
  part carries `group` and the caret reads `data-panel-open`/`data-popup-open`. Only carets with
  family-specific state selectors keep their own part (`TableCellTriggerIndicator`).
- **`<Part>Spinner`** — pending-state glyphs are the internal `Spinner` unless a family styles its
  own (`PaginationSpinner`).
- **`<Part>Group`** — a wrapper element holding consumer-provided node(s) or controls
  (`ToastActionGroup`, `ToastCloseGroup`, `ComboboxInputGroup`). Never `aria-hidden` (its content
  may be interactive or meaningful).

A wrapper whose styling is _exactly_ `nodeSlotClass` (no positioning, tint, or size of its own) is
not a part at all — compose the internal `NodeSlot` in `components` instead (`Tab`, `TableCell`).
Consumer-provided node **props** follow the same convention: name the prop for the slot it fills,
Base UI style (`placeholder`, `title`, `description`), never a `Node` suffix — `icon` fills the
family's single `Icon` slot; `startIcon`/`endIcon` fill dual `Icon` slots (bare `start`/`end` is
the logical-direction vocabulary, like Drawer's `side`); `trailing` fills `MenuItemTrailing`;
`meta` fills `MenuLabelMeta`; a consumer-provided control is named for its role (`decrement`,
`increment`).

7. **React context is a `components` concern — definition, provider, AND consumption.** An `elements`
   part never calls `useContext`; it takes the shared value (`variant`/`magnitude`/`density`/…) as
   a **prop**. The context's `createContext` + `Provider` + the `useContext` read all live in
   `components`; the consuming `components` part reads the context and passes the value down,
   omitting it from its own public API. (The value _type_ may stay in `elements`, derived from the cva.)

7a. **Don't destructure props you don't use.** Spread `{...props}` straight through to the
element; pull a prop out of the signature only to transform, redirect, or omit it. Never peel
`children` out just to render it back (`function X({ children, ...props }) { return <E {...props}>{children}</E> }`)
— let it flow through the spread (`function X(props) { return <E {...props} /> }`); Base UI
primitives and intrinsic elements render their own `children`. Only destructure `children` when
you actually wrap or transform it.

## Prop vocabulary

Every styling/layout prop names the **concept** it controls — one name system-wide, with consistent
value spellings. Pick only the axes that apply to a component. Two naming bans from the Hard rules
govern this: `variant` is too vague (6c), and native HTML/CSS attribute names are off-limits (6b).

| Axis           | Controls                                    | Example values                       |
| -------------- | ------------------------------------------- | ------------------------------------ |
| `tone`         | semantic **and** decorative color           | `neutral·danger·success·info` + hues |
| `prominence`   | visual **weight / hierarchy**               | `primary·secondary·tertiary·ghost`   |
| `magnitude`    | **size**                                    | `sm·md·lg` / `2xs…3xl`               |
| `sizing`       | **hug vs fill** the container               | `hug·fill`                           |
| `emphasis`     | **fill treatment** (reserved; unused today) | `soft·outline·solid`                 |
| `appearance`   | distinct visual **style** of one component  | Tabs `contained·underline`           |
| `layout`       | **arrangement** of contents                 | FormActions `inline·stretch`         |
| `placement`    | **where** it sits / its context             | Banner `page·inline`                 |
| `presentation` | **shape** of a repeated entry               | NavigationMenuLink `item·card`       |
| `mode`         | **behavior mode** of one component          | Table `table·spreadsheet`            |
| `surface`      | host background it adapts to                | `background·fill`                    |
| `density`      | compactness                                 | `comfortable·compact`                |
| `elevation`    | draws its own raised surface vs flat        | `raised·flat`                        |
| `orientation`  | layout axis                                 | `horizontal·vertical`                |
| `side`         | which edge a panel attaches to              | Drawer `start·end`                   |
| `visibility`   | when a transient affordance shows           | ScrollArea `auto·always`             |

**Why these names — decided on merit, not on what already shipped:**

1. **Name the concept, never `variant`.** The values always express a specific axis; name _that_ (6c).
2. **Orthogonal dimensions are separate props.** A button carries both `prominence` (weight) and
   `tone` (color) because they vary independently — a `secondary` × `danger` button is valid. Never
   fuse two independent dimensions into one prop (that was Button's old `variant`).
3. **Match the name to the value's _shape_.** `prominence` beats `priority` for
   `primary/secondary/tertiary/ghost` because `ghost` is the _floor of a weight scale_, not a priority
   rank. `tone` beats `intent`/`status` for color because it must also cover purely _decorative_ hues
   (an `orange` avatar has no "intent"). `emphasis` is a _degree_ (soft↔solid), so it is wrong for
   _ranks_ — and weight is `prominence`, not `emphasis`.
4. **No native attribute names** (6b): `magnitude` not `size`, `sizing` not `width`, `tone` not `color`/`type`.
5. **A content condition is _derived_, not a prop.** A menu row's layout follows from whether a
   `description` was passed — the `components` ready-made derives it and omits it from its API.
6. **A capability is a _boolean_**, not a two-value enum (`TableHead` `sortable`, not `variant: default·sortable`).
7. **Different element/semantics → a different component**, not a variant value: `<button>` vs `<a>`
   (`Button`/`AnchorButton`/`ButtonAnchor`/`Anchor`), a bar vs a ring (`LinearProgress`/`CircularProgress`). Same
   anatomy differing only in chrome stays one component with an axis (`placement`, `presentation`, `mode`).

## Variants & variant-prop types

8. **One cva per `elements` part, in `elements/<name>/variants.ts`, named `<camelCasePartName>Variants`.**
   `Menu` → `menuVariants`, `IconButton` → `iconButtonVariants`, `AccordionTriggerTitle` →
   `accordionTriggerTitleVariants`. No generic names (`rootVariants`, `groupVariants`, …).

9. **Variant-prop types are derived and exported from `variants.ts`** (never inline in the
   component file, never hand-assembled in the component). Per cva:

   ```ts
   import { cva, cx, type VariantProps } from "class-variance-authority";
   import { type StrictVariantProps } from "../../internal/variant-props";

   export const iconButtonVariants = cva(/* … */);

   // per-axis types (for consumers) are named for the AXIS, never `<Name>Variant`:
   type IconButtonVariantConfig = VariantProps<typeof iconButtonVariants>;
   export type IconButtonProminence = NonNullable<IconButtonVariantConfig["prominence"]>;
   export type IconButtonTone = NonNullable<IconButtonVariantConfig["tone"]>;

   // the cva-props type keeps the `VariantProps` suffix — it is named after cva's `VariantProps`
   // utility, NOT after any axis, so it stays `<Name>VariantProps` even when no axis is `variant`:
   export type IconButtonVariantProps = StrictVariantProps<typeof iconButtonVariants>;
   ```

10. **The component's `Props` use `<Name>VariantProps` directly — no hand-built "own props".**

    ```ts
    export type IconButtonProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
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

13. **Any real default, when introduced, is a `components` concern**, not `elements` — the ready-made
    resolves the effective value (from context or its own fallback) and passes it to the `elements`
    primitive, which itself has no default.

## Before you commit

- [ ] Every `elements` part renders one intrinsic element via `useRender`; imports nothing from `@base-ui/react` but `useRender`/`mergeProps`; no `className` prop anywhere.
- [ ] No `elements` part imports a Base UI or `base` primitive — all behavior is grafted in `components` via `render` (behavior part outer, styled part as render target); behavior-only roles (`Root`/`Portal`/`Provider`) live in `components` (rules 1a, 2).
- [ ] Identical styled elements across ≥3 families are one shared `internal/` primitive, not per-family copies (rule 4a).
- [ ] cva only in `elements/.../variants.ts`, named after the part, no `Root`, no generic names.
- [ ] Props use the axis vocabulary — no `variant`, no native attribute names (`size`/`width`/`type`/`color`); per-axis types named for the axis, cva-props type stays `<Name>VariantProps`.
- [ ] Variant types via `StrictVariantProps` in `variants.ts`; `Props = Omit<useRender.ComponentProps<"tag">, "className" | "style"> & <Name>VariantProps`.
- [ ] No borrowing of another component's `Props`/cva/variant types; shared styling lives in `internal/`.
- [ ] No `defaultVariants` (every axis required) unless a real default is intentionally introduced.
- [ ] Context (if any) defined + provided + consumed in `components`; `elements` is prop-driven.
- [ ] Run a **full** `vp check --fix` (not scoped, not `--no-fmt`) and `vp test` — both green — before pushing.
