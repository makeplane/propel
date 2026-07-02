import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { type StrictVariantProps } from "./variant-props";

/**
 * The shared overlay description text, grafted onto any Base UI `*.Description` behavior in
 * `components` (`<BaseDialog.Description render={<OverlayDescription magnitude="lg" />}>`). Renders
 * the secondary supporting copy under an overlay's title. Byte-identical across every overlay
 * family, so it lives here rather than being copied per family (rule 4a).
 *
 * Adopted by: `dialog`, `alert-dialog`, `drawer` (`magnitude="lg"` → `text-14`) and `popover`,
 * `preview-card` (`magnitude="md"` → `text-13`).
 */
export const overlayDescriptionVariants = cva("", {
  variants: {
    magnitude: {
      md: "text-13 text-secondary",
      lg: "text-14 text-secondary",
    },
  },
});

export type OverlayDescriptionMagnitude = NonNullable<
  VariantProps<typeof overlayDescriptionVariants>["magnitude"]
>;
export type OverlayDescriptionVariantProps = StrictVariantProps<typeof overlayDescriptionVariants>;

export type OverlayDescriptionProps = Omit<useRender.ComponentProps<"p">, "className" | "style"> &
  OverlayDescriptionVariantProps;

export function OverlayDescription({ magnitude, render, ...props }: OverlayDescriptionProps) {
  const defaultProps: useRender.ElementProps<"p"> = {
    className: overlayDescriptionVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "p", render, props: mergeProps(defaultProps, props) });
}
