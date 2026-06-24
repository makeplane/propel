import * as React from "react";

import {
  ToolbarButton as ToolbarButtonRoot,
  type ToolbarButtonProps as ToolbarButtonRootProps,
  type ToolbarDensity,
} from "../../ui/toolbar";
import { ToolbarDensityContext } from "./toolbar-context";

export type ToolbarButtonProps = Omit<ToolbarButtonRootProps, "density"> & {
  /** Density override; defaults to the surrounding `Toolbar`'s density. */
  density?: ToolbarDensity;
};

/** A toolbar action button that takes its `density` from the surrounding `Toolbar` via context. */
export function ToolbarButton({ density, ...props }: ToolbarButtonProps) {
  const toolbarDensity = React.useContext(ToolbarDensityContext);
  return <ToolbarButtonRoot density={density ?? toolbarDensity} {...props} />;
}
