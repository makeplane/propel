import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { drawerCloseVariants } from "./variants";

export type DrawerCloseProps = Omit<useRender.ComponentProps<"button">, "className" | "style">;

/**
 * The styled bare close control. Place inside the content for a dismiss button. Base-UI-agnostic —
 * graft the drawer behavior in `components` via `<BaseDrawer.Close render={<DrawerClose />} />`.
 */
export function DrawerClose({ render, ...props }: DrawerCloseProps) {
  const defaultProps: useRender.ElementProps<"button"> = { className: drawerCloseVariants() };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
