import { Toggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import * as React from "react";

import { itemVariants, ToolbarDensityContext } from "./toolbar-context";

export type ToolbarToggleProps<Value extends string = string> = Omit<
  BaseToggleTypes.Props<Value>,
  "className" | "render" | "style"
> & {
  /** Accessible name for the icon toggle. */
  "aria-label": string;
};

/** A two-state button for formatting toggles like bold or italic. */
export function ToolbarToggle<Value extends string = string>(props: ToolbarToggleProps<Value>) {
  const density = React.useContext(ToolbarDensityContext);
  return (
    <BaseToolbar.Button render={<Toggle />} className={itemVariants({ density })} {...props} />
  );
}
