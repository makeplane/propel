import type * as React from "react";

import { menuLabelTitleVariants } from "./variants";

export type MenuLabelTitleProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/** The growing title within a `MenuLabel`. Grows so a trailing `MenuLabelMeta` sits at the edge. */
export function MenuLabelTitle(props: MenuLabelTitleProps) {
  return <span className={menuLabelTitleVariants()} {...props} />;
}
