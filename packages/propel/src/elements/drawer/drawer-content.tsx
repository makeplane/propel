import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { drawerContentVariants } from "./variants";

export type DrawerContentProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled padded inner content region of the popup. Holds the title, description, body, and
 * close affordances, and allows mouse text selection without triggering swipe-dismiss.
 * Base-UI-agnostic — graft the drawer behavior in `components` via `<BaseDrawer.Content
 * render={<DrawerContent />} />`.
 */
export function DrawerContent({ render, ...props }: DrawerContentProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: drawerContentVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
