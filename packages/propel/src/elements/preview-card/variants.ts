import { cva, cx } from "class-variance-authority";

// Preview Card wraps Base UI's parts; Base UI drives all open state through `data-*`
// attributes, so there are no styling axes (variant/tone/magnitude) to expose. The
// cva pairings below hold the static chrome for the styled parts that are UNIQUE to
// this family — Popup, Body, and Image. The shared overlay chrome (positioner,
// backdrop, arrow, title, description) is adopted from `internal/` (rule 4a) and no
// longer lives here.
//
// Body and Image are propel extensions with no Base UI counterpart; their styles
// encode the "always the same" items from the design spec: the text content area's
// layout + padding (Body) and the image overflow/cover-fit (Image).

// The card surface. Padding lives on `PreviewCardBody` (per the spec, padding is
// "within the text content area") rather than here, so the popup is the bare
// surface: a `PreviewCardImage` clips itself (it carries its own overflow-hidden +
// rounding) and the body supplies its own padding. The popup keeps no inner padding
// so the arrow is never clipped. `max-w-80` keeps the link-preview content to a
// comfortable width.
export const previewCardPopupVariants = cva(
  cx(
    "max-w-80 origin-(--transform-origin) rounded-lg border-sm border-subtle bg-layer-1 shadow-overlay-100 outline-none",
    "transition-[opacity,transform] duration-150",
    "data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  ),
);

// Body: the text content area. Per the spec, the content layout (a column with the
// title above the description) and the padding around it are "always the same", so
// they live here rather than in the consumer's composition.
export const previewCardBodyVariants = cva("flex flex-col gap-1 p-3");

// Image: overflow-hidden + object-cover bake in the "always the same" thumbnail
// treatment from the design spec (clip + cover-fit); the image rounds itself so it
// can sit inside the popup without the popup needing overflow-hidden (which would
// clip the arrow). Width/height are set by the consumer's layout.
export const previewCardImageVariants = cva("overflow-hidden rounded-md object-cover");
