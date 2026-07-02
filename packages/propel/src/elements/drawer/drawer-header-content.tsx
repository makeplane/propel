import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { drawerHeaderContentVariants } from "./variants";

export type DrawerHeaderContentProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The stacked title + description inside a `DrawerHeader`. Groups them at the header's inline-start
 * so a corner close can sit opposite at the inline-end; a long title wraps instead of pushing the
 * close off the row.
 */
export function DrawerHeaderContent({ render, ...props }: DrawerHeaderContentProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: drawerHeaderContentVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
