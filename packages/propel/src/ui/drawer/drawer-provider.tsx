import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

export type DrawerProviderProps = Omit<BaseDrawer.Provider.Props, "className" | "style">;

/**
 * Optional context wrapper that coordinates indent effects across sibling drawers. Wrap `Drawer`
 * (and any `DrawerIndent`/`DrawerIndentBackground`) in it when you need the page to shift as the
 * drawer opens. Maps 1:1 to Base UI's `Drawer.Provider`.
 */
export function DrawerProvider(props: DrawerProviderProps) {
  return <BaseDrawer.Provider {...props} />;
}
