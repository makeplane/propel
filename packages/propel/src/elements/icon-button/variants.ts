import { cva, type VariantProps } from "class-variance-authority";

import { composeVariants } from "../../internal/compose-variants";
import { controlChromeVariants } from "../../internal/control-chrome";
import { type StrictVariantProps } from "../../internal/variant-props";

// IconButton's local styling: the square geometry only. The chrome (behavior base + neutral/danger
// palette) comes from the shared `controlChromeVariants`. `variant` is declared (color-less) to
// keep the composed props pinned to the icon-button chrome set — no future shared-axis addition
// leaks in. Icon buttons are square: a fixed `size-N` box per Figma's "Icon button" Size scale
// (S/Base/L/XL = 20/24/28/32px → sm/md/lg/xl), each size setting `--node-size` (14/16/16/20px) for
// the glyph slot and spinner.
const iconButtonLocalVariants = cva("", {
  variants: {
    variant: {
      primary: "",
      secondary: "",
      tertiary: "",
      ghost: "",
      danger: "",
      "danger-outline": "",
    },
    size: {
      sm: "size-5 [--node-size:0.875rem]", // 20px box, 14px glyph
      md: "size-6 [--node-size:1rem]", // 24px box, 16px glyph
      lg: "size-7 [--node-size:1rem]", // 28px box, 16px glyph
      xl: "size-8 [--node-size:1.25rem]", // 32px box, 20px glyph
    },
  },
});

/** The full icon button className: the shared control chrome composed with the square geometry. */
export const iconButtonVariants = composeVariants(controlChromeVariants, iconButtonLocalVariants);

type IconButtonVariantConfig = VariantProps<typeof iconButtonLocalVariants>;
export type IconButtonVariant = NonNullable<IconButtonVariantConfig["variant"]>;
export type IconButtonSize = NonNullable<IconButtonVariantConfig["size"]>;

// Every axis stays required (no defaults); variant is the closed chrome set.
export type IconButtonVariantProps = StrictVariantProps<typeof iconButtonVariants>;
