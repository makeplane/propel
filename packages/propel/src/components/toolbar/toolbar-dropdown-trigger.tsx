import { Menu } from "@base-ui/react/menu";
import type * as React from "react";

import { ToolbarDropdownTriggerSurface } from "../../ui/toolbar/index";

export type ToolbarDropdownTriggerProps = Omit<
  React.ComponentProps<typeof Menu.Trigger>,
  "className" | "style"
>;

/** The trigger that opens a `ToolbarDropdown`: a label plus chevron. */
export function ToolbarDropdownTrigger({
  children,
  render,
  ...props
}: ToolbarDropdownTriggerProps) {
  // The toolbar item renders as a `Menu.Trigger`; a consumer `render` customizes that
  // inner element (not the wrapping `Toolbar.Button`), so it is nested onto the trigger.
  return (
    <ToolbarDropdownTriggerSurface render={<Menu.Trigger render={render} />} {...props}>
      {children}
    </ToolbarDropdownTriggerSurface>
  );
}
