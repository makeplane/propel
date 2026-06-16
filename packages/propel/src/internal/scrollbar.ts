import { cx } from "class-variance-authority";

// Shared styling for a Base UI ScrollArea scrollbar + thumb: propel's overlay
// scrollbar. Hidden at rest and revealed on hover/scroll via Base UI's
// `data-hovering` / `data-scrolling`, over a transparent track. A 12px gutter with a
// 3px inset leaves a 6px thumb on the `--scrollbar-thumb*` tokens (darker on thumb
// hover, darkest while dragging). Used by the `ScrollArea` component and by components
// that compose Base UI ScrollArea directly (e.g. Tabs, whose list is the viewport).
export const scrollbarClass = cx(
  "flex touch-none p-0.75 opacity-0 transition-opacity duration-150 ease-out select-none",
  "data-[hovering]:opacity-100 data-[scrolling]:opacity-100",
  "data-[orientation=vertical]:w-3",
  "data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:flex-col",
);

export const scrollbarThumbClass = cx(
  "flex-1 rounded-full bg-scrollbar-thumb transition-colors",
  "hover:bg-scrollbar-thumb-hover active:bg-scrollbar-thumb-active",
);
