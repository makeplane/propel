import type * as React from "react";

import { drawerBodyVariants } from "./variants";

export type DrawerBodyProps = Omit<React.ComponentPropsWithoutRef<"div">, "className" | "style">;

/**
 * The drawer's main content region (the Figma body). Grows to fill the space between the header and
 * footer and scrolls its own overflow.
 */
export function DrawerBody(props: DrawerBodyProps) {
  return <div className={drawerBodyVariants()} {...props} />;
}
