import type * as React from "react";

import { navigationMenuTriggerLabelVariants } from "./variants";

export type NavigationMenuTriggerLabelProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The trigger's label text. */
  children?: React.ReactNode;
};

/**
 * The trigger's text label, sitting beside the disclosure `NavigationMenuIcon`. Splitting the label
 * into its own part keeps `NavigationMenuTrigger` a single styled element that composes parts
 * rather than baking in raw text.
 */
export function NavigationMenuTriggerLabel(props: NavigationMenuTriggerLabelProps) {
  return <span className={navigationMenuTriggerLabelVariants()} {...props} />;
}
