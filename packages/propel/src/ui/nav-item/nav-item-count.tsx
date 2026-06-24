import type * as React from "react";

import { navItemCountVariants } from "./variants";

export type NavItemCountProps = Omit<React.ComponentProps<"span">, "className" | "style">;

/** A small count chip for a nav row's inline-end slot. */
export function NavItemCount(props: NavItemCountProps) {
  return <span className={navItemCountVariants()} {...props} />;
}
