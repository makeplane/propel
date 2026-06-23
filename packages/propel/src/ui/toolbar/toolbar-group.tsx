import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";

import { toolbarGroupVariants } from "./variants";

export type ToolbarGroupProps = Omit<BaseToolbar.Group.Props, "className" | "style">;

/** Groups related controls with a small gap between them. */
export function ToolbarGroup(props: ToolbarGroupProps) {
  return <BaseToolbar.Group className={toolbarGroupVariants()} {...props} />;
}
