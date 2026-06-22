# Designing propel components

A short, shared guide for the two things every propel component has: the
**properties** it exposes (what knobs you can turn) and its **anatomy** (what parts
it is built from). Both are a contract shared between design and code.

**Why it matters:** when properties use the same names and values every time, and
parts are named and assembled the same way every time, the design maps cleanly onto
the code, the library stays predictable for everyone, and dev/AI tooling can infer
how to use a component correctly. The goal is one small vocabulary, reused
everywhere — not a new word per component.

> For how we _adopt_ propel into Plane and evolve these APIs (the explicit-first
> rollout, discovering constraints, and composing primitives with Base UI `render`),
> see [`integration.md`](./integration.md).

# Naming properties

## 1. Describe styling with a small, fixed set of axes

Use the **same property name for the same idea on every component**, and only add
the axes a component actually needs.

| Property        | Answers                                          | Example values                                                         |
| --------------- | ------------------------------------------------ | ---------------------------------------------------------------------- |
| **`variant`**   | What _form / shape_ is it?                       | `primary` / `secondary` / `tertiary`, or `image` / `initials` / `icon` |
| **`tone`**      | What does it _mean_ (its color / intent)?        | `neutral` / `info` / `success` / `warning` / `danger`                  |
| **`magnitude`** | How _big_ is it?                                 | `2xs … 3xl` (or `sm` / `md` / `lg`)                                    |
| **`emphasis`**  | How _prominent / filled_ is it?                  | `soft` / `outline` / `solid`                                           |
| **`surface`**   | What background does it _sit on_ (so it adapts)? | `background` / `fill`                                                  |
| **`density`**   | How _compact_ is it?                             | `compact` / `default`                                                  |

A button might use `variant · tone · magnitude`; an input might use
`surface · density · magnitude`. Use what fits — skip the rest.

## 2. Avoid reserved words

Never name a property **`size`, `type`, `color`, `width`, or `height`** — these are
built-in HTML/code attributes and collide. Use the axis names above instead
(`magnitude`, `variant`, `tone`). Behaviors that _are_ native — a button's submit
behavior, disabled state, a link's destination — are handled automatically in
code and don't need a property.

## 3. Separate content from style

Text, images, and icons are **content**, not style variants. Expose them as text
properties or instance-swaps (e.g. `label`, `name`, `icon`, `src`) — never bake
specific people, copy, or images into variants.

**How many things are inside is also content, not a variant.** Don't make a
property for quantity — member count on an avatar group, the number of list items,
tabs, or steps. The designer adds or removes instances inside the component (like a
real list), and the component just lays out whatever it's given. A `2 members` /
`3 members` variant is the tell to avoid: it explodes the variant matrix and
doesn't match how the component is built in code. Reserve variants for _styling_.

## 4. Format values consistently

- **lowercase, no spaces or hyphens** — `initials`, not `Fallback - initials`
- **same spelling everywhere** — `md` means the same size on every component
- **t-shirt scale** for sizes (`2xs / xs / sm / md / lg / xl / 2xl / 3xl`); **plain
  words** for tone (`neutral`, `danger`); **descriptive words** for variant

## 5. Don't model impossible combinations

If a combination doesn't exist (e.g. a `danger` tone only makes sense on a primary
button), simply don't create that variant. Fewer, meaningful variants are easier
to use and keep the component honest.

# Component anatomy

A component's **anatomy** is the set of named parts it is built from. We name parts
with the same discipline we name properties: one shared vocabulary, reused
everywhere, so a part means the same thing on every component.

## 6. Start from Base UI's parts; extend only when needed

Every propel primitive wraps a [Base UI](https://base-ui.com) component, so its
baseline anatomy is Base UI's: `Root`, `Trigger`, `Portal`, `Backdrop`,
`Positioner`, `Popup`, `Viewport`, `Title`, `Description`, `Close`, `Item`,
`Indicator`, and so on. Use those names as-is.

Only add an **extension** — a part Base UI does not ship — when the layout genuinely
needs one. Name extensions in the same spirit as Base UI's own parts (a noun for the
region: `Header`, `Body`, `Actions`), not after a specific use or style.

## 7. Group content, and let the parent own the spacing between groups

Lay content out as a small number of meaningful **groups**, and put the space
_between_ groups on the parent (`gap`) — never as a margin on a child. The canonical
overlay groups:

- **Intro** — the `Title` + `Description`, with a tight internal gap.
- **Actions** — the row of buttons.
- For larger surfaces, optionally a **Header** (title + a corner close) and a
  **Body** (the scrollable content between header and actions).

A title, a description, and an actions row are not three equal siblings — they are
two groups (intro and actions) the parent separates. **Reaching for a margin to push
two things apart is the tell that a layout boundary — a part — is missing.**

## 8. Keep chrome and body layout in separate parts

The **chrome** (the popup surface: border, background, shadow, transitions,
positioning) and the **body layout** (the vertical stack and the gap between groups)
are different concerns. Keep them in separate parts so the same body layout is reused
by both the hand-wired parts and the ready-made compositions. A fixed width is
_sizing_, not layout — it belongs to a sizing axis or the consumer, not the
body-layout part.

## 9. A raw `<div>` / `className` / inline style is a missing part

No component (or story, or consumer) should reach for a raw HTML element, a
`className`, or an inline `style` to build a component's structure. When a story
needs `<div className="flex flex-col gap-…">` to lay out a component's content, that
`<div>` is a missing anatomy part: name it and add it to the primitive, then compose
it everywhere. (Defining these parts from the styles currently used in Storybook is
the active work — see the roadmap in [`integration.md`](./integration.md).)

> Some part names above (`Intro` / `Header` / `Body` / `Actions`) and a few
> ownership questions (where padding lives, whether a corner close is inline or
> corner-absolute) are still being finalized with design. The _principles_ in this
> section are settled; the exact names may shift.

## Quick checklist

- [ ] Property names reused from the shared axis list (not one-offs)
- [ ] No `size` / `type` / `color` / `width` / `height`
- [ ] Content is content properties, not variants
- [ ] Quantity/repetition is instances you add or remove, not a variant (no `2/3 members`)
- [ ] Values lowercase, consistent spelling, t-shirt sizes
- [ ] No nonsensical variant combinations
- [ ] Parts use Base UI's names; extensions are named for the region, not the use
- [ ] Space between groups is the parent's `gap`, never a child's margin
- [ ] No raw `<div>` / `className` / inline `style` standing in for a missing part
