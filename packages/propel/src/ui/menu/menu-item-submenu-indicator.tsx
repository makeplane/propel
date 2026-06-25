import type * as React from "react";

import { menuItemSubmenuIndicatorVariants } from "./variants";

export type MenuItemSubmenuIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The chevron slot marking a submenu trigger, pinned at the row's inline-end and mirrored under
 * RTL. Decorative (the trigger carries `aria-haspopup`), so it is `aria-hidden`. Renders and sizes
 * its single child; pass the glyph as `children`.
 */
export function MenuItemSubmenuIndicator(props: MenuItemSubmenuIndicatorProps) {
  return <span aria-hidden className={menuItemSubmenuIndicatorVariants()} {...props} />;
}
