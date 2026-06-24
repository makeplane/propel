import * as React from "react";

import {
  ToolbarToggle as ToolbarToggleElement,
  type ToolbarToggleProps as ToolbarToggleElementProps,
  type ToolbarDensity,
} from "../../ui/toolbar";
import { ToolbarDensityContext } from "./toolbar-context";

export type ToolbarToggleProps<Value extends string = string> = Omit<
  ToolbarToggleElementProps<Value>,
  "density"
> & {
  /** Density override; defaults to the surrounding `Toolbar`'s density. */
  density?: ToolbarDensity;
};

/** A toolbar formatting toggle that takes its `density` from the surrounding `Toolbar` via context. */
export function ToolbarToggle<Value extends string = string>({
  density,
  ...props
}: ToolbarToggleProps<Value>) {
  const toolbarDensity = React.useContext(ToolbarDensityContext);
  return <ToolbarToggleElement density={density ?? toolbarDensity} {...props} />;
}
