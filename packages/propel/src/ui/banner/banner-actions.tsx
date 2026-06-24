import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { bannerActionsVariants } from "./variants";

export type BannerActionsProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/** The trailing actions group, placed after the message at the banner's inline-end. */
export function BannerActions({ render, ...props }: BannerActionsProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: bannerActionsVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
