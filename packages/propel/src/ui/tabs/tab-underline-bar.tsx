import type * as React from "react";

import { underlineBarVariants } from "./variants";

export type TabUnderlineBarProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The decorative bar beneath an `underline`-appearance tab's label: tints on hover and goes
 * transparent when active (the shared `TabsIndicator` takes over). Sits inside a
 * `TabUnderlineBarTrack`. Owns the styled `<span>` so the underline cva stays internal.
 */
export function TabUnderlineBar(props: TabUnderlineBarProps) {
  return <span aria-hidden className={underlineBarVariants()} {...props} />;
}
