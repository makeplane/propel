import type * as React from "react";

import { drawerHeaderVariants } from "./variants";

export type DrawerHeaderProps = Omit<
  React.ComponentPropsWithoutRef<"header">,
  "className" | "style"
> & {
  /** The header's contents — typically a `DrawerHeaderContent` and an optional corner close. */
  children?: React.ReactNode;
};

/**
 * The drawer's top region (the Figma header). Lays the title/description heading block at the
 * inline-start and an optional corner close at the inline-end on one baseline. Compose a
 * `DrawerHeaderContent` for the title/description stack.
 */
export function DrawerHeader(props: DrawerHeaderProps) {
  return <header className={drawerHeaderVariants()} {...props} />;
}
