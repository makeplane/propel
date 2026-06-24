import * as React from "react";

import {
  Toggle as ToggleElement,
  type ToggleProps as ToggleElementProps,
  type ToggleMagnitude,
} from "../../ui/toggle";
import { ToggleGroupContext } from "./toggle-group-context";

export type ToggleProps<Value extends string = string> = Omit<
  ToggleElementProps<Value>,
  "magnitude"
> & {
  /**
   * Size override. Inside a `ToggleGroup` the group's `magnitude` is used (so you can omit it);
   * standalone it defaults to `md`.
   */
  magnitude?: ToggleMagnitude;
};

/** The ready-made toggle: takes its `magnitude` from the surrounding `ToggleGroup` via context. */
export function Toggle<Value extends string = string>({ magnitude, ...props }: ToggleProps<Value>) {
  const groupMagnitude = React.useContext(ToggleGroupContext);
  return <ToggleElement magnitude={magnitude ?? groupMagnitude ?? "md"} {...props} />;
}
