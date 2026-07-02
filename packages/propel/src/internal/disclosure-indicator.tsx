import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, cx, type VariantProps } from "class-variance-authority";

import { nodeSlotClass } from "./node-slot";
import { type StrictVariantProps } from "./variant-props";

/**
 * The shared disclosure caret, grafted (or composed) wherever a trigger reveals content. ONE glyph
 * convention everywhere: pass a **chevron-down** svg and the slot rotates it — before this each
 * family re-spelled the rotation (and breadcrumb had drifted to a chevron-right convention with
 * opposite math). Reads the open state from the trigger's `group` class via BOTH Base UI attributes
 * (`data-panel-open` for collapsibles/accordions, `data-popup-open` for menus/popups), and dims off
 * a menu row's `group-data-disabled/item`.
 *
 * - `motion` — `disclose`: points inline-end while closed, down while open (RTL-mirrored);
 *   `pointEnd`: always points inline-end (a submenu caret); `flip`: down while closed, up while
 *   open (a dropdown caret).
 * - `tint` — resting icon color.
 * - `magnitude` — the glyph size when the trigger doesn't already provide `--node-size`.
 */
export const disclosureIndicatorVariants = cva(
  cx(
    nodeSlotClass,
    "transition-transform duration-200",
    "group-data-disabled/item:text-icon-disabled",
  ),
  {
    variants: {
      motion: {
        disclose: cx(
          "-rotate-90 group-data-panel-open:rotate-0 group-data-popup-open:rotate-0",
          "rtl:rotate-90 rtl:group-data-panel-open:rotate-0 rtl:group-data-popup-open:rotate-0",
        ),
        pointEnd: "-rotate-90 rtl:rotate-90",
        flip: "group-data-popup-open:rotate-180",
      },
      tint: {
        secondary: "text-icon-secondary",
        tertiary: "text-icon-tertiary",
      },
      magnitude: {
        inherit: "",
        sm: "[--node-size:0.875rem]",
      },
    },
  },
);

type DisclosureIndicatorVariantConfig = VariantProps<typeof disclosureIndicatorVariants>;
export type DisclosureIndicatorMotion = NonNullable<DisclosureIndicatorVariantConfig["motion"]>;
export type DisclosureIndicatorTint = NonNullable<DisclosureIndicatorVariantConfig["tint"]>;

export type DisclosureIndicatorVariantProps = StrictVariantProps<
  typeof disclosureIndicatorVariants
>;

export type DisclosureIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
> &
  DisclosureIndicatorVariantProps;

export function DisclosureIndicator({
  motion,
  tint,
  magnitude,
  render,
  ...props
}: DisclosureIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: disclosureIndicatorVariants({ motion, tint, magnitude }),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
