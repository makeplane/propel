import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuItemMetaVariants } from "./variants";

export type MenuItemMetaProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/** Trailing muted metadata after the title column (e.g. a keyboard shortcut). */
export function MenuItemMeta({ render, ...props }: MenuItemMetaProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: menuItemMetaVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
