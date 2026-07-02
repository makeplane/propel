import { Toggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import * as React from "react";

import {
  ToolbarButton as ToolbarButtonElement,
  type ToolbarButtonProps,
  type ToolbarDensity,
} from "../../elements/toolbar";
import { Icon } from "../../internal/icon";
import { ToolbarDensityContext } from "./toolbar-context";

export type ToolbarToggleProps<Value extends string = string> = Omit<
  BaseToggleTypes.Props<Value>,
  "className" | "style" | "render"
> & {
  /** Density override; defaults to the surrounding `Toolbar`'s density. */
  density?: ToolbarDensity;
  /** Accessible name for the icon toggle. */
  "aria-label": string;
  /** Custom render for the underlying styled toolbar button. */
  render?: ToolbarButtonProps["render"];
};

/**
 * A two-state toolbar button for formatting toggles like bold or italic. Grafts Base UI's
 * `Toolbar.Button` (roving-focus item) and `Toggle` (pressed state) behaviors onto the styled
 * `ToolbarButton`, and takes its `density` from the surrounding `Toolbar` via context.
 */
export function ToolbarToggle<Value extends string = string>({
  render,
  density,
  children,
  "aria-label": ariaLabel,
  ...toggleProps
}: ToolbarToggleProps<Value>) {
  const toolbarDensity = React.useContext(ToolbarDensityContext);
  return (
    <BaseToolbar.Button
      render={
        <Toggle
          {...toggleProps}
          render={
            <ToolbarButtonElement
              density={density ?? toolbarDensity}
              aria-label={ariaLabel}
              render={render}
            />
          }
        />
      }
    >
      <Icon>{children}</Icon>
    </BaseToolbar.Button>
  );
}
