import { cva } from "class-variance-authority";

import {
  buttonVariants,
  type ButtonMagnitude,
  type ButtonTone,
  type ButtonVariant,
} from "../button/index";

// IconButton's own geometry, separate from Button's label-driven chrome (which comes
// from composing `buttonVariants({ variant, tone })`). Icon buttons are square — a
// fixed `size-N` box per Figma's "Icon button" Size scale (S/Base/L/XL = 20/24/28/32px,
// mapped to sm/md/lg/xl) — and their glyph runs a step larger than a text button's at
// md and xl. Each magnitude also sets `--node-size` (14/16/16/20px, per the Figma
// "Icon button" glyph spec), which the node slot and loading spinner size to.
//
// `magnitude` is kept off Button's compound chrome on purpose: Button's `magnitude`
// adds a height, min-width, and horizontal padding meant for labelled buttons, which
// would beat this square `size-N` (cx does not dedupe conflicting utilities) and leave
// the button rectangular.
const iconButtonGeometryVariants = cva("", {
  variants: {
    magnitude: {
      sm: "size-5 [--node-size:0.875rem]", // 20px box, 14px glyph
      md: "size-6 [--node-size:1rem]", // 24px box, 16px glyph
      lg: "size-7 [--node-size:1rem]", // 28px box, 16px glyph
      xl: "size-8 [--node-size:1.25rem]", // 32px box, 20px glyph
    },
  },
});

// Re-alias ButtonMagnitude under the IconButton name so callers can type props
// without importing from the button entry. The values are identical.
export type IconButtonMagnitude = ButtonMagnitude;

/**
 * Produces the full className for the icon button root element. Merges Button's visual chrome
 * (`buttonVariants({ variant, tone })`) with icon button's square geometry and `--node-size` glyph
 * scale (`iconButtonGeometryVariants({ magnitude })`). All className composition lives here so the
 * component file only calls this function.
 */
export function iconButtonRootVariants({
  variant,
  tone,
  magnitude,
}: {
  variant: Exclude<ButtonVariant, "link">;
  tone: ButtonTone;
  magnitude: ButtonMagnitude;
}): string {
  return [buttonVariants({ variant, tone }), iconButtonGeometryVariants({ magnitude })].join(" ");
}
