import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuItemControlVariants } from "./variants";

export type MenuItemControlProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/** The leading control slot of a checkbox/radio row, holding its visual toggle. */
export function MenuItemControl({ render, ...props }: MenuItemControlProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: menuItemControlVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
