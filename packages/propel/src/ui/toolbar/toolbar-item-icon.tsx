import type * as React from "react";

import { itemIconVariants } from "./variants";

export type ToolbarItemIconProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The glyph inside a `ToolbarButton` or `ToolbarToggle`. Sizes its single child to the control's
 * `--node-size` (driven by the toolbar's density), so callers pass a bare icon. Decorative (the
 * control carries the accessible name via `aria-label`), so it is `aria-hidden`.
 */
export function ToolbarItemIcon(props: ToolbarItemIconProps) {
  return <span aria-hidden className={itemIconVariants()} {...props} />;
}
