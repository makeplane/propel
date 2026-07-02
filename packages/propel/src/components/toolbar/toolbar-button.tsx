import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import * as React from "react";

import {
  ToolbarButton as ToolbarButtonElement,
  type ToolbarButtonProps as ToolbarButtonElementProps,
  type ToolbarDensity,
} from "../../elements/toolbar";
import { ToolbarDensityContext } from "./toolbar-context";

export type ToolbarButtonProps = Omit<ToolbarButtonElementProps, "density"> & {
  /** Density override; defaults to the surrounding `Toolbar`'s density. */
  density?: ToolbarDensity;
  /** Accessible name for the icon button. */
  "aria-label": string;
};

/**
 * A toolbar action button: grafts Base UI's `Toolbar.Button` (roving-focus item) behavior onto the
 * styled `ToolbarButton`, taking its `density` from the surrounding `Toolbar` via context.
 */
export function ToolbarButton({ density, ...props }: ToolbarButtonProps) {
  const toolbarDensity = React.useContext(ToolbarDensityContext);
  return (
    <BaseToolbar.Button
      render={<ToolbarButtonElement density={density ?? toolbarDensity} {...props} />}
    />
  );
}
