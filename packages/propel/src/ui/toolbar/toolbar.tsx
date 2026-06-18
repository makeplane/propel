import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type * as React from "react";

import {
  ToolbarDensityContext,
  type ToolbarDensity,
  type ToolbarElevation,
} from "./toolbar-context";
import { toolbarVariants } from "./variants";

export type { ToolbarDensity, ToolbarElevation } from "./toolbar-context";

export type ToolbarProps = Omit<
  React.ComponentProps<typeof BaseToolbar.Root>,
  "className" | "style"
> & {
  /** Whether the toolbar draws its own surface. */
  elevation: ToolbarElevation;
  /** How tightly the controls pack. */
  density: ToolbarDensity;
};

/** A row of controls built on Base UI's `Toolbar`. */
export function Toolbar({ elevation, density, ...props }: ToolbarProps) {
  return (
    <ToolbarDensityContext.Provider value={density}>
      <BaseToolbar.Root className={toolbarVariants({ density, elevation })} {...props} />
    </ToolbarDensityContext.Provider>
  );
}
