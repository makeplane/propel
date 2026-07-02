import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";

/** Chrome for `BreadcrumbLink` — a navigable (hoverable) crumb anchor. */
export const breadcrumbLinkVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-14 leading-none font-medium text-tertiary transition-colors hover:bg-layer-transparent-hover hover:text-primary",
);

/** Chrome for `BreadcrumbPage` — the current page (non-interactive) crumb. */
export const breadcrumbPageVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-14 leading-none font-medium text-primary",
);

/**
 * All-in-one chrome for a menu-trigger crumb: base pill styles, hover/open-state shifts, cursor,
 * and an optional `group/trigger` marker so descendant chevrons can react to the popup open state.
 */
export const breadcrumbTriggerVariants = cva(
  "inline-flex cursor-default items-center gap-1.5 rounded-md px-1 py-0.5 text-14 leading-none font-medium text-tertiary transition-colors [--node-size:0.875rem] hover:bg-layer-transparent-hover hover:text-primary data-popup-open:bg-layer-transparent-hover data-popup-open:text-primary",
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

/** The `<li>` wrapper for every crumb (link, page, trigger). */
export const breadcrumbItemVariants = cva("inline-flex items-center");

/**
 * The visual divider between crumbs. Sizes any child icon to `--node-size` via the shared node-slot
 * class, so callers pass raw SVGs without extra wrappers. Chevron icons are RTL-mirrored via
 * `rtl:[&>svg]:-scale-x-100`.
 */
export const breadcrumbSeparatorVariants = cva(
  cx(nodeSlotClass, "px-1 text-icon-tertiary [--node-size:0.875rem] rtl:[&>svg]:-scale-x-100"),
);

/** The `<ol>` that carries the ordered trail of crumbs. */
export const breadcrumbListVariants = cva("flex items-center gap-0.5");
