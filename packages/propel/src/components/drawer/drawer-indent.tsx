import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

export type DrawerIndentProps = Omit<BaseDrawer.Indent.Props, "className" | "style">;

/**
 * Wraps page content that should scale/shift inward as the drawer opens (the indent effect). Place
 * inside a `DrawerProvider`, around the `Drawer` root and your page. A behavior-only role (rules
 * 1a, 2), so it lives in `components`. Maps 1:1 to Base UI's `Drawer.Indent`.
 */
export function DrawerIndent(props: DrawerIndentProps) {
  return <BaseDrawer.Indent {...props} />;
}
