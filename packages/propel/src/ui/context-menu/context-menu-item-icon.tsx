import type * as React from "react";

import { contextMenuItemIconVariants } from "./variants";

export type ContextMenuItemIconProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The bare icon to render, sized to the row's `--node-size`. */
  children?: React.ReactNode;
};

/**
 * The leading icon region of a menu row. Sizes its single child to the row's `--node-size`, so
 * callers pass a bare icon. Decorative (the row's label carries the accessible name), so it is
 * `aria-hidden`.
 */
export function ContextMenuItemIcon(props: ContextMenuItemIconProps) {
  return <span aria-hidden className={contextMenuItemIconVariants()} {...props} />;
}
