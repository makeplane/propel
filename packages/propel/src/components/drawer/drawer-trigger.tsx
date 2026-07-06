import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

export type DrawerTriggerProps = Omit<BaseDrawer.Trigger.Props, "className" | "style">;

/**
 * The behavior that opens the drawer. A behavior-only role that carries no propel styling, so graft
 * it onto a styled control via `render` — behavior part outer, styled part as the render target, so
 * the control's look wins:
 *
 * ```tsx
 * <DrawerTrigger
 *   render={
 *     <Button
 *       sizing="hug"
 *       prominence="secondary"
 *       tone="neutral"
 *       magnitude="xl"
 *       label="Open details"
 *     />
 *   }
 * />;
 * ```
 *
 * Base UI manages `aria-haspopup`/`aria-expanded` and focus restoration when the drawer closes.
 * Maps 1:1 to `Drawer.Trigger`.
 */
export function DrawerTrigger(props: DrawerTriggerProps) {
  return <BaseDrawer.Trigger {...props} />;
}
