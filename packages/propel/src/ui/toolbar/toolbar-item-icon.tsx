import type * as React from "react";

import { toolbarItemIconVariants } from "./variants";

export type ToolbarItemIconProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The bare icon to render, sized to the control's `--node-size`. */
  children?: React.ReactNode;
};

/**
 * The glyph inside a `ToolbarButton` or `ToolbarToggle`. Sizes its single child to the control's
 * `--node-size` (driven by the toolbar's density), so callers pass a bare icon. Decorative (the
 * control carries the accessible name via `aria-label`), so it is `aria-hidden`.
 */
export function ToolbarItemIcon(props: ToolbarItemIconProps) {
  return <span aria-hidden className={toolbarItemIconVariants()} {...props} />;
}
