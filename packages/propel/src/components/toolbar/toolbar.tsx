import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type * as React from "react";

import {
  Toolbar as ToolbarElement,
  type ToolbarProps as ToolbarElementProps,
} from "../../elements/toolbar";
import { ToolbarDensityContext } from "./toolbar-context";

export type ToolbarProps = ToolbarElementProps & {
  children?: React.ReactNode;
};

/**
 * The ready-made toolbar: grafts Base UI's `Toolbar.Root` behavior (the `toolbar` role + roving
 * focus) onto the styled `elements/toolbar` row and shares its `density` with the controls inside
 * via context (so each control packs to match).
 */
export function Toolbar({ density, children, ...props }: ToolbarProps) {
  return (
    <ToolbarDensityContext.Provider value={density}>
      <BaseToolbar.Root render={<ToolbarElement density={density} {...props} />}>
        {children}
      </BaseToolbar.Root>
    </ToolbarDensityContext.Provider>
  );
}
