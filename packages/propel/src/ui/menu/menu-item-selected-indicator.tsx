import type * as React from "react";

import { menuItemSelectedIndicatorVariants } from "./variants";

export type MenuItemSelectedIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The check glyph to render (e.g. a Lucide `Check`), sized to the row's `--node-size`. */
  children?: React.ReactNode;
};

/**
 * The single-select check slot shown at a row's inline-end. Decorative (the row carries the
 * selected state), so it is `aria-hidden`. Renders and sizes its single child; pass the glyph as
 * `children`.
 */
export function MenuItemSelectedIndicator(props: MenuItemSelectedIndicatorProps) {
  return <span aria-hidden className={menuItemSelectedIndicatorVariants()} {...props} />;
}
