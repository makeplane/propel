import { Check } from "lucide-react";
import type * as React from "react";

import { menuItemSelectedIndicatorVariants } from "./variants";

export type MenuItemSelectedIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The single-select check shown at a row's inline-end. Decorative (the row carries the selected
 * state), so it is `aria-hidden`. Defaults to a checkmark; pass `children` to use a different
 * glyph.
 */
export function MenuItemSelectedIndicator({ children, ...props }: MenuItemSelectedIndicatorProps) {
  return (
    <span aria-hidden className={menuItemSelectedIndicatorVariants()} {...props}>
      {children ?? <Check />}
    </span>
  );
}
