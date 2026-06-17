import { Menu } from "@base-ui/react/menu";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import {
  dropdownChevronVariants,
  dropdownTriggerVariants,
  ToolbarDensityContext,
} from "./toolbar-context";

export type ToolbarDropdownTriggerProps = Omit<
  React.ComponentProps<typeof Menu.Trigger>,
  "className" | "render" | "style"
>;

/** The trigger that opens a `ToolbarDropdown`: a label plus chevron. */
export function ToolbarDropdownTrigger({ children, ...props }: ToolbarDropdownTriggerProps) {
  const density = React.useContext(ToolbarDensityContext);
  return (
    <BaseToolbar.Button
      render={<Menu.Trigger />}
      className={dropdownTriggerVariants({ density })}
      {...props}
    >
      {children}
      <ChevronDown aria-hidden className={dropdownChevronVariants({ density })} />
    </BaseToolbar.Button>
  );
}
