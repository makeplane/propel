import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import * as React from "react";

import { ToolbarDensityContext } from "./toolbar-context";
import { toolbarDropdownTriggerButtonVariants } from "./variants";

export type ToolbarDropdownTriggerButtonProps = Omit<
  BaseToolbar.Button.Props,
  "className" | "style"
>;

/** The styled chrome for a toolbar dropdown trigger: a text label slot with density-aware sizing. */
export function ToolbarDropdownTriggerButton(props: ToolbarDropdownTriggerButtonProps) {
  const density = React.useContext(ToolbarDensityContext);
  return (
    <BaseToolbar.Button className={toolbarDropdownTriggerButtonVariants({ density })} {...props} />
  );
}
