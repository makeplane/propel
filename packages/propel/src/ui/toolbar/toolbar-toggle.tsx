import { Toggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";

import { type ToolbarDensity, toolbarItemVariants } from "./variants";

export type ToolbarToggleProps<Value extends string = string> = Omit<
  BaseToggleTypes.Props<Value>,
  "className" | "style"
> & {
  /** Accessible name for the icon toggle. */
  "aria-label": string;
  /** Control sizing, matching the toolbar's density. */
  density: ToolbarDensity;
};

/** A two-state button for formatting toggles like bold or italic. */
export function ToolbarToggle<Value extends string = string>({
  render,
  density,
  ...props
}: ToolbarToggleProps<Value>) {
  return (
    <BaseToolbar.Button
      render={<Toggle render={render} />}
      className={toolbarItemVariants({ density })}
      {...props}
    />
  );
}
