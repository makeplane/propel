import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";

import { ToolbarToggleGroup as ToolbarToggleGroupElement } from "../../elements/toolbar";

export type ToolbarToggleGroupProps<Value extends string = string> = Omit<
  BaseToggleGroup.Props<Value>,
  "className" | "style"
>;

/**
 * A cluster of `ToolbarToggle`s sharing one selection: Base UI `ToggleGroup`'s single/`multiple`
 * value state grafted onto the styled `elements` toggle-group container. Drive it with
 * `value`/`defaultValue` + `onValueChange`, and give it an `aria-label` naming the cluster.
 */
export function ToolbarToggleGroup<Value extends string = string>(
  props: ToolbarToggleGroupProps<Value>,
) {
  return <BaseToggleGroup render={<ToolbarToggleGroupElement />} {...props} />;
}
