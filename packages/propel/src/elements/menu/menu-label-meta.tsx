import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuLabelMetaVariants } from "./variants";

export type MenuLabelMetaProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/** Trailing metadata pinned at the inline-end of a `MenuLabel`. */
export function MenuLabelMeta({ render, ...props }: MenuLabelMetaProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: menuLabelMetaVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
