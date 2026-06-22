import { cx } from "class-variance-authority";
import type * as React from "react";

export const nodeSlotClass = cx(
  "inline-flex shrink-0 items-center justify-center",
  "[&>img]:size-(--node-size) [&>svg]:size-(--node-size)",
);

export type NodeSlotProps = React.ComponentPropsWithoutRef<"span">;

export function NodeSlot({ className, ...props }: NodeSlotProps) {
  return <span className={cx(nodeSlotClass, className)} {...props} />;
}
