import type * as React from "react";

import {
  ToggleGroup as ToggleGroupRoot,
  type ToggleGroupProps as ToggleGroupRootProps,
} from "../../ui/toggle-group";
import type { ToggleMagnitude } from "../../ui/toggle/variants";
import { ToggleGroupContext } from "../toggle/toggle-group-context";

export type ToggleGroupProps<Value extends string = string> = ToggleGroupRootProps<Value> & {
  /** Size applied to every `Toggle` in the group (each `Toggle` can still override it). */
  magnitude: ToggleMagnitude;
  children?: React.ReactNode;
};

/**
 * The ready-made toggle group: shares `magnitude` with every `Toggle` inside via context (a
 * `Toggle`'s own `magnitude` still wins), composed around the `ui/toggle-group` primitive (which
 * manages single/multi-select state + roving focus).
 */
export function ToggleGroup<Value extends string = string>({
  magnitude,
  children,
  ...props
}: ToggleGroupProps<Value>) {
  return (
    <ToggleGroupContext.Provider value={magnitude}>
      <ToggleGroupRoot {...props}>{children}</ToggleGroupRoot>
    </ToggleGroupContext.Provider>
  );
}
