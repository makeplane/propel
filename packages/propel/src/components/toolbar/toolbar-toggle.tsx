import { Toggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";
import * as React from "react";

import { ToolbarButton as ToolbarButtonElement, type ToolbarDensity } from "../../ui/toolbar";
import { ToolbarDensityContext } from "./toolbar-context";

export type ToolbarToggleProps<Value extends string = string> = Omit<
  BaseToggleTypes.Props<Value>,
  "className" | "style"
> & {
  /** Density override; defaults to the surrounding `Toolbar`'s density. */
  density?: ToolbarDensity;
  /** Accessible name for the icon toggle. */
  "aria-label": string;
};

/**
 * A two-state toolbar button for formatting toggles like bold or italic. Composes the styled
 * `ToolbarButton` with `Toggle` behavior, and takes its `density` from the surrounding `Toolbar`
 * via context.
 */
export function ToolbarToggle<Value extends string = string>({
  render,
  density,
  "aria-label": ariaLabel,
  ...toggleProps
}: ToolbarToggleProps<Value>) {
  const toolbarDensity = React.useContext(ToolbarDensityContext);
  return (
    <ToolbarButtonElement
      density={density ?? toolbarDensity}
      aria-label={ariaLabel}
      render={<Toggle render={render} {...toggleProps} />}
    />
  );
}
