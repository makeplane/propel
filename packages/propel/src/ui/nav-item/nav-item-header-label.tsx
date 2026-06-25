import type * as React from "react";

import { navItemHeaderLabelVariants } from "./variants";

export type NavItemHeaderLabelProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The section title text. */
  children?: React.ReactNode;
};

/** The section title inside a `NavItemHeaderToggle`. Truncates long text on a single line. */
export function NavItemHeaderLabel(props: NavItemHeaderLabelProps) {
  return <span className={navItemHeaderLabelVariants()} {...props} />;
}
