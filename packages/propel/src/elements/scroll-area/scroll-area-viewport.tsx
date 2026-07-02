import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { scrollAreaViewportVariants } from "./variants";

export type ScrollAreaViewportProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled scrollable viewport. Base-UI-agnostic — graft in `components` via
 * `<BaseScrollArea.Viewport render={<ScrollAreaViewport/>} />`.
 */
export function ScrollAreaViewport({ render, ...props }: ScrollAreaViewportProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: scrollAreaViewportVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
