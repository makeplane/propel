import type * as React from "react";

import { navItemLabelVariants } from "./variants";

export type NavItemLabelProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">;

/**
 * A nav row's label. Grows to fill the row so trailing content (a `NavItemTrailing`) sits at the
 * inline-end edge, and truncates long text on a single line.
 */
export function NavItemLabel(props: NavItemLabelProps) {
  return <span className={navItemLabelVariants()} {...props} />;
}
