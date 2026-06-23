import { ChevronRight } from "lucide-react";
import type * as React from "react";

import { menuItemSubmenuIndicatorVariants } from "./variants";

export type MenuItemSubmenuIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The chevron marking a submenu trigger, pinned at the row's inline-end and mirrored under RTL.
 * Decorative (the trigger carries `aria-haspopup`), so it is `aria-hidden`. Defaults to a chevron;
 * pass `children` to use a different glyph.
 */
export function MenuItemSubmenuIndicator({ children, ...props }: MenuItemSubmenuIndicatorProps) {
  return (
    <span aria-hidden className={menuItemSubmenuIndicatorVariants()} {...props}>
      {children ?? <ChevronRight />}
    </span>
  );
}
