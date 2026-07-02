import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { scrollAreaCornerVariants } from "./variants";

export type ScrollAreaCornerProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled corner that fills the gap where the vertical and horizontal scrollbars meet.
 * Base-UI-agnostic — graft in `components` via `<BaseScrollArea.Corner render={<ScrollAreaCorner/>}
 * />`.
 */
export function ScrollAreaCorner({ render, ...props }: ScrollAreaCornerProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: scrollAreaCornerVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
