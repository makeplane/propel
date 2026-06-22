import { ToggleGroup } from "@base-ui/react/toggle-group";
import type { ToggleGroup as BaseToggleGroupTypes } from "@base-ui/react/toggle-group";

export type ToolbarToggleGroupProps<Value extends string = string> = Omit<
  BaseToggleGroupTypes.Props<Value>,
  "className" | "style"
> & {
  /** Allow more than one toggle in the group to be pressed at once. */
  multiple?: boolean;
};

/** A set of `ToolbarToggle`s that share state. */
export function ToolbarToggleGroup<Value extends string = string>(
  props: ToolbarToggleGroupProps<Value>,
) {
  return <ToggleGroup className="flex items-center gap-0.5" {...props} />;
}
