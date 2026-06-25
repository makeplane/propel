import type * as React from "react";

import { contextMenuSubmenuTriggerIndicatorVariants } from "./variants";

export type ContextMenuSubmenuTriggerIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The caret icon to render (e.g. a Lucide `ChevronRight`), sized to the row's `--node-size`. */
  children?: React.ReactNode;
};

/**
 * The submenu caret region at a `ContextMenuSubmenuTrigger`'s inline-end. Renders whatever icon you
 * pass (sized to the row's `--node-size`), tinted tertiary and mirrored under RTL so it always
 * points toward the submenu. Decorative (the trigger carries the a11y state), so it is
 * `aria-hidden`.
 */
export function ContextMenuSubmenuTriggerIndicator(props: ContextMenuSubmenuTriggerIndicatorProps) {
  return <span aria-hidden className={contextMenuSubmenuTriggerIndicatorVariants()} {...props} />;
}
