import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type BannerTitleVariantProps, bannerTitleVariants } from "./variants";

export type BannerTitleProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  BannerTitleVariantProps;

/** The banner's headline, stacked above the `BannerDescription` inside the `BannerBody`. */
export function BannerTitle({ placement, render, ...props }: BannerTitleProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: bannerTitleVariants({ placement }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
