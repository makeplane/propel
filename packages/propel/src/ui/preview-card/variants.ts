import { cva, cx } from "class-variance-authority";

// Preview Card is a verbatim wrapping of Base UI's parts. Base UI drives all
// open state through `data-*` attributes, so there are no styling axes
// (variant/tone/magnitude) to expose. The cva pairings below hold the static
// chrome for every styled part in one place, with no `className` at the boundary.
//
// The anatomy also includes three propel-extended parts — Image, Title, and
// Description — that have no Base UI counterpart. Their styles below encode the
// "always the same" items from the design spec: image overflow/cover-fit and the
// title/description font hierarchy.

export const previewCardPositionerVariants = cva("z-50 outline-none");

// Like the shared anchored popup, but with `p-3` and a `max-w-80` to comfortably
// hold the richer link-preview content.
export const previewCardPopupVariants = cva(
  cx(
    "max-w-80 origin-(--transform-origin) rounded-lg border-sm border-subtle bg-layer-1 p-3 shadow-overlay-100 outline-none",
    "transition-[opacity,transform] duration-150",
    "data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  ),
);

export const previewCardBackdropVariants = cva(
  cx(
    "fixed inset-0 bg-backdrop transition-opacity duration-200",
    "data-ending-style:opacity-0 data-starting-style:opacity-0",
  ),
);

// Arrow inherits the popup's background so the caret blends with the card surface.
export const previewCardArrowVariants = cva("text-layer-1");

// Image: overflow-hidden + object-cover bake in the "always the same" thumbnail
// treatment from the design spec. Width/height are set by the consumer's layout.
export const previewCardImageVariants = cva("overflow-hidden rounded-md object-cover");

// Title: matches the heading hierarchy in the Figma spec.
export const previewCardTitleVariants = cva("text-14 font-semibold text-primary");

// Description: secondary supporting text beneath the title.
export const previewCardDescriptionVariants = cva("text-13 text-secondary");
