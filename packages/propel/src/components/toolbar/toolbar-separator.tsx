import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";

import {
  ToolbarSeparator as ToolbarSeparatorElement,
  type ToolbarSeparatorProps as ToolbarSeparatorElementProps,
} from "../../elements/toolbar";

export type ToolbarSeparatorProps = ToolbarSeparatorElementProps;

/**
 * A thin vertical rule that visually divides one cluster of controls from the next: grafts Base
 * UI's `Toolbar.Separator` behavior (the `separator` role + orientation) onto the styled rule.
 */
export function ToolbarSeparator(props: ToolbarSeparatorProps) {
  return <BaseToolbar.Separator render={<ToolbarSeparatorElement {...props} />} />;
}
