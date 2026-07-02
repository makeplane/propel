import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

export type DrawerIndentBackgroundProps = Omit<
  BaseDrawer.IndentBackground.Props,
  "className" | "style"
>;

/**
 * Renders behind the indented page content so the area revealed by the indent effect has a backdrop
 * color. Used alongside `DrawerIndent` inside a `DrawerProvider`. A behavior-only role (rules 1a,
 * 2), so it lives in `components`. Maps 1:1 to Base UI's `Drawer.IndentBackground`.
 */
export function DrawerIndentBackground(props: DrawerIndentBackgroundProps) {
  return <BaseDrawer.IndentBackground {...props} />;
}
