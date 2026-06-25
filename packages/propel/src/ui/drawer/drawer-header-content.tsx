import type * as React from "react";

import { drawerHeaderContentVariants } from "./variants";

export type DrawerHeaderContentProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style"
> & {
  /** The stacked heading block — a `DrawerTitle` and an optional `DrawerDescription`. */
  children?: React.ReactNode;
};

/**
 * The stacked title + description inside a `DrawerHeader`. Groups them at the header's inline-start
 * so a corner close can sit opposite at the inline-end; a long title wraps instead of pushing the
 * close off the row.
 */
export function DrawerHeaderContent(props: DrawerHeaderContentProps) {
  return <div className={drawerHeaderContentVariants()} {...props} />;
}
