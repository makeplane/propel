import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

import { Backdrop } from "../../internal/backdrop";

export type DrawerBackdropProps = Omit<BaseDrawer.Backdrop.Props, "className" | "style">;

/**
 * The dimmed overlay behind the drawer: Base UI's `Drawer.Backdrop` behavior grafted onto the
 * shared `internal/Backdrop` surface (rule 4a). Fades in/out via Base UI's
 * `data-starting-style`/`data-ending-style` transition hooks.
 */
export function DrawerBackdrop(props: DrawerBackdropProps) {
  return <BaseDrawer.Backdrop {...props} render={<Backdrop />} />;
}
