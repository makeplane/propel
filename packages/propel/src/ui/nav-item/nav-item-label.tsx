import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { navItemLabelVariants } from "./variants";

export type NavItemLabelProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * A nav row's label. Grows to fill the row so trailing content (a `NavItemTrailing`) sits at the
 * inline-end edge, and truncates long text on a single line.
 */
export function NavItemLabel({ render, ...props }: NavItemLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: navItemLabelVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
