import type * as React from "react";

import { menubarTriggerLabelVariants } from "./variants";

export type MenubarTriggerLabelProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/** The label of a menu bar trigger. Truncates instead of overflowing the bar. */
export function MenubarTriggerLabel(props: MenubarTriggerLabelProps) {
  return <span className={menubarTriggerLabelVariants()} {...props} />;
}
