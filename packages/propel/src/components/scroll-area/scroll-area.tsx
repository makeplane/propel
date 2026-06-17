import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import { scrollbarClass, scrollbarThumbClass } from "../../internal/scrollbar";

// propel's scroll container, built on Base UI ScrollArea. Unlike a re-skinned native
// scrollbar it paints a real DOM thumb, so it renders consistently across browsers
// (including Firefox and touch), insets the thumb from the edge, and reveals only on
// interaction. The thumb uses propel's `--scrollbar-thumb*` tokens: shown while the
// area is hovered or scrolling, darker on thumb hover, darkest while dragging, over a
// transparent track. It fills its parent, so constrain the parent's height (or width)
// to make the content scroll. The scrollbar + thumb styling is shared with components
// that compose Base UI ScrollArea directly (e.g. Tabs) via `internal/scrollbar`.

/** Which axes scroll. Drives which scrollbars (and the corner) are rendered. */
export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

export type ScrollAreaProps = {
  /**
   * Which axes scroll (required, no silent default like the other essential axes).
   * `vertical`/`horizontal` render a single scrollbar; `both` renders both plus the corner. Render
   * only the axes the content can actually overflow so an unused scrollbar never reserves space or
   * reveals.
   */
  orientation: ScrollAreaOrientation;
  /** The scrollable content. */
  children: React.ReactNode;
};

/**
 * A scroll container with propel's overlay scrollbar, built on Base UI `ScrollArea`. Use it to wrap
 * any overflowing content (menus, panels, long lists). Place it as a child of a height-constrained
 * flex column: it grows to fill the column and its viewport scrolls when the content overflows. The
 * scrollbar shows only on hover/scroll and uses the propel scrollbar tokens.
 */
export function ScrollArea({ orientation, children }: ScrollAreaProps) {
  const showVertical = orientation !== "horizontal";
  const showHorizontal = orientation !== "vertical";
  return (
    // Sizing is a flex chain, not a percentage-height chain (which does not resolve
    // through flex). The Root is a flex item that also lays its viewport out as a flex
    // column; the Viewport is a `flex-1` child whose `overflow: scroll` (set by Base UI)
    // gives it an automatic min-height of 0, so it bounds to the column and scrolls. The
    // scrollbars are positioned absolutely by Base UI, so they never take flex space.
    <BaseScrollArea.Root className="relative flex min-h-0 flex-1 flex-col">
      <BaseScrollArea.Viewport className="min-h-0 flex-1 overscroll-contain rounded-[inherit] outline-none">
        {children}
      </BaseScrollArea.Viewport>
      {showVertical ? (
        <BaseScrollArea.Scrollbar orientation="vertical" className={scrollbarClass}>
          <BaseScrollArea.Thumb className={scrollbarThumbClass} />
        </BaseScrollArea.Scrollbar>
      ) : null}
      {showHorizontal ? (
        <BaseScrollArea.Scrollbar orientation="horizontal" className={scrollbarClass}>
          <BaseScrollArea.Thumb className={scrollbarThumbClass} />
        </BaseScrollArea.Scrollbar>
      ) : null}
      {orientation === "both" ? <BaseScrollArea.Corner /> : null}
    </BaseScrollArea.Root>
  );
}
