import type * as React from "react";

import { menuLabelMetaVariants } from "./variants";

export type MenuLabelMetaProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** Trailing metadata text pinned at the label's inline-end. */
  children?: React.ReactNode;
};

/** Trailing metadata pinned at the inline-end of a `MenuLabel`. */
export function MenuLabelMeta(props: MenuLabelMetaProps) {
  return <span className={menuLabelMetaVariants()} {...props} />;
}
