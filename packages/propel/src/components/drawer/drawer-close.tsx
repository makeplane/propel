import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

export type DrawerCloseProps = Omit<BaseDrawer.Close.Props, "className" | "style">;

/**
 * The behavior that closes the drawer when activated. A behavior-only role that carries no propel
 * styling, so graft it onto a styled control via `render` — behavior part outer, styled part as the
 * render target, so the control's look wins:
 *
 * ```tsx
 * <DrawerClose
 *   render={
 *     <IconButton prominence="ghost" tone="neutral" magnitude="lg" aria-label={closeLabel}>
 *       <X />
 *     </IconButton>
 *   }
 * />;
 * ```
 *
 * Maps 1:1 to `Drawer.Close`. (The styled bare close control it replaces in this entry still lives
 * at `elements/drawer` for assembling a drawer from the atoms.)
 */
export function DrawerClose(props: DrawerCloseProps) {
  return <BaseDrawer.Close {...props} />;
}
