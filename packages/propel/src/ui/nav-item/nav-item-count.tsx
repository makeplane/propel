import type * as React from "react";

import { navItemCountClass } from "./variants";

/** A small count chip for a nav row's inline-end slot. */
export function NavItemCount(props: Omit<React.ComponentProps<"span">, "className" | "style">) {
  return <span className={navItemCountClass} {...props} />;
}
