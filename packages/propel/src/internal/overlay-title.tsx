import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { type StrictVariantProps } from "./variant-props";

/**
 * The shared overlay heading, grafted onto any Base UI `*.Title` behavior in `components`
 * (`<BaseDialog.Title render={<OverlayTitle magnitude="lg" />}>`). Every anchored/modal overlay
 * family renders the same semibold primary heading, differing only in size, so the recipe lives
 * here rather than being copied per family (rule 4a).
 *
 * Adopted by: dialog, alert-dialog, drawer (`magnitude="lg"`, text-16) and popover, preview-card
 * (`magnitude="md"`, text-14).
 */
export const overlayTitleVariants = cva("font-semibold text-primary", {
  variants: {
    magnitude: {
      md: "text-14",
      lg: "text-16",
    },
  },
});

type OverlayTitleVariantConfig = VariantProps<typeof overlayTitleVariants>;
export type OverlayTitleMagnitude = NonNullable<OverlayTitleVariantConfig["magnitude"]>;
export type OverlayTitleVariantProps = StrictVariantProps<typeof overlayTitleVariants>;

export type OverlayTitleProps = Omit<useRender.ComponentProps<"h2">, "className" | "style"> &
  OverlayTitleVariantProps;

export function OverlayTitle({ magnitude, render, ...props }: OverlayTitleProps) {
  const defaultProps: useRender.ElementProps<"h2"> = {
    className: overlayTitleVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "h2", render, props: mergeProps(defaultProps, props) });
}
