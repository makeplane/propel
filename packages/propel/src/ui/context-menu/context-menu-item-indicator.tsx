import type * as React from "react";

import { contextMenuItemIndicatorVariants } from "./variants";

export type ContextMenuItemIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The check glyph to render (e.g. a Lucide `Check`), sized to the row's `--node-size`. */
  children?: React.ReactNode;
};

/**
 * The trailing selection-check region of a single-select `ContextMenuItem`. Sizes its single child
 * to the row's `--node-size` and tints it accent. Decorative (the row carries the selected state),
 * so it is `aria-hidden`.
 */
export function ContextMenuItemIndicator(props: ContextMenuItemIndicatorProps) {
  return <span aria-hidden className={contextMenuItemIndicatorVariants()} {...props} />;
}
