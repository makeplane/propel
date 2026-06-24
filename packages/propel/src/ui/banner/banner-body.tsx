import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type BannerBodyVariantProps, bannerBodyVariants } from "./variants";

export type { BannerBodyVariantProps } from "./variants";

export type BannerBodyProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  BannerBodyVariantProps;

/**
 * The message column between the icon and the trailing controls. Grows to fill the row and stacks a
 * `BannerTitle` above a `BannerDescription`. Carries the tone foreground color (inherited by both)
 * and the per-variant text weight.
 */
export function BannerBody({ variant, tone, render, ...props }: BannerBodyProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: bannerBodyVariants({ variant, tone }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
