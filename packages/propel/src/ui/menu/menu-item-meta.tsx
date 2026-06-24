import type * as React from "react";

import { menuItemMetaVariants } from "./variants";

export type MenuItemMetaProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">;

/** Trailing muted metadata after the title column (e.g. a keyboard shortcut). */
export function MenuItemMeta(props: MenuItemMetaProps) {
  return <span className={menuItemMetaVariants()} {...props} />;
}
