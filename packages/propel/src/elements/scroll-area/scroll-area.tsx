import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { scrollAreaVariants } from "./variants";

export type ScrollAreaProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled scroll-area root: lays its viewport out as a height-constrained flex column but
 * renders no scrollbars itself. Base-UI-agnostic — graft the scroll behavior in `components` via
 * `<BaseScrollArea.Root render={<ScrollArea/>} />`. The ready-made scroller that composes the
 * viewport, scrollbars, thumb and corner lives in `@plane/propel/components/scroll-area`.
 */
export function ScrollArea({ render, ...props }: ScrollAreaProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: scrollAreaVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
