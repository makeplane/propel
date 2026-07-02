import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuLabelTitleVariants } from "./variants";

export type MenuLabelTitleProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/** The growing title within a `MenuLabel`. Grows so a trailing `MenuLabelMeta` sits at the edge. */
export function MenuLabelTitle({ render, ...props }: MenuLabelTitleProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: menuLabelTitleVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
