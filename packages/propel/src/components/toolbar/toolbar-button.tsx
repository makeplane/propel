import * as React from "react";

import {
  ToolbarButton as ToolbarButtonElement,
  type ToolbarButtonProps as ToolbarButtonElementProps,
  type ToolbarDensity,
} from "../../ui/toolbar";
import { ToolbarDensityContext } from "./toolbar-context";

export type ToolbarButtonProps = Omit<ToolbarButtonElementProps, "density"> & {
  /** Density override; defaults to the surrounding `Toolbar`'s density. */
  density?: ToolbarDensity;
};

/** A toolbar action button that takes its `density` from the surrounding `Toolbar` via context. */
export function ToolbarButton({ density, ...props }: ToolbarButtonProps) {
  const toolbarDensity = React.useContext(ToolbarDensityContext);
  return <ToolbarButtonElement density={density ?? toolbarDensity} {...props} />;
}
