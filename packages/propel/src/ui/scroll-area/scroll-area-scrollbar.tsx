import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";

import { scrollAreaScrollbarVariants } from "./variants";

/** Controls when the scrollbar track is visible. */
export type ScrollAreaScrollbarVisibility = "auto" | "always";

/** Controls the width (vertical) or height (horizontal) of the scrollbar gutter. */
export type ScrollAreaScrollbarMagnitude = "thin" | "standard";

/** Props for {@link ScrollAreaScrollbar}; extends Base UI `ScrollArea.Scrollbar`. */
export type ScrollAreaScrollbarProps = Omit<
  BaseScrollArea.Scrollbar.Props,
  "className" | "style"
> & {
  /**
   * `auto` hides the scrollbar at rest and reveals it on hover/scroll (fades when idle). `always`
   * keeps the scrollbar permanently visible.
   */
  visibility: ScrollAreaScrollbarVisibility;
  /**
   * `thin` — 12 px gutter (3 px padding, 6 px thumb). `standard` — 16 px gutter (5 px padding, 6 px
   * thumb).
   */
  magnitude: ScrollAreaScrollbarMagnitude;
};

/** 1:1 wrapper around Base UI `ScrollArea.Scrollbar`. */
export function ScrollAreaScrollbar({ visibility, magnitude, ...props }: ScrollAreaScrollbarProps) {
  return (
    <BaseScrollArea.Scrollbar
      className={scrollAreaScrollbarVariants({ visibility, magnitude })}
      {...props}
    />
  );
}
