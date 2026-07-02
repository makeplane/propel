import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type BannerIconVariantProps, bannerIconVariants } from "./variants";

export type BannerIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style"> &
  BannerIconVariantProps;

/**
 * The leading icon slot at the banner's inline-start (the Figma intent icon). Sizes its single
 * child to the banner's node size and tints it per `tone`, so callers pass a bare icon. Decorative
 * (the message carries the meaning), so it is `aria-hidden`.
 */
export function BannerIcon({ placement, tone, render, ...props }: BannerIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: bannerIconVariants({ placement, tone }),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
