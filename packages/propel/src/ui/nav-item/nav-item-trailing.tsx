import type * as React from "react";

import { navItemTrailingVariants } from "./variants";

export type NavItemTrailingProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The inline-end region of a nav row, holding trailing content such as a `NavItemCount` and/or a
 * `NavItemChevron`.
 */
export function NavItemTrailing(props: NavItemTrailingProps) {
  return <span className={navItemTrailingVariants()} {...props} />;
}
