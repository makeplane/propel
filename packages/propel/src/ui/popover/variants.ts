import { cva } from "class-variance-authority";

export const popoverPositionerVariants = cva("z-50 outline-none");
export const popoverPopupVariants = cva(
  "rounded-lg border-sm border-subtle bg-layer-1 p-1 shadow-overlay-100 outline-none" +
    " origin-(--transform-origin) transition-[opacity,transform] duration-150" +
    " data-starting-style:scale-95 data-starting-style:opacity-0" +
    " data-ending-style:scale-95 data-ending-style:opacity-0",
);
export const popoverBackdropVariants = cva(
  "fixed inset-0 bg-backdrop transition-opacity duration-200" +
    " data-ending-style:opacity-0 data-starting-style:opacity-0",
);
export const popoverArrowVariants = cva(
  "size-2 rotate-45 border-sm border-subtle bg-layer-1" +
    " data-[side=bottom]:top-[-3px] data-[side=bottom]:[clip-path:polygon(0_0,100%_0,0_100%)]" +
    " data-[side=top]:bottom-[-3px] data-[side=top]:[clip-path:polygon(100%_0,100%_100%,0_100%)]" +
    " data-[side=left]:right-[-3px] data-[side=left]:[clip-path:polygon(0_0,100%_0,100%_100%)]" +
    " data-[side=right]:left-[-3px] data-[side=right]:[clip-path:polygon(0_0,0_100%,100%_100%)]" +
    " data-[side=inline-start]:inset-e-[-3px] data-[side=inline-start]:[clip-path:polygon(0_0,100%_0,100%_100%)] rtl:data-[side=inline-start]:[clip-path:polygon(0_0,0_100%,100%_100%)]" +
    " data-[side=inline-end]:inset-s-[-3px] data-[side=inline-end]:[clip-path:polygon(0_0,0_100%,100%_100%)] rtl:data-[side=inline-end]:[clip-path:polygon(0_0,100%_0,100%_100%)]",
);
export const popoverViewportVariants = cva("relative");
export const popoverTitleVariants = cva("text-14 font-semibold text-primary");
export const popoverDescriptionVariants = cva("text-13 text-secondary");
// PopoverClose is a bare button at the ui tier — no icon-button styles baked in.
// To give it an icon-button look, compose it via `Button render={<PopoverClose />}`:
// the outer Button element's className wins and the popover-close behavior is wired
// through the render prop. See the Modal story for the usage pattern.
export const popoverCloseVariants = cva(
  "outline-none focus-visible:ring-2 focus-visible:ring-accent-strong",
);
