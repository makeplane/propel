import type * as React from "react";

import { tooltipShortcutVariants } from "./variants";

/** Props for {@link TooltipShortcut}. */
export type TooltipShortcutProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * A dimmed caption-scale label for a keyboard-shortcut hint shown to the inline-end of the tooltip
 * content — the Figma "Cmd + K" slot. Omit it for a plain tooltip.
 */
export function TooltipShortcut(props: TooltipShortcutProps) {
  return <span className={tooltipShortcutVariants()} {...props} />;
}
