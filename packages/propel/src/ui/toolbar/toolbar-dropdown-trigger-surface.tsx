import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { ToolbarDensityContext } from "./toolbar-context";
import { dropdownChevronVariants, dropdownTriggerVariants } from "./variants";

export type ToolbarDropdownTriggerSurfaceProps = Omit<
  BaseToolbar.Button.Props,
  "className" | "style"
>;

/** The styled chrome for a toolbar dropdown trigger: a label slot plus a chevron. */
export function ToolbarDropdownTriggerSurface({
  children,
  ...props
}: ToolbarDropdownTriggerSurfaceProps) {
  const density = React.useContext(ToolbarDensityContext);
  return (
    <BaseToolbar.Button className={dropdownTriggerVariants({ density })} {...props}>
      {children}
      <ChevronDown aria-hidden className={dropdownChevronVariants({ density })} />
    </BaseToolbar.Button>
  );
}
