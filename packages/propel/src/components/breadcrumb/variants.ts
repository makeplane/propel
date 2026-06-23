import { cva } from "class-variance-authority";

/** A single row inside `BreadcrumbDropdown`'s menu. */
export const crumbDropdownItemVariants = cva(
  "flex cursor-default items-center rounded-sm px-2 py-1 text-14 leading-[1.54] text-secondary outline-none select-none data-highlighted:bg-layer-transparent-hover data-highlighted:text-primary",
);

/** The `<p-1 outline-none>` popup inside `BreadcrumbDropdown`. */
export const crumbDropdownPopupVariants = cva("p-1 outline-none");

/**
 * Icon slot for `BreadcrumbMenuTrigger`'s optional leading icon. Sizes the child to 16 px via
 * `--node-size`; wraps with the standard NodeSlot layout utilities so no className is needed on the
 * icon element itself.
 */
export const crumbMenuTriggerIconSlotVariants = cva(
  "inline-flex shrink-0 items-center justify-center text-icon-tertiary [--node-size:1rem] [&>img]:size-(--node-size) [&>svg]:size-(--node-size)",
);

/**
 * The trailing chevron inside `BreadcrumbMenuTrigger` — fixed 14 px, rotates 90° when the menu is
 * open, and mirrors in RTL.
 */
export const crumbMenuTriggerIndicatorVariants = cva(
  "size-3.5 shrink-0 text-icon-tertiary transition-transform group-data-popup-open/trigger:rotate-90 rtl:not-group-data-popup-open/trigger:-scale-x-100",
);
