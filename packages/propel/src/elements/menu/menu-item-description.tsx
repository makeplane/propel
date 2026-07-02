import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuItemDescriptionVariants } from "./variants";

export type MenuItemDescriptionProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/** A muted second line beneath the title, holding the item's description. */
export function MenuItemDescription({ render, ...props }: MenuItemDescriptionProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: menuItemDescriptionVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
