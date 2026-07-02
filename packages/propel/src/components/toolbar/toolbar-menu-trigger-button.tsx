import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import * as React from "react";

import {
  ToolbarMenuTriggerButton as ToolbarMenuTriggerButtonElement,
  type ToolbarMenuTriggerButtonProps as ToolbarMenuTriggerButtonElementProps,
  type ToolbarDensity,
} from "../../elements/toolbar";
import { ToolbarDensityContext } from "./toolbar-context";

export type ToolbarMenuTriggerButtonProps = Omit<
  ToolbarMenuTriggerButtonElementProps,
  "density"
> & {
  /** Density override; defaults to the surrounding `Toolbar`'s density. */
  density?: ToolbarDensity;
};

/**
 * A toolbar menu-trigger button: grafts Base UI's `Toolbar.Button` (roving-focus item) behavior
 * onto the styled `ToolbarMenuTriggerButton`, taking its `density` from the surrounding `Toolbar`.
 */
export function ToolbarMenuTriggerButton({ density, ...props }: ToolbarMenuTriggerButtonProps) {
  const toolbarDensity = React.useContext(ToolbarDensityContext);
  return (
    <BaseToolbar.Button
      render={<ToolbarMenuTriggerButtonElement density={density ?? toolbarDensity} {...props} />}
    />
  );
}
