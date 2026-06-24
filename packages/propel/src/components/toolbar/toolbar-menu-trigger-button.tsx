import * as React from "react";

import {
  ToolbarMenuTriggerButton as ToolbarMenuTriggerButtonElement,
  type ToolbarMenuTriggerButtonProps as ToolbarMenuTriggerButtonElementProps,
  type ToolbarDensity,
} from "../../ui/toolbar";
import { ToolbarDensityContext } from "./toolbar-context";

export type ToolbarMenuTriggerButtonProps = Omit<
  ToolbarMenuTriggerButtonElementProps,
  "density"
> & {
  /** Density override; defaults to the surrounding `Toolbar`'s density. */
  density?: ToolbarDensity;
};

/** A toolbar menu-trigger button that takes its `density` from the surrounding `Toolbar`. */
export function ToolbarMenuTriggerButton({ density, ...props }: ToolbarMenuTriggerButtonProps) {
  const toolbarDensity = React.useContext(ToolbarDensityContext);
  return <ToolbarMenuTriggerButtonElement density={density ?? toolbarDensity} {...props} />;
}
