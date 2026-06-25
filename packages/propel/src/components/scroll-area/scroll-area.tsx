import * as React from "react";

import {
  ScrollArea as ScrollAreaElement,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  type ScrollAreaScrollbarMagnitude,
  type ScrollAreaScrollbarVisibility,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "../../ui/scroll-area";

// propel's scroll container, built on Base UI ScrollArea. Unlike a re-skinned native
// scrollbar it paints a real DOM thumb, so it renders consistently across browsers
// (including Firefox and touch), insets the thumb from the edge, and reveals only on
// interaction. The thumb uses propel's `--scrollbar-thumb*` tokens: shown while the
// area is hovered or scrolling, darker on thumb hover, darkest while dragging, over a
// transparent track. It fills its parent, so constrain the parent's height (or width)
// to make the content scroll. The scrollbar gutter and thumb styling are owned by the
// `ui/scroll-area` parts (their cva), reveal/width driven by the `visibility` and `magnitude`
// props threaded to each `ScrollAreaScrollbar`.

/** Which axes scroll. Drives which scrollbars (and the corner) are rendered. */
export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

export type ScrollAreaProps = {
  /**
   * Which axes scroll (required, no silent default). `vertical`/`horizontal` render a single
   * scrollbar; `both` renders both plus the corner. Render only the axes the content can actually
   * overflow so an unused scrollbar never reserves space or reveals.
   */
  orientation: ScrollAreaOrientation;
  /**
   * When the scrollbar is shown. `auto` hides it at rest and reveals it on hover/scroll (fades when
   * idle). `always` keeps it permanently visible. Required — pick the behavior that matches the
   * context (e.g. `auto` for panels, `always` for persistent scroll indicators).
   */
  visibility: ScrollAreaScrollbarVisibility;
  /**
   * Scrollbar gutter size. `thin` — 12 px (3 px padding, 6 px thumb). `standard` — 16 px (5 px
   * padding, 6 px thumb). Required — choose based on the density of the surrounding UI.
   */
  magnitude: ScrollAreaScrollbarMagnitude;
  /** The scrollable content. */
  children: React.ReactNode;
};

/**
 * A scroll container with propel's overlay scrollbar, built on Base UI `ScrollArea`. Use it to wrap
 * any overflowing content (menus, panels, long lists). Place it as a child of a height-constrained
 * flex column: it grows to fill the column and its viewport scrolls when the content overflows.
 */
export function ScrollArea({ orientation, visibility, magnitude, children }: ScrollAreaProps) {
  const showVertical = orientation !== "horizontal";
  const showHorizontal = orientation !== "vertical";
  return (
    // Sizing is a flex chain, not a percentage-height chain (which does not resolve
    // through flex). The Root is a flex item that also lays its viewport out as a flex
    // column; the Viewport is a `flex-1` child whose `overflow: scroll` (set by Base UI)
    // gives it an automatic min-height of 0, so it bounds to the column and scrolls. The
    // scrollbars are positioned absolutely by Base UI, so they never take flex space.
    <ScrollAreaElement>
      <ScrollAreaViewport>{children}</ScrollAreaViewport>
      {showVertical ? (
        <ScrollAreaScrollbar orientation="vertical" visibility={visibility} magnitude={magnitude}>
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      ) : null}
      {showHorizontal ? (
        <ScrollAreaScrollbar orientation="horizontal" visibility={visibility} magnitude={magnitude}>
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      ) : null}
      {orientation === "both" ? <ScrollAreaCorner /> : null}
    </ScrollAreaElement>
  );
}
