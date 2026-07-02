import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import type * as React from "react";

import { ToggleGroup as ToggleGroupElement } from "../../elements/toggle-group";
import type { ToggleMagnitude } from "../../elements/toggle/variants";
import { ToggleGroupContext } from "../toggle/toggle-group-context";

export type ToggleGroupProps<Value extends string = string> = Omit<
  BaseToggleGroup.Props<Value>,
  "className" | "style"
> & {
  /** Size applied to every `Toggle` in the group (each `Toggle` can still override it). */
  magnitude: ToggleMagnitude;
  children?: React.ReactNode;
};

/**
 * The ready-made toggle group: shares `magnitude` with every `Toggle` inside via context (a
 * `Toggle`'s own `magnitude` still wins), grafting Base UI's single/multi-select state + roving
 * focus onto the `elements/toggle-group` styled container.
 */
export function ToggleGroup<Value extends string = string>({
  magnitude,
  ...props
}: ToggleGroupProps<Value>) {
  return (
    <ToggleGroupContext.Provider value={magnitude}>
      <BaseToggleGroup render={<ToggleGroupElement />} {...props} />
    </ToggleGroupContext.Provider>
  );
}
