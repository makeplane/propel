import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuSearchVariants } from "./variants";

export type MenuSearchProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/** The sticky search row pinned above a menu popup list (a `MenuSearchIcon` + `MenuSearchInput`). */
export function MenuSearch({ render, ...props }: MenuSearchProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: menuSearchVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
