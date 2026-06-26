import type * as React from "react";

import {
  Toolbar as ToolbarElement,
  type ToolbarProps as ToolbarElementProps,
} from "../../ui/toolbar";
import { ToolbarDensityContext } from "./toolbar-context";

export type ToolbarProps = ToolbarElementProps & {
  children?: React.ReactNode;
};

/**
 * The ready-made toolbar: shares its `density` with the controls inside via context (so each
 * control packs to match), composed around the single-element `ui/toolbar` row.
 */
export function Toolbar({ density, children, ...props }: ToolbarProps) {
  return (
    <ToolbarDensityContext.Provider value={density}>
      <ToolbarElement density={density} {...props}>
        {children}
      </ToolbarElement>
    </ToolbarDensityContext.Provider>
  );
}
