import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { scrollAreaContentVariants } from "./variants";

export type ScrollAreaContentProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled content wrapper inside the viewport. Base-UI-agnostic — graft in `components` via
 * `<BaseScrollArea.Content render={<ScrollAreaContent/>} />`.
 */
export function ScrollAreaContent({ render, ...props }: ScrollAreaContentProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: scrollAreaContentVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
