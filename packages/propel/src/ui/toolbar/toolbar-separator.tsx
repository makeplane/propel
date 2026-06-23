import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";

import { separatorVariants } from "./variants";

export type ToolbarSeparatorProps = Omit<BaseToolbar.Separator.Props, "className" | "style">;

/** A thin vertical rule that visually divides one cluster of controls from the next. */
export function ToolbarSeparator(props: ToolbarSeparatorProps) {
  return <BaseToolbar.Separator className={separatorVariants()} {...props} />;
}
