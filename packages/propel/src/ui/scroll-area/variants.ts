import { cva } from "class-variance-authority";

export const scrollAreaRootVariants = cva("relative flex min-h-0 flex-1 flex-col");
export const scrollAreaViewportVariants = cva(
  "min-h-0 flex-1 overscroll-contain rounded-[inherit] outline-none",
);
export const scrollAreaContentVariants = cva("min-w-full");
export const scrollAreaCornerVariants = cva("bg-transparent");

/**
 * Scrollbar track variants.
 *
 * - `visibility`: `auto` hides the scrollbar at rest and reveals it on hover/scroll (`data-hovering`
 *   / `data-scrolling`); `always` keeps it permanently visible.
 * - `magnitude`: `thin` uses a 12 px gutter (3 px padding, 6 px thumb); `standard` uses a 16 px
 *   gutter (5 px padding, 6 px thumb).
 */
export const scrollAreaScrollbarVariants = cva(
  [
    "flex touch-none transition-opacity duration-150 ease-out select-none",
    "data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row",
  ],
  {
    variants: {
      /**
       * `auto` — hidden at rest, visible on hover or while scrolling (spec: "visible on
       * hover/scroll, fades when idle"). `always` — permanently visible.
       */
      visibility: {
        auto: "opacity-0 data-hovering:opacity-100 data-scrolling:opacity-100",
        always: "opacity-100",
      },
      /**
       * `thin` — 12 px total gutter (3 px inset padding); `standard` — 16 px total gutter (5 px
       * inset padding). Both leave a 6 px thumb.
       */
      magnitude: {
        thin: "p-[3px] data-[orientation=horizontal]:h-3 data-[orientation=vertical]:w-3",
        standard: "p-[5px] data-[orientation=horizontal]:h-4 data-[orientation=vertical]:w-4",
      },
    },
  },
);

/** Scrollbar thumb variants. The thumb style is always the same per the design spec. */
export const scrollAreaThumbVariants = cva(
  "flex-1 rounded-full bg-scrollbar-thumb transition-colors hover:bg-scrollbar-thumb-hover active:bg-scrollbar-thumb-active",
);
