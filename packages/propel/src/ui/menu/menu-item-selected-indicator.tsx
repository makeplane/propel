import type * as React from "react";

import { menuItemSelectedIndicatorVariants } from "./variants";

export type MenuItemSelectedIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The single-select check slot shown at a row's inline-end. Decorative (the row carries the
 * selected state), so it is `aria-hidden`. Renders and sizes its single child; pass the glyph as
 * `children`.
 */
export function MenuItemSelectedIndicator({ children, ...props }: MenuItemSelectedIndicatorProps) {
  return (
    <span aria-hidden className={menuItemSelectedIndicatorVariants()} {...props}>
      {children}
    </span>
  );
}
