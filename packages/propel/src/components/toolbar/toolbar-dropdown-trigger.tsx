import { Menu } from "@base-ui/react/menu";

import { ToolbarDropdownTriggerSurface } from "../../ui/toolbar/index";

export type ToolbarDropdownTriggerProps = Omit<Menu.Trigger.Props, "className" | "style">;

/** The trigger that opens a `ToolbarDropdown`: a label plus chevron. */
export function ToolbarDropdownTrigger({ render, ...props }: ToolbarDropdownTriggerProps) {
  // The toolbar item renders as a `Menu.Trigger`; a consumer `render` customizes that
  // inner element (not the wrapping `Toolbar.Button`), so it is nested onto the trigger.
  return <ToolbarDropdownTriggerSurface render={<Menu.Trigger render={render} />} {...props} />;
}
