import { cva } from "class-variance-authority";

export const popoverPositionerVariants = cva("z-50 outline-none");
// Spec "always the same": shadow/elevation, border-radius, max-width constraint, and
// the open/close scale-fade. `max-w-xs` caps the popup at a readable column width.
export const popoverPopupVariants = cva(
  "max-w-xs rounded-lg border-sm border-subtle bg-layer-1 p-1 shadow-overlay-100 outline-none" +
    " origin-(--transform-origin) transition-[opacity,transform] duration-150" +
    " data-starting-style:scale-95 data-starting-style:opacity-0" +
    " data-ending-style:scale-95 data-ending-style:opacity-0",
);
// The padded content column inside the popup: stacks its children vertically and
// supplies the internal padding (the bare popup carries only the surface chrome).
// The gap spaces sibling layout regions — e.g. an intro from an actions row — so
// regions are separated by the parent's gap, never a margin on a child.
export const popoverBodyVariants = cva("flex flex-col gap-2 p-2");
// The popup's leading text group: a `PopoverTitle` stacked over a
// `PopoverDescription`, spaced by a tight gap.
export const popoverIntroVariants = cva("flex flex-col gap-1");
// The popup's trailing controls row (e.g. a `PopoverClose` styled as a button):
// pushes its children to the inline-end and spaces them by a gap.
export const popoverActionsVariants = cva("flex justify-end gap-2");
// The bare scroll-body popup used inside an elevated panel surface (see the
// components-tier `PopoverContent`, which supplies the surface chrome via the shared
// overlay panel). Carries only the inner padding + focus outline reset — never the
// border / bg / shadow / radius, which would double up with the panel surface. The
// standalone `popoverPopupVariants` (above) is the self-contained surface used when
// the popup is NOT wrapped in a panel.
export const popoverPanelPopupVariants = cva("p-1 outline-none");
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
