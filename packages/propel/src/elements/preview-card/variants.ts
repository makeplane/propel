import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";
import { popupSurfaceClass } from "../../internal/popup-surface";

// Preview Card wraps Base UI's parts; Base UI drives all open state through `data-*`
// attributes, so there are no styling axes (variant/tone/magnitude) to expose. The
// cva pairings below hold the static chrome for the styled parts that are UNIQUE to
// this family — Popup, Body, Image, Icon, TitleRow, PropertyGroup, and Meta. The
// shared overlay chrome (positioner, backdrop, arrow, title, description) is adopted
// from `internal/` (rule 4a) and no longer lives here.
//
// Body, Image, Icon, TitleRow, PropertyGroup, and Meta are propel extensions with no
// Base UI counterpart; their styles encode the "always the same" items from the
// design spec — the text content area's layout + padding (Body), the image
// overflow/cover-fit (Image), the leading glyph beside the title (Icon), the
// icon+title row (TitleRow), the row of property chips (PropertyGroup), and the
// muted footer caption (Meta).

// The card surface. Padding lives on `PreviewCardBody` (per the spec, padding is
// "within the text content area") rather than here, so the popup is the bare
// surface: a `PreviewCardImage` clips itself (it carries its own overflow-hidden +
// rounding) and the body supplies its own padding. The popup keeps no inner padding
// so the arrow is never clipped. `max-w-80` keeps the link-preview content to a
// comfortable width.
export const previewCardPopupVariants = cva(cx(popupSurfaceClass, "max-w-80"));

// Body: the text content area. Per the spec, the content layout (a column with the
// title row above the description, property row, and meta caption) and the padding
// around it are "always the same", so they live here rather than in the consumer's
// composition.
export const previewCardBodyVariants = cva("flex flex-col gap-1 p-3");

// Image: overflow-hidden + object-cover bake in the "always the same" thumbnail
// treatment from the design spec (clip + cover-fit); the image rounds itself so it
// can sit inside the popup without the popup needing overflow-hidden (which would
// clip the arrow). Width/height are set by the consumer's layout.
export const previewCardImageVariants = cva("overflow-hidden rounded-md object-cover");

// Icon: the decorative glyph shown at the inline-start of the title (a favicon
// stand-in, an entity-type glyph, …). Sizes its single child to `--node-size` via
// the shared node-slot class; muted like every other decorative leading icon in the
// system (Menu's leading icon, etc.) since it never carries the accessible name —
// the title does.
export const previewCardIconVariants = cva(
  cx(nodeSlotClass, "text-icon-secondary [--node-size:1rem]"),
);

// TitleRow: lays the optional `PreviewCardIcon` beside `PreviewCardTitle` on one
// baseline-free row (mirrors `MenuItemTitleRow`'s icon+label pairing, `items-center`
// rather than `items-baseline` since a glyph — not a second text run — sits next to
// the title).
export const previewCardTitleRowVariants = cva("flex items-center gap-1.5");

// PropertyGroup: the row of property chips (status, priority, assignee, labels, …)
// a link-unfurl card shows beneath its description. A bare flex-wrap row — the
// chips themselves are the consumer's own components (`Pill`, `Avatar`, `Badge`,
// …), so this part supplies only the row layout, wrapping instead of overflowing
// when there are many.
export const previewCardPropertyGroupVariants = cva("flex flex-wrap items-center gap-1.5");

// Meta: the muted footer caption (a source domain, a relative timestamp, …) closing
// out the card's text content. Same muted caption treatment used elsewhere in the
// system (`text-12 text-tertiary`), spelled out here rather than imported since
// `internal/menu-row-parts`'s `rowMetaClass` bakes in `shrink-0` for an inline
// trailing chip — this is a block-level line, not byte-identical (rule 4a).
export const previewCardMetaVariants = cva("text-12 text-tertiary");
