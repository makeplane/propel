import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";

/**
 * Chrome for `BreadcrumbLink` — a navigable (hoverable) crumb anchor. Resting text is `tertiary`;
 * hover only adds the `transparent-hover` fill and does NOT recolor the text (the crumb goes
 * `primary` only when it is the current page — `BreadcrumbPage`). Icons render one step darker than
 * the text (`icon-secondary`), set on the icon slot, not inherited from `currentColor`.
 *
 * Fixed `h-6` (24px, per Figma): every crumb is the same height whether or not it has a leading
 * icon — the 16px icon and 14px text center inside the 24px box — so a mixed trail stays flush. The
 * leading-icon slot is sized to 16px via `--node-size`, so a consumer's `<Icon>` needs no
 * `magnitude`.
 */
export const breadcrumbLinkVariants = cva(
  "inline-flex h-6 items-center gap-1.5 rounded-md px-1 text-14 leading-none font-medium whitespace-nowrap text-tertiary transition-colors [--node-size:1rem] hover:bg-layer-transparent-hover",
);

/**
 * Chrome for `BreadcrumbPage` — the current page (non-interactive) crumb. Fixed `h-6` (24px); the
 * leading-icon slot is sized to 16px via `--node-size`.
 */
export const breadcrumbPageVariants = cva(
  "inline-flex h-6 items-center gap-1.5 rounded-md px-1 text-14 leading-none font-medium whitespace-nowrap text-primary [--node-size:1rem]",
);

/**
 * All-in-one chrome for a menu-trigger crumb: base pill styles, hover/open-state shifts, cursor,
 * and an optional `group/trigger` marker so descendant chevrons can react to the popup open state.
 */
export const breadcrumbTriggerVariants = cva(
  // Resting text `tertiary`; hover only adds the fill (no recolor, matching a link crumb). The
  // OPEN menu is the crumb's active state, so `data-popup-open` shifts text to `primary`.
  "inline-flex h-6 cursor-default items-center gap-1.5 rounded-md px-1 text-14 leading-none font-medium whitespace-nowrap text-tertiary transition-colors [--node-size:1rem] hover:bg-layer-transparent-hover data-popup-open:bg-layer-transparent-hover data-popup-open:text-primary",
  {
    variants: {
      /** Adds `group/trigger` so descendant elements can use `group-data-popup-open/trigger:*`. */
      group: {
        true: "group group/trigger",
        false: "",
      },
    },
  },
);

/**
 * The disclosure caret inside a menu crumb (`BreadcrumbMenuTrigger`). Pass a **chevron-down**
 * glyph: it points inline-end while the crumb's menu is closed and rotates down while it is open
 * (RTL-mirrored). Its own part — not the shared `DisclosureIndicator` — because it carries a
 * family-specific active state: resting `icon-secondary`, shifting to `icon-primary` when the
 * crumb's menu is open (`group-data-popup-open/trigger`), matching the trigger text going
 * `primary`. Sized to 14px via `--node-size` (smaller than the crumb's 16px leading icon).
 */
export const breadcrumbTriggerIndicatorVariants = cva(
  cx(
    nodeSlotClass,
    "text-icon-secondary transition duration-200 [--node-size:0.875rem]",
    "-rotate-90 group-data-popup-open/trigger:rotate-0",
    "rtl:rotate-90 rtl:group-data-popup-open/trigger:rotate-0",
    "group-data-popup-open/trigger:text-icon-primary",
  ),
);

/** The `<li>` wrapper for every crumb (link, page, trigger). */
export const breadcrumbItemVariants = cva("inline-flex items-center");

/**
 * The visual divider between crumbs. Sizes any child icon to `--node-size` via the shared node-slot
 * class, so callers pass raw SVGs without extra wrappers. Chevron icons are RTL-mirrored via
 * `rtl:[&>svg]:-scale-x-100`. Fixed `size-6` (24px, per Figma): the 14px chevron centers in a
 * 24px-square box so the divider matches the crumbs' height.
 */
export const breadcrumbSeparatorVariants = cva(
  cx(nodeSlotClass, "size-6 text-icon-secondary [--node-size:0.875rem] rtl:[&>svg]:-scale-x-100"),
);

/** The `<ol>` that carries the ordered trail of crumbs. */
export const breadcrumbListVariants = cva("flex items-center");
