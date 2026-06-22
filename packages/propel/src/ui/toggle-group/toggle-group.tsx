import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";

import { ToggleGroupContext } from "../toggle/toggle-group-context";
import type { ToggleMagnitude } from "../toggle/variants";
import { toggleGroupVariants } from "./variants";

export type ToggleGroupProps<Value extends string = string> = Omit<
  BaseToggleGroup.Props<Value>,
  "className" | "style"
> & {
  /** Size applied to every `Toggle` in the group (each `Toggle` can still override it). */
  magnitude?: ToggleMagnitude;
};

/**
 * Groups related `Toggle`s, managing single- or multi-select state and roving focus. Pass `value` +
 * `onValueChange` (array; `toggleMultiple` to allow more than one pressed). `magnitude` sizes every
 * toggle inside via context. Maps 1:1 to Base UI's `ToggleGroup`.
 */
export function ToggleGroup<Value extends string = string>({
  magnitude = "md",
  children,
  ...props
}: ToggleGroupProps<Value>) {
  return (
    <BaseToggleGroup className={toggleGroupVariants()} {...props}>
      <ToggleGroupContext.Provider value={magnitude}>{children}</ToggleGroupContext.Provider>
    </BaseToggleGroup>
  );
}
