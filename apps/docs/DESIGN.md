---
name: Propel Docs
description: The reference site for @makeplane/propel — precise, calm, and component-first.
colors:
  plane-blue: "oklch(0.4799 0.1158 242.91)"
  plane-blue-hover: "oklch(0.4347 0.1041 242.48)"
  plane-blue-active: "oklch(0.3399 0.0783 240.32)"
  canvas: "oklch(0.9614 0.0013 286.38)"
  surface-1: "oklch(1 0 0)"
  surface-2: "oklch(0.9911 0 0)"
  ink-primary: "oklch(0.1689 0.0021 286.18)"
  ink-secondary: "oklch(0.3225 0.0045 219.62)"
  ink-tertiary: "oklch(0.4176 0.0072 239.98)"
  border-subtle: "oklch(0.9396 0.0017 247.84)"
  on-color: "oklch(1 0 0)"
  info: "oklch(0.5465 0.2455 262.87)"
  success: "oklch(0.6320 0.1860 147.37)"
  warning: "oklch(0.7724 0.1728 65.37)"
  danger: "oklch(0.5830 0.2387 28.48)"
typography:
  display:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0em"
  headline:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0em"
  title:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0em"
  body:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 450
    lineHeight: 1.54
    letterSpacing: "0em"
  body-small:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 450
    lineHeight: 1.54
    letterSpacing: "0em"
  label:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0em"
  code:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 450
    lineHeight: 1.54
    letterSpacing: "0em"
rounded:
  sm: "0.25rem"
  md: "0.375rem"
  lg: "0.5rem"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.plane-blue}"
    textColor: "{colors.on-color}"
    typography: "{typography.body-small}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.plane-blue-hover}"
  button-secondary:
    textColor: "{colors.ink-primary}"
    typography: "{typography.body-small}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  sidebar-item:
    textColor: "{colors.ink-secondary}"
    typography: "{typography.body-small}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
  sidebar-item-active:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-primary}"
    typography: "{typography.body-small}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
  card:
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.lg}"
    padding: "16px"
  card-hover:
    backgroundColor: "{colors.surface-1}"
  example-frame:
    backgroundColor: "{colors.surface-1}"
    rounded: "{rounded.lg}"
    padding: "32px"
  props-table-header:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink-secondary}"
    padding: "8px 16px"
---

# Design System: Propel Docs

## 1. Overview

**Creative North Star: "The Reference Desk"**

This is a reading room, not a storefront. A developer arrives mid-task needing one
exact fact — the props of a component, the shape of a working example — consults
the desk, trusts what it says, and leaves. Everything here serves that transaction:
the chrome is quiet furniture, the component under examination is the only thing
that should draw the eye. The site reads like a spec you can rely on, written in the
voice of a careful engineer, with no marketing register anywhere in it.

The system is monochrome with a single blue accent. Depth is drawn with 1px borders
and a three-step tonal ladder (canvas → surface-1 → surface-2), never with
decorative shadow. Type is one family — Inter — carrying every heading, label, and
body line, with IBM Plex Mono reserved for code and API identifiers. Density is
moderate and calm: generous frames around live demos, tight rows in reference
tables. Nothing is fluid or theatrical; sizes are fixed, motion conveys state and
nothing more.

It explicitly rejects the things a docs site drifts toward when no one is steering.
Not a SaaS or AI landing page — no gradient hero, no glass cards, no tracked eyebrow
stacked over every section. Not Material Design — no ripples, no elevation scattered
for its own sake. Not the cluttered raw-Storybook aesthetic of grey knob panels. Not
playful — no bouncy motion, no mascots, no decorative illustration. Anything that
undercuts "serious, trustworthy tool" is off the table.

**Key Characteristics:**

- One accent (Plane Blue), used rarely and only where it means something.
- Borders and tonal surfaces over shadow; the site chrome is flat.
- One type family (Inter) plus a mono (IBM Plex Mono) for code; fixed sizes, no clamps.
- The live component is the hero; the page is a frame around it, never a rival to it.
- Semantic tokens only — the site inherits propel's own token system and themes.

## 2. Colors: The Monochrome-and-Blue Palette

A near-neutral field carrying one confident blue. The neutrals aren't truly grey —
they hold a faint cool tint (hue ≈ 230–248, chroma ≈ 0.002–0.009), so the whole
surface reads calm and slightly cool rather than clinical. Color appears only to
mean something.

### Primary

- **Plane Blue** (`oklch(0.4799 0.1158 242.91)`): The product's own identity color
  and the system's single accent. It fills the primary button, marks the current
  selection, and colors links — and almost nothing else. Hover deepens to
  `oklch(0.4347 0.1041 242.48)`, active to `oklch(0.3399 0.0783 240.32)`.

### Neutral

- **Canvas** (`oklch(0.9614 0.0013 286.38)`): The page background everything sits on
  — a soft off-white, one step down from pure white so raised surfaces read as lifted.
- **Surface-1** (`oklch(1 0 0)`, pure white): The primary raised surface — demo
  frames, table header rows, the hover fill on nav items and cards.
- **Surface-2** (`oklch(0.9911 0 0)`): One step above surface-1 — the fill on the
  active sidebar item and other selected states.
- **Ink Primary** (`oklch(0.1689 0.0021 286.18)`): Headings and highest-emphasis
  text. Near-black; the workhorse text color.
- **Ink Secondary** (`oklch(0.3225 0.0045 219.62)`): Body copy and muted labels. Dark
  enough to clear 4.5:1 on canvas — this is real body text, not decorative grey.
- **Ink Tertiary** (`oklch(0.4176 0.0072 239.98)`): The lowest-emphasis text (small
  section labels, hints). Still meets AA on canvas; do not push muted text lighter.
- **Border Subtle** (`oklch(0.9396 0.0017 247.84)`): The 1px divider and container
  border that does the structural work shadows would otherwise do.

### Tertiary (semantic status hues)

Reserved for meaning, never decoration. Used by propel's own components and by any
callout the docs add.

- **Info** (`oklch(0.5465 0.2455 262.87)`): informational emphasis (blue family).
- **Success** (`oklch(0.6320 0.1860 147.37)`): confirmation, valid state (green).
- **Warning** (`oklch(0.7724 0.1728 65.37)`): caution (amber).
- **Danger** (`oklch(0.5830 0.2387 28.48)`): destructive actions, invalid input (red).

### Named Rules

**The One Voice Rule.** Plane Blue appears on ≤10% of any screen — primary action,
current selection, links. Its rarity is what makes it read as "act here." A second
blue button on the same view is one too many.

**The Semantic-Token Rule.** Author every color as a propel semantic utility
(`bg-canvas`, `text-primary`, `text-secondary`, `border-subtle`, `bg-accent-primary`,
`text-on-color`) — never a raw palette step (`bg-brand-700`, `text-neutral-1100`).
The semantic layer is what carries light, dark, and high-contrast themes for free;
reach past it to a primitive and the element stops theming.

**The Cool-Neutral Rule.** Neutrals carry a faint cool tint by design. Do not
"correct" them toward warm or pure grey, and never introduce a warm-neutral
(cream / sand / paper) surface — it is off-brand for this system.

## 3. Typography

**Display / Body Font:** Inter Variable (fallback `ui-sans-serif, system-ui, sans-serif`)
**Code / Mono Font:** IBM Plex Mono (fallback `ui-monospace, SFMono-Regular, Menlo, monospace`)

**Character:** One humanist-leaning grotesque doing all the interface work, paired
with a single mono used strictly for code and API identifiers. The contrast axis is
sans-vs-mono, not two similar sans faces. There is no separate display face and no
fluid scaling — this is product typography: fixed rem sizes, a tight scale, calm
hierarchy built from weight and size, not from a decorative headline font.

Weights available: light 300, regular **450** (propel's true body weight, not 400),
medium 500, semibold 600, bold 700, heavy 800. Headings are semibold; body is
regular; labels are medium.

### Hierarchy

Sizes come from propel's composite text tokens; line-height is baked into each.

- **Display** (semibold 600, 2rem / 32px, line-height 1.2): The largest heading —
  the homepage product name. Token: `text-h1-semibold`.
- **Headline** (semibold 600, 1.5rem / 24px, line-height 1.2): Page titles in the
  docs shell. Token: `text-h3-semibold`.
- **Title** (semibold 600, 1rem / 16px, line-height 1.3): Sub-section and card
  headings. Token: `text-h6-semibold`.
- **Body** (regular 450, 1rem / 16px, line-height 1.54): Long-form prose. Cap prose
  at 65–75ch. Token: `text-body-md`.
- **Body Small** (regular 450, 0.875rem / 14px, line-height 1.54): The default UI
  text — buttons, nav items, table cells, descriptions. Token: `text-body-sm`.
- **Label** (medium 500, 0.75rem / 12px, line-height 1.2): Small section labels and
  eyebrows. Token: `text-caption-md-medium`.
- **Code** (regular 450, 0.8125rem / 13px, IBM Plex Mono): Inline identifiers, prop
  and type cells in the props table. Utility: `font-code`.

Tracking tokens are near-zero by design (`extra-tight -0.004em`, `tight -0.002em`,
`default 0em`, `wide 0.002em`); Inter needs no dramatic tightening at these sizes.

### Named Rules

**The Propel-Token Rule.** Size text with propel's tokens only — the composite
`text-h1..h6`, `text-body-md/sm/xs`, `text-caption-*`, or the numeric
`text-9…text-40` scale (e.g. `text-14`, `text-24`). Propel resets `--text-*: initial`
and does **not** re-add Tailwind's t-shirt scale, so `text-sm`, `text-lg`, `text-xl`,
`text-2xl`, and `text-3xl` generate **no** `font-size` and silently fall back to the
inherited size. (Some existing pages still use them — that is a bug to migrate, not a
pattern to copy.)

**The font-code Rule.** Monospace is `font-code`, never `font-mono`. Propel resets
`--font-*: initial` and exposes `font-heading` / `font-body` / `font-code`; the
Tailwind `font-mono` (and `font-sans`) utilities are removed and produce no family.

## 4. Elevation

The site's own chrome is **flat**. Depth is communicated with 1px `border-subtle`
dividers and the tonal ladder — canvas sits furthest back, surface-1 lifts above it,
surface-2 above that. No shadow is used on the docs' own cards, frames, tables, or
buttons. Shadow enters the page only through propel's own floating components
(dialogs, dropdowns, selects) when a demo renders them, and it comes from propel's
overlay tokens, not from site CSS.

### Shadow Vocabulary (propel components only — not site chrome)

Seven soft, light-tuned, two-layer shadows tinted with slate ink `rgb(41 47 61)`
(the sole exception, `direction-right`, uses pure black).

- **Raised** (`--shadow-raised-100/200/300`): on-surface lift for controls and cards
  that stay in flow — 100 subtlest, 300 for hover-lifted or trigger surfaces.
- **Overlay** (`--shadow-overlay-100/200`): floating layers — 100 for dropdowns,
  tooltips, small popovers; 200 (deep `30px 60px` spread) for modals and dialogs.
- **Direction** (`--shadow-direction-left/right`): side panels and drawers casting
  onto adjacent content.

### Named Rules

**The Flat-Chrome Rule.** Site surfaces are flat at rest. If a docs element needs to
feel raised, it earns it with a `border-subtle` outline and a step up the tonal
ladder — never a `box-shadow`. Shadows belong to propel's overlays alone.

## 5. Components

The chrome is deliberately minimal: a handful of small, bordered, softly-rounded
elements, refined and restrained. Buttons and cards are quiet and crisp — nothing
shouts. Where the site needs a real form control or button, prefer propel's own
component (`@makeplane/propel/components/*`) over a hand-rolled one; the recipes
below document both what the site ships today and the primitive it should lean on.

### Buttons

- **Shape:** Softly rounded (`rounded-md`, 0.375rem). Compact padding, `8px 16px` on
  the site's hand-rolled CTAs; propel's own Button is height-fixed (`h-6` = 24px at
  md) with horizontal-only padding.
- **Primary:** Solid `bg-accent-primary` (Plane Blue) with `text-on-color`, medium
  weight. The single filled button on a view.
- **Secondary:** Transparent fill, `border-subtle` outline, `text-primary`. The
  quiet companion to primary.
- **Hover / Focus:** Primary deepens toward `bg-accent-primary-hover`. Every
  interactive control **must** carry a visible `focus-visible` ring
  (`ring-2 ring-accent-strong ring-offset-1`, as propel's Button does) and a hover
  state — the site's current hand-rolled buttons declare neither and must be fixed.

### Cards / Containers

- **Corner Style:** `rounded-lg` (0.5rem).
- **Background:** Transparent at rest; `bg-surface-1` on hover for interactive cards
  (the component index tiles). Demo frames and table containers use `bg-surface-1`.
- **Shadow Strategy:** None — see Elevation. A `border-subtle` outline defines the
  edge.
- **Border:** 1px `border-subtle` on every card, frame, and table.
- **Internal Padding:** `16px` (p-4) on index cards; `32px` (p-8) on the live-demo
  preview region.

### Inputs / Fields (propel primitive)

- **Style:** Bordered group — `border-sm border-subtle`, `bg-layer-2`, `rounded-md`,
  `px-3`; min-height `32/36/40px` (md/lg/xl). The `<input>` itself is transparent;
  the group owns the surface.
- **Focus:** Border shifts to `accent-strong` with a soft accent ring
  (`ring-2 ring-accent-strong/20`).
- **Invalid / Disabled:** Invalid is driven off Base UI Field validity
  (`data-invalid`), not a prop — border and ring go danger. Disabled mutes to
  `border-subtle` / `bg-layer-2` with `text-disabled` and no ring.

### Navigation (Sidebar)

- **Style:** A `w-56` column of `rounded-md` links, `px-3 py-1.5`, body-small size.
- **Default / Hover / Active:** Default `text-secondary`; hover fills `bg-surface-1`
  and brightens to `text-primary`; the current page fills `bg-surface-2` with
  `text-primary` and sets `aria-current="page"`. Above the list, one small
  `text-tertiary` uppercase label ("Components") — a single functional nav label, the
  only tracked-uppercase text in the system.

### Component Example Frame (signature)

The distinctive docs component: a `rounded-lg` `border-subtle` card whose top region
centers a live component on `bg-surface-1` with generous `p-8`, over a `border-b`
divider, with a collapsible "Show code" / "Hide code" `<details>` below rendering the
exact source. This "live thing beside its real source" pairing is the heart of the
site — it is what makes the docs impossible to drift from the library.

### Props Table (signature)

A `rounded-lg` `border-subtle`, horizontally-scrollable table. Header row fills
`bg-surface-1` with left-aligned `text-secondary` labels; body rows divide on
`border-subtle` (`last:border-0`). The Prop column is `font-code text-primary`; the
Type column is `font-code` at `text-13`, `text-secondary`, width-capped. Generated
from propel's real TypeScript types, so it cannot describe a prop that doesn't exist.

## 6. Do's and Don'ts

### Do:

- **Do** use propel's semantic tokens for every color — `bg-canvas`, `bg-surface-1`,
  `bg-surface-2`, `text-primary`, `text-secondary`, `text-tertiary`, `border-subtle`,
  `bg-accent-primary`, `text-on-color`. They carry theming; raw palette steps do not.
- **Do** size text with propel's tokens — `text-h1..h6`, `text-body-md/sm/xs`,
  `text-caption-*`, or numeric `text-14` / `text-24`.
- **Do** use `font-code` for monospace and `font-heading` / `font-body` for the sans.
- **Do** keep Plane Blue rare — primary action, current selection, links. ≤10% of any
  screen.
- **Do** convey depth with `border-subtle` and the canvas→surface-1→surface-2 ladder.
- **Do** give every interactive control a visible `focus-visible` ring and a hover
  state (mirror propel's Button: `focus-visible:ring-2 ring-accent-strong ring-offset-1`).
- **Do** honor propel's themes: let `data-theme` drive light / dark / high-contrast,
  and gate every animation behind `@media (prefers-reduced-motion: reduce)`.
- **Do** keep body and muted text dark enough to clear 4.5:1 on canvas.

### Don't:

- **Don't** use Tailwind's `text-sm`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, or
  `font-mono` — propel removes them via `--text-*: initial` / `--font-*: initial`, so
  they silently no-op. (Existing pages that use them are bugs to migrate.)
- **Don't** reach past the semantic layer to a raw primitive (`bg-brand-700`,
  `text-neutral-1100`) — the element stops theming.
- **Don't** put a `box-shadow` on the site's own chrome. Shadows belong to propel's
  overlays alone.
- **Don't** hardcode a single theme (the layout currently pins `data-theme="light"`);
  the site must be able to render dark and high-contrast.
- **Don't** ship a warm-neutral (cream / sand / paper / parchment) surface — it is
  off-brand; neutrals here are faintly cool.
- **Don't** build a SaaS or AI landing page: no gradient hero, no glassmorphism, no
  tracked uppercase eyebrow stacked over every section.
- **Don't** import Material Design's look — no ripples, no scattered elevation.
- **Don't** ship the cluttered raw-Storybook aesthetic of grey knob panels.
- **Don't** add playful or over-animated flourishes — no bouncy/elastic motion, no
  mascots, no decorative illustration. Motion conveys state, then stops.
- **Don't** use `border-left`/`border-right` greater than 1px as a colored accent
  stripe, or `background-clip: text` gradient text — banned system-wide.
