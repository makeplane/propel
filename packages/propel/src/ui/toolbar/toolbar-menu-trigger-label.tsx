import type * as React from "react";

import { toolbarMenuTriggerLabelVariants } from "./variants";

export type ToolbarMenuTriggerLabelProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The trigger's label text (e.g. "Text", "Aa"). */
  children?: React.ReactNode;
};

/**
 * The text label of a toolbar menu trigger (e.g. "Text", "Aa"). Its own part so the trigger button
 * holds no raw typography — the button is the control, this is its label region.
 */
export function ToolbarMenuTriggerLabel(props: ToolbarMenuTriggerLabelProps) {
  return <span className={toolbarMenuTriggerLabelVariants()} {...props} />;
}
