import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

export type DrawerSwipeAreaProps = Omit<BaseDrawer.SwipeArea.Props, "className" | "style">;

/**
 * An off-screen edge hit area that lets users swipe the closed drawer open from the screen edge.
 * Optional; render it as a sibling of the trigger. Maps 1:1 to Base UI's `Drawer.SwipeArea`.
 */
export function DrawerSwipeArea(props: DrawerSwipeAreaProps) {
  return <BaseDrawer.SwipeArea {...props} />;
}
