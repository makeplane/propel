import { ToggleGroup } from "@base-ui/react/toggle-group";
import type * as React from "react";

export type ToolbarToggleGroupProps = Omit<
  React.ComponentProps<typeof ToggleGroup>,
  "className" | "render" | "style"
> & {
  /** Allow more than one toggle in the group to be pressed at once. */
  multiple?: boolean;
};

/** A set of `ToolbarToggle`s that share state. */
export function ToolbarToggleGroup(props: ToolbarToggleGroupProps) {
  return <ToggleGroup className="flex items-center gap-0.5" {...props} />;
}
