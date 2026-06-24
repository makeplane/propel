import type * as React from "react";

import { contextMenuItemShortcutVariants } from "./variants";

export type ContextMenuItemShortcutProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The keyboard-shortcut text region of a menu row, sitting at the row's inline-end. Decorative hint
 * (the row's label carries the accessible name), so it is `aria-hidden`.
 */
export function ContextMenuItemShortcut(props: ContextMenuItemShortcutProps) {
  return <span aria-hidden className={contextMenuItemShortcutVariants()} {...props} />;
}
