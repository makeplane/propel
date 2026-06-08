# Naming component properties

A short, shared guide for naming the properties on our components in Figma.

**Why it matters:** when a component's properties use the same names and values
every time, the design maps cleanly onto the code, the library stays predictable
for everyone, and dev/AI tooling can infer how to use a component correctly. The
goal is one small vocabulary, reused everywhere — not a new word per component.

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

## Quick checklist

- [ ] Property names reused from the shared axis list (not one-offs)
- [ ] No `size` / `type` / `color` / `width` / `height`
- [ ] Content is content properties, not variants
- [ ] Quantity/repetition is instances you add or remove, not a variant (no `2/3 members`)
- [ ] Values lowercase, consistent spelling, t-shirt sizes
- [ ] No nonsensical variant combinations
