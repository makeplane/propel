import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { scrollAreaThumbVariants } from "./variants";

export type ScrollAreaThumbProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled draggable scrollbar thumb. Base-UI-agnostic — graft in `components` via
 * `<BaseScrollArea.Thumb render={<ScrollAreaThumb/>} />`.
 */
export function ScrollAreaThumb({ render, ...props }: ScrollAreaThumbProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: scrollAreaThumbVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
