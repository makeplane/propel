import type * as React from "react";

import { menuFooterVariants } from "./variants";

export type MenuFooterProps = Omit<React.ComponentPropsWithoutRef<"div">, "className" | "style">;

/** A non-interactive footer pinned below a menu popup list (sticky chrome outside `role="menu"`). */
export function MenuFooter(props: MenuFooterProps) {
  return <div className={menuFooterVariants()} {...props} />;
}
