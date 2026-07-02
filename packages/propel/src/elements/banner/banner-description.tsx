import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { bannerDescriptionVariants } from "./variants";

export type BannerDescriptionProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/** The banner's supporting message, stacked below the `BannerTitle` inside the `BannerBody`. */
export function BannerDescription({ render, ...props }: BannerDescriptionProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: bannerDescriptionVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
