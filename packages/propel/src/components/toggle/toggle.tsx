import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";
import * as React from "react";

import { Toggle as ToggleElement, type ToggleMagnitude } from "../../elements/toggle";
import { Icon } from "../../internal/icon";
import { ToggleGroupContext } from "./toggle-group-context";

export type ToggleProps<Value extends string = string> = Omit<
  BaseToggleTypes.Props<Value>,
  "className" | "style"
> & {
  /**
   * Size override. Inside a `ToggleGroup` the group's `magnitude` is used (so you can omit it);
   * standalone it defaults to `md`.
   */
  magnitude?: ToggleMagnitude;
};

/**
 * The ready-made toggle: grafts Base UI's `Toggle` behavior onto the styled `Toggle` button
 * (behavior outer, the styled button as the render target), taking its `magnitude` from the
 * surrounding `ToggleGroup` via context.
 */
export function Toggle<Value extends string = string>({
  magnitude,
  children,
  ...toggleProps
}: ToggleProps<Value>) {
  const groupMagnitude = React.useContext(ToggleGroupContext);
  return (
    <BaseToggle
      {...toggleProps}
      render={<ToggleElement magnitude={magnitude ?? groupMagnitude ?? "md"} />}
    >
      <Icon>{children}</Icon>
    </BaseToggle>
  );
}
