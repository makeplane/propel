import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuItemTitleRowVariants } from "./variants";

export type MenuItemTitleRowProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/** The baseline-aligned line holding a `MenuItemTitle` and any inline `MenuItemSecondaryText`. */
export function MenuItemTitleRow({ render, ...props }: MenuItemTitleRowProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: menuItemTitleRowVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
