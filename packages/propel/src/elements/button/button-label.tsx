import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { buttonLabelVariants } from "./variants";

export type ButtonLabelProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The button's text label. Loading mutes with the root chrome (`aria-busy` / disabled palette) —
 * label and spinner share the same weight (Figma).
 */
export function ButtonLabel({ render, ...props }: ButtonLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: buttonLabelVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
