import type * as React from "react";

import { navItemHeaderVariants } from "./variants";

export type NavItemHeaderProps = Omit<React.ComponentPropsWithoutRef<"div">, "className" | "style">;

/**
 * A sidebar section header row. Holds a `NavItemHeaderToggle` (which collapses the section) and an
 * optional inline-end action as siblings.
 */
export function NavItemHeader(props: NavItemHeaderProps) {
  return <div className={navItemHeaderVariants()} {...props} />;
}
