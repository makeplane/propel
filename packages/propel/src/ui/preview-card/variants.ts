import { cva, cx } from "class-variance-authority";

// Preview Card is a verbatim wrapping of Base UI's parts. Base UI drives all
// open state through `data-*` attributes, so there are no styling axes
// (variant/tone/magnitude) to expose. The cva pairings below hold the static
// chrome for every styled part in one place, with no `className` at the boundary.
//
// The anatomy also includes four propel-extended parts — Body, Image, Title, and
// Description — that have no Base UI counterpart. Their styles below encode the
// "always the same" items from the design spec: the text content area's layout +
// padding (Body), the image overflow/cover-fit (Image), and the title/description
// font hierarchy (Title/Description).

export const previewCardPositionerVariants = cva("z-50 outline-none");

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

export const previewCardBackdropVariants = cva(
  cx(
    "fixed inset-0 bg-backdrop transition-opacity duration-200",
    "data-ending-style:opacity-0 data-starting-style:opacity-0",
  ),
);

// Arrow inherits the popup's background so the caret blends with the card surface.
export const previewCardArrowVariants = cva("text-layer-1");

// Image: overflow-hidden + object-cover bake in the "always the same" thumbnail
// treatment from the design spec (clip + cover-fit); the image rounds itself so it
// can sit inside the popup without the popup needing overflow-hidden (which would
// clip the arrow). Width/height are set by the consumer's layout.
export const previewCardImageVariants = cva("overflow-hidden rounded-md object-cover");

// Title: matches the heading hierarchy in the Figma spec.
export const previewCardTitleVariants = cva("text-14 font-semibold text-primary");

// Description: secondary supporting text beneath the title.
export const previewCardDescriptionVariants = cva("text-13 text-secondary");
