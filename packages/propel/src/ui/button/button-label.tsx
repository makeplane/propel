import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { buttonLabelVariants } from "./variants";

export type ButtonLabelProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The button's text label. When the root button is `aria-busy` (loading) it dims via the
 * `group-aria-busy:` sibling of the `group` class the root carries, so the spinner reads as the
 * active affordance while the label fades.
 */
export function ButtonLabel({ render, ...props }: ButtonLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: buttonLabelVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
