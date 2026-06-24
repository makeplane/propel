import { Toggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import * as React from "react";

import { ToolbarDensityContext } from "./toolbar-context";
import { toolbarItemVariants } from "./variants";

export type ToolbarToggleProps<Value extends string = string> = Omit<
  BaseToggleTypes.Props<Value>,
  "className" | "style"
> & {
  /** Accessible name for the icon toggle. */
  "aria-label": string;
};

/** A two-state button for formatting toggles like bold or italic. */
export function ToolbarToggle<Value extends string = string>({
  render,
  ...props
}: ToolbarToggleProps<Value>) {
  const density = React.useContext(ToolbarDensityContext);
  // The toolbar item renders as a `Toggle`; a consumer `render` customizes that inner
  // element (not the wrapping `Toolbar.Button`), so it is nested onto the `Toggle`.
  return (
    <BaseToolbar.Button
      render={<Toggle render={render} />}
      className={toolbarItemVariants({ density })}
      {...props}
    />
  );
}
