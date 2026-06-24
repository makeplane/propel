import type * as React from "react";

import { contextMenuItemIconVariants } from "./variants";

export type ContextMenuItemIconProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The leading icon region of a menu row. Sizes its single child to the row's `--node-size`, so
 * callers pass a bare icon. Decorative (the row's label carries the accessible name), so it is
 * `aria-hidden`.
 */
export function ContextMenuItemIcon(props: ContextMenuItemIconProps) {
  return <span aria-hidden className={contextMenuItemIconVariants()} {...props} />;
}
