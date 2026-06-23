import { Menu } from "@base-ui/react/menu";

import {
  ToolbarDropdownTriggerButton,
  ToolbarDropdownTriggerIndicator,
} from "../../ui/toolbar/index";

export type ToolbarDropdownTriggerProps = Omit<Menu.Trigger.Props, "className" | "style">;

/** The trigger that opens a `ToolbarDropdown`: a label plus a disclosure chevron. */
export function ToolbarDropdownTrigger({
  render,
  children,
  ...props
}: ToolbarDropdownTriggerProps) {
  // The toolbar item renders as a `Menu.Trigger`; a consumer `render` customizes that
  // inner element (not the wrapping button), so it is nested onto the trigger.
  return (
    <ToolbarDropdownTriggerButton render={<Menu.Trigger render={render} />} {...props}>
      {children}
      <ToolbarDropdownTriggerIndicator />
    </ToolbarDropdownTriggerButton>
  );
}
