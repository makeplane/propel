import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type BannerBodyVariantProps, bannerBodyVariants } from "./variants";

export type BannerBodyProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  BannerBodyVariantProps;

/**
 * The message column between the icon and the trailing controls. Grows to fill the row and stacks a
 * `BannerTitle` above a `BannerDescription`. Carries the tone foreground color (inherited by both)
 * and the per-placement text weight.
 */
export function BannerBody({ placement, tone, render, ...props }: BannerBodyProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: bannerBodyVariants({ placement, tone }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
