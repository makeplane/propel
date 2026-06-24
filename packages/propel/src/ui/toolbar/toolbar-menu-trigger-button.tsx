import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import * as React from "react";

import { ToolbarDensityContext } from "./toolbar-context";
import { toolbarMenuTriggerButtonVariants } from "./variants";

export type ToolbarMenuTriggerButtonProps = Omit<BaseToolbar.Button.Props, "className" | "style">;

/** The styled chrome for a toolbar menu trigger: a text label slot with density-aware sizing. */
export function ToolbarMenuTriggerButton(props: ToolbarMenuTriggerButtonProps) {
  const density = React.useContext(ToolbarDensityContext);
  return (
    <BaseToolbar.Button className={toolbarMenuTriggerButtonVariants({ density })} {...props} />
  );
}
