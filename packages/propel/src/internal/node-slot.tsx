import { cx } from "class-variance-authority";
import type * as React from "react";

export const nodeSlotClass = cx(
  "inline-flex shrink-0 items-center justify-center",
  "[&>img]:size-(--node-size) [&>svg]:size-(--node-size)",
);

// Like every propel part, the slot takes no `className`/`style`: it only sizes its
// single child to the inherited `--node-size`. A slot that needs a tint or a specific
// node size is a named part (e.g. `AccordionTriggerIcon`) that bakes that in and
// reuses `nodeSlotClass` — not a `className` at the call site. Set `--node-size` on an
// ancestor (it inherits) to size the child.
export type NodeSlotProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">;

export function NodeSlot(props: NodeSlotProps) {
  return <span className={nodeSlotClass} {...props} />;
}
