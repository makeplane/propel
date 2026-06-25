import type * as React from "react";

import { navItemTrailingVariants } from "./variants";

export type NavItemTrailingProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** Trailing content — e.g. a `NavItemCount` and/or `NavItemChevron`. */
  children?: React.ReactNode;
};

/**
 * The inline-end region of a nav row, holding trailing content such as a `NavItemCount` and/or a
 * `NavItemChevron`.
 */
export function NavItemTrailing(props: NavItemTrailingProps) {
  return <span className={navItemTrailingVariants()} {...props} />;
}
