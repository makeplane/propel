import * as React from "react";

import {
  ToolbarToggle as ToolbarToggleRoot,
  type ToolbarToggleProps as ToolbarToggleRootProps,
  type ToolbarDensity,
} from "../../ui/toolbar";
import { ToolbarDensityContext } from "./toolbar-context";

export type ToolbarToggleProps<Value extends string = string> = Omit<
  ToolbarToggleRootProps<Value>,
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
  return <ToolbarToggleRoot density={density ?? toolbarDensity} {...props} />;
}
