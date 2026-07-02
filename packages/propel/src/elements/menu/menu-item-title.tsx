import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuItemTitleVariants } from "./variants";

export type MenuItemTitleProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/** A row's primary label. Truncates rather than wrapping. */
export function MenuItemTitle({ render, ...props }: MenuItemTitleProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: menuItemTitleVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
