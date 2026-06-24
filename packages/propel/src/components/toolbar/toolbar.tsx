import type * as React from "react";

import { Toolbar as ToolbarRoot, type ToolbarProps as ToolbarRootProps } from "../../ui/toolbar";
import { ToolbarDensityContext } from "../../ui/toolbar/toolbar-context";

export type ToolbarProps = ToolbarRootProps & {
  children?: React.ReactNode;
};

/**
 * The ready-made toolbar: shares its `density` with the controls inside via context (so each
 * control packs to match), composed around the single-element `ui/toolbar` row.
 */
export function Toolbar({ density, children, ...props }: ToolbarProps) {
  return (
    <ToolbarDensityContext.Provider value={density}>
      <ToolbarRoot density={density} {...props}>
        {children}
      </ToolbarRoot>
    </ToolbarDensityContext.Provider>
  );
}
