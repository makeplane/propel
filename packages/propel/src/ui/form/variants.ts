import { cva } from "class-variance-authority";

import { type StrictVariantProps } from "../../internal/variant-props";

// Form is a layout primitive. Per the Figma spec (issue #130) the things that are
// "always the same" are baked here — vertical rhythm between regions, the field
// stack's uniform gap, the bottom-aligned actions bar — while the one adjustable
// axis (single- vs multi-column field arrangement) is a required `layout` variant
// on `FormBody`, and the actions bar's right-aligned-vs-full-width treatment is a
// required `variant` on `FormActions`. No part takes a `className`.

// The form root only governs the vertical rhythm BETWEEN regions (the field body and
// the actions bar). Field spacing and action layout belong to those regions, not here.
export const formVariants = cva("flex flex-col gap-6");

// The field-stacking region. "Vertical field stacking with a consistent gap" is the
// always-the-same baseline; the adjustable axis from the spec is the column layout:
// - `"single"` — one column, fields stack vertically.
// - `"multi"`  — a wrapping row for side-by-side field pairs (multi-column).
export const formBodyVariants = cva("flex gap-4", {
  variants: {
    layout: {
      single: "flex-col",
      multi: "flex-row flex-wrap",
    },
  },
});

// The actions bar at the bottom of the form. Position (bottom of the form) is always
// the same; the adjustable treatment from the spec is right-aligned vs full-width:
// - `"inline"`  — buttons sit at the inline-end (right-aligned, mirrored under RTL).
// - `"stretch"` — buttons stretch to fill the row (full-width actions).
export const formActionsVariants = cva("flex gap-3", {
  variants: {
    variant: {
      inline: "flex-row justify-end",
      stretch: "flex-col [&>*]:w-full",
    },
  },
});

export type FormActionsVariantProps = StrictVariantProps<typeof formActionsVariants>;

export type FormBodyVariantProps = StrictVariantProps<typeof formBodyVariants>;
