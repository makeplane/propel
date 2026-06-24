import type * as React from "react";

import { navItemHeaderActionVariants } from "./variants";

export type NavItemHeaderActionProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * An inline-end action inside a `NavItemHeader`, a sibling of the toggle (so activating it does not
 * collapse the section). Sizes its single child to the header's `--node-size`.
 */
export function NavItemHeaderAction(props: NavItemHeaderActionProps) {
  return <span className={navItemHeaderActionVariants()} {...props} />;
}
