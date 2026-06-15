import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { cx } from "class-variance-authority";
import * as React from "react";

// propel's scroll container, built on Base UI ScrollArea. Unlike a re-skinned native
// scrollbar it paints a real DOM thumb, so it renders consistently across browsers
// (including Firefox and touch), insets the thumb from the edge, and reveals only on
// interaction. The thumb uses propel's `--scrollbar-thumb*` tokens: shown while the
// area is hovered or scrolling, darker on thumb hover, darkest while dragging, over a
// transparent track. It fills its parent, so constrain the parent's height (or width)
// to make the content scroll.

// Base UI sets `data-hovering` (pointer over the area) and `data-scrolling` (actively
// scrolling) on the scrollbar; fade the bar in on those so it reads only on
// interaction, matching the Figma scrollbar. The track is a 12px gutter with a 3px
// inset (padding), leaving a 6px thumb.
const scrollbarClass = cx(
  "flex touch-none select-none p-[3px] opacity-0 transition-opacity duration-150 ease-out",
  "data-[hovering]:opacity-100 data-[scrolling]:opacity-100",
  "data-[orientation=vertical]:w-3",
  "data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:flex-col",
);

const thumbClass = cx(
  "flex-1 rounded-full bg-scrollbar-thumb transition-colors",
  "hover:bg-scrollbar-thumb-hover active:bg-scrollbar-thumb-active",
);

export type ScrollAreaProps = {
  /** The scrollable content. */
  children: React.ReactNode;
};

/**
 * A scroll container with propel's overlay scrollbar, built on Base UI `ScrollArea`.
 * Use it to wrap any overflowing content (menus, panels, long lists). Place it as a
 * child of a height-constrained flex column: it grows to fill the column and its
 * viewport scrolls when the content overflows. The scrollbar shows only on hover/scroll
 * and uses the propel scrollbar tokens.
 */
export function ScrollArea({ children }: ScrollAreaProps) {
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
      <BaseScrollArea.Scrollbar orientation="vertical" className={scrollbarClass}>
        <BaseScrollArea.Thumb className={thumbClass} />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Scrollbar orientation="horizontal" className={scrollbarClass}>
        <BaseScrollArea.Thumb className={thumbClass} />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Corner />
    </BaseScrollArea.Root>
  );
}
