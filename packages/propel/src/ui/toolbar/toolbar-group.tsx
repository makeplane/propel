import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type * as React from "react";

export type ToolbarGroupProps = Omit<
  React.ComponentProps<typeof BaseToolbar.Group>,
  "className" | "style"
>;

/** Groups related controls with a small gap between them. */
export function ToolbarGroup(props: ToolbarGroupProps) {
  return <BaseToolbar.Group className="flex items-center gap-0.5" {...props} />;
}
