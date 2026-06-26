import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";

import {
  type ToolbarMenuTriggerButtonVariantProps,
  toolbarMenuTriggerButtonVariants,
} from "./variants";

export type ToolbarMenuTriggerButtonProps = Omit<BaseToolbar.Button.Props, "className" | "style"> &
  ToolbarMenuTriggerButtonVariantProps;

/** The styled chrome for a toolbar menu trigger: a text label slot with density-aware sizing. */
export function ToolbarMenuTriggerButton({ density, ...props }: ToolbarMenuTriggerButtonProps) {
  return (
    <BaseToolbar.Button className={toolbarMenuTriggerButtonVariants({ density })} {...props} />
  );
}
