import type * as React from "react";

import { underlineLabelVariants } from "./variants";

export type TabUnderlineLabelProps = {
  children?: React.ReactNode;
};

/**
 * The label row of an `underline`-variant tab: a rounded, padded box that tints and fills on
 * hover/active via the tab's `group/tab` state. Owns the styled `<span>` so consumers never touch
 * the underline cva directly.
 */
export function TabUnderlineLabel({ children }: TabUnderlineLabelProps) {
  return <span className={underlineLabelVariants()}>{children}</span>;
}
