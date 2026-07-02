import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { scrollAreaScrollbarVariants, type ScrollAreaScrollbarVariantProps } from "./variants";

/** Controls when the scrollbar track is visible. */
export type ScrollAreaScrollbarVisibility = "auto" | "always";

/** Controls the width (vertical) or height (horizontal) of the scrollbar gutter. */
export type ScrollAreaScrollbarMagnitude = "thin" | "standard";

export type ScrollAreaScrollbarProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
> &
  ScrollAreaScrollbarVariantProps;

/**
 * The styled scrollbar track. Base-UI-agnostic — graft in `components` via
 * `<BaseScrollArea.Scrollbar render={<ScrollAreaScrollbar/>} />` (the Base UI Scrollbar sets the
 * `data-orientation`/`data-hovering`/`data-scrolling` state the cva reads).
 */
export function ScrollAreaScrollbar({
  visibility,
  magnitude,
  render,
  ...props
}: ScrollAreaScrollbarProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: scrollAreaScrollbarVariants({ visibility, magnitude }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
