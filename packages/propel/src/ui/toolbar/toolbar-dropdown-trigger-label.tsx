import type * as React from "react";

import { dropdownTriggerLabelVariants } from "./variants";

export type ToolbarDropdownTriggerLabelProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The text label of a toolbar dropdown trigger (e.g. "Text", "Aa"). Its own part so the trigger
 * button holds no raw typography — the button is the control, this is its label region.
 */
export function ToolbarDropdownTriggerLabel(props: ToolbarDropdownTriggerLabelProps) {
  return <span className={dropdownTriggerLabelVariants()} {...props} />;
}
