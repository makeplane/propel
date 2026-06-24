import type * as React from "react";

import { menuItemIconVariants } from "./variants";

export type MenuItemIconProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">;

/**
 * A decorative leading icon at a row's inline-start. Sizes its single child to the row's
 * `--node-size`, so callers pass a bare icon. Decorative (the row carries the accessible name), so
 * it is `aria-hidden`.
 */
export function MenuItemIcon(props: MenuItemIconProps) {
  return <span aria-hidden className={menuItemIconVariants()} {...props} />;
}
