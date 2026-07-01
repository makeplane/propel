import * as React from "react";

import { dialogHeadingVariants } from "./variants";

export type DialogHeadingProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> & {
  /** The heading block's contents — a `DialogTitle` and an optional `DialogDescription`. */
  children?: React.ReactNode;
};

/**
 * The heading block inside a `DialogHeader`: stacks the `DialogTitle` over an optional
 * `DialogDescription` with a tight gap, sitting at the header's inline-start opposite the close
 * button. Holding the title/description together as one block keeps them aligned to the start while
 * the close stays pinned to the inline-end corner.
 */
export function DialogHeading(props: DialogHeadingProps) {
  return <div className={dialogHeadingVariants()} {...props} />;
}
