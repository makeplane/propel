import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { bannerTitleVariants } from "./variants";

export type BannerTitleProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/** The banner's headline, stacked above the `BannerDescription` inside the `BannerBody`. */
export function BannerTitle({ render, ...props }: BannerTitleProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: bannerTitleVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
