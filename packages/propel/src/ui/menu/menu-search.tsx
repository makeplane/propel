import type * as React from "react";

import { menuSearchVariants } from "./variants";

export type MenuSearchProps = Omit<React.ComponentPropsWithoutRef<"div">, "className" | "style">;

/** The sticky search row pinned above a menu popup list (a `MenuSearchIcon` + `MenuSearchInput`). */
export function MenuSearch(props: MenuSearchProps) {
  return <div className={menuSearchVariants()} {...props} />;
}
