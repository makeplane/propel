import { Menu } from "@base-ui/react/menu";

import {
  ToolbarMenuTriggerButton,
  ToolbarMenuTriggerIndicator,
  ToolbarMenuTriggerLabel,
} from "../../ui/toolbar/index";

export type ToolbarMenuTriggerProps = Omit<Menu.Trigger.Props, "className" | "style">;

/** The trigger that opens a `ToolbarMenu`: a label plus a disclosure chevron. */
export function ToolbarMenuTrigger({ render, children, ...props }: ToolbarMenuTriggerProps) {
  // The toolbar item renders as a `Menu.Trigger`; a consumer `render` customizes that
  // inner element (not the wrapping button), so it is nested onto the trigger.
  return (
    <ToolbarMenuTriggerButton render={<Menu.Trigger render={render} />} {...props}>
      <ToolbarMenuTriggerLabel>{children}</ToolbarMenuTriggerLabel>
      <ToolbarMenuTriggerIndicator />
    </ToolbarMenuTriggerButton>
  );
}
