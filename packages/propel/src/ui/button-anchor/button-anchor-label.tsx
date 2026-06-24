import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { buttonAnchorLabelVariants } from "./variants";

export type ButtonAnchorLabelProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/** The button-anchor's text label. */
export function ButtonAnchorLabel({ render, ...props }: ButtonAnchorLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: buttonAnchorLabelVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
