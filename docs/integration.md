# Integrating propel into Plane

How we adopt `@plane/propel` into the existing Plane codebase and evolve its APIs as
we go. This is the dev-facing companion to [`design.md`](./design.md) (the shared
property + anatomy vocabulary).

## The approach

We are not trying to specify every component perfectly up front. We let the real
codebase tell us what's missing:

1. **We don't pre-answer every design question.** Open questions about what should
   be fixed vs. adjustable on each component don't block adoption — we move with
   what we know.
2. **We use what we have to refactor plane-ee.** propel as it stands today is enough
   to start replacing the existing UI.
3. **We find the shortcomings, and update propel.** Every place propel can't yet
   express what plane-ee needs is a real, prioritized signal — not a hypothetical.
4. **We discover the design constraints by making the breaking changes.** The
   refactor surfaces the constraints that matter; we capture them as we hit them.
5. **The end state: propel represents all of plane-ui.** Once it does, humans _and_
   AI can build Plane UI out of propel, because every pattern Plane needs lives in
   the library.

## The integration plan

The throughline is **make everything explicit first, add defaults last.** Explicit
APIs turn "what does this component need?" into a question the type-checker answers
for us.

1. **No default props at the beginning.** Every axis is required; nothing is implied.
   (This matches propel's standing rule of no `cva` `defaultVariants` — see the
   `propel-no-default-variants` convention.)
2. **Design for what we know now.** Model only the props and parts we can justify
   today. Don't speculate.
3. **Expose required changes through the `ui` layer as we learn.** When the refactor
   proves a component needs an axis it doesn't have, add it to the `ui` primitive
   first, then let the `components` compositions follow.
4. **Use _required_ props to find every call site.** When a component grows a new
   axis, make it **required** rather than defaulted, so TypeScript lights up every
   place that must choose. Worked example:

   A component ships with no `variant`. The refactor reveals it actually renders two
   ways, `"light"` and `"dark"`, and today everything implicitly gets `"light"`.

   ```ts
   // before: one implicit look
   type Props = { … };

   // after: make the axis explicit AND required — do NOT default it to "light"
   type Props = { variant: "light" | "dark"; … };
   ```

   Now every existing call site is a type error. Each error is a decision we get to
   make deliberately (`light` or `dark`) instead of inheriting a silent default —
   so we fix exactly the right places and miss none.

5. **Let AI set the defaults at the finish line.** Once we give the green light that
   a component is "finished," its real-world usage tells us which value is the common
   case. At that point we can have AI analyze the call sites and set sensible
   defaults — turning required props back into optional ones where it's safe, with
   evidence behind each default instead of a guess.

The payoff of doing it in this order: defaults are derived from how the component is
_actually_ used across Plane, not assumed before we've used it once.

## Composing primitives with Base UI `render`

Every propel primitive wraps a [Base UI](https://base-ui.com) component, and Base
UI's `render` prop is how we compose them. A few rules we've learned — they apply
whenever you give a behavior part (a `Trigger`, a `Close`) the look of a styled
primitive (`Button`, `IconButton`).

### `render` substitutes the rendered element and merges props

`render` lets a Base UI part render _as_ another element/component, merging its
resolved props (event handlers, `aria-*`, `data-*`, `ref`) onto it. Crucially,
Base UI's `mergeProps` **concatenates `className`** (it does not replace it) and
passes the merged result down to the render target.

### Put the styled primitive on the outside, the behavior part in `render`

To make a trigger or close look like a `Button`, write the **styled primitive as the
outer element** and pass the dialog/menu part through its `render`:

```tsx
// ✅ correct — Button's look wins, AlertDialogClose supplies the close behavior
<Button variant="primary" tone="danger" magnitude="xl" render={<AlertDialogClose />}>
  Delete
</Button>

// ✅ corner close — IconButton for the icon-only ✕
<IconButton variant="ghost" tone="neutral" magnitude="lg" aria-label="Close" render={<DialogClose />}>
  <X />
</IconButton>
```

Not the reverse:

```tsx
// ❌ wrong — renders a bare/ghost element, NOT a styled button
<AlertDialogClose render={<Button variant="secondary" tone="neutral" magnitude="xl" />}>
  Cancel
</AlertDialogClose>
```

### Why the order matters

Many propel parts force their own `className` (e.g. `AlertDialogClose` applies
`alertDialogCloseVariants()`), and every propel primitive is written
`className={variants()} {...props}` — so **`props.className` always wins over the
element's own className.** Combined with Base UI concatenating and passing className
to the render target:

- **Styled primitive outside:** its `buttonVariants` is the className that gets
  spread last onto the inner part → the Button look wins, and the inner leaf (the
  Base UI `Close`) still wires the behavior. ✅
- **Styled primitive inside `render`:** the outer part's forced variant className is
  passed _into_ the Button and clobbers `buttonVariants` → you get a bare ghost
  element. ❌ (Verified: `Cancel`/`Delete` rendered as plain text this way.)

So the mnemonic is: **the element whose look you want goes on the outside.**

### What carries through

With the styled primitive outside, the inner part contributes everything behavioral
— `onClick` to open/close, `aria-haspopup`/`aria-expanded`, focus management,
`data-*` state attributes — while children, `ref`, and the visible styling come from
the outer primitive. Use `Button` for text buttons and `IconButton` (icon as
`children`, required `aria-label`) for icon-only controls like the corner ✕.

### Caveat

This relies on propel's consistent `className={variants()} {...props}` ordering
(props win) in every primitive. Keep that convention — it's also why no propel
component takes a `className` prop (see `propel-no-className-prop-internal`).

## What's left

The remaining work is to formalize component anatomy from what the stories already
show, in three steps:

1. **Define the `ui` component anatomy from the styles used in Storybook.** Where a
   story lays out a component with raw `<div className="flex …">`, that markup names
   a missing part. We've already redrawn these layout boundaries in the overlay
   stories (grouping `Title`+`Description` as an intro and the buttons as actions,
   with the parent owning the gap) — that's the input for naming the parts.
2. **Name the anatomy extensions that differ from standard Base UI anatomy.** Most
   parts are Base UI's (`Popup`, `Title`, `Close`, …); the extensions are the
   layout regions Base UI doesn't ship (`Header` / `Body` / `Actions` / an intro
   group). Decide these names (and the open ownership questions — where padding
   lives, the corner-close treatment) with design. See
   [`design.md` → Component anatomy](./design.md#component-anatomy).
3. **Define the new compositions for each `ui` primitive's API.** With the parts
   named, give each primitive the parts as real surfaces, and update the
   `components`-tier ready-mades to compose them — so consumers stop writing raw
   layout and compose the anatomy instead.

This is sequenced deliberately: we don't harden a part into an API until its
boundary is proven correct in a story first.
