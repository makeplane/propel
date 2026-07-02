import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";

import {
  ToolbarGroup as ToolbarGroupElement,
  type ToolbarGroupProps as ToolbarGroupElementProps,
} from "../../elements/toolbar";

export type ToolbarGroupProps = ToolbarGroupElementProps;

/**
 * Groups related controls with a small gap between them: grafts Base UI's `Toolbar.Group` behavior
 * (the `group` role) onto the styled `ToolbarGroup` cluster.
 */
export function ToolbarGroup(props: ToolbarGroupProps) {
  return <BaseToolbar.Group render={<ToolbarGroupElement {...props} />} />;
}
