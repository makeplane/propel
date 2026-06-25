import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";

import { toggleGroupVariants } from "./variants";

export type ToggleGroupProps<Value extends string = string> = Omit<
  BaseToggleGroup.Props<Value>,
  "className" | "style"
>;

/**
 * Groups related `Toggle`s, managing single- or multi-select state and roving focus. Pass `value` +
 * `onValueChange` (array; `multiple` to allow more than one pressed). Maps 1:1 to Base UI's
 * `ToggleGroup`. The shared-`magnitude` behavior is the ready-made `components/toggle-group`, which
 * wraps this in the `ToggleGroupContext` provider.
 */
export function ToggleGroup<Value extends string = string>(props: ToggleGroupProps<Value>) {
  return <BaseToggleGroup className={toggleGroupVariants()} {...props} />;
}
