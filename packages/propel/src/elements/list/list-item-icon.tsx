import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ListItemIconVariantProps, listItemIconVariants } from "./variants";

export type ListItemIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style"> &
  ListItemIconVariantProps;

/**
 * The row's icon slot — pass an icon or an `Avatar` as `children`; the slot sizes it. Renders a
 * `<span>` by default. Decorative — the row's label names it — so it is `aria-hidden`.
 */
export function ListItemIcon({ render, ...props }: ListItemIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: listItemIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
