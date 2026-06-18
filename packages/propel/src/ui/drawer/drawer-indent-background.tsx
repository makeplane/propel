import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type * as React from "react";

export type DrawerIndentBackgroundProps = Omit<
  React.ComponentProps<typeof BaseDrawer.IndentBackground>,
  "className" | "style"
>;

/**
 * Renders behind the indented page content so the area revealed by the indent effect has a backdrop
 * color. Used alongside `DrawerIndent` inside a `DrawerProvider`. Maps 1:1 to Base UI's
 * `Drawer.IndentBackground`.
 */
export function DrawerIndentBackground(props: DrawerIndentBackgroundProps) {
  return <BaseDrawer.IndentBackground {...props} />;
}
