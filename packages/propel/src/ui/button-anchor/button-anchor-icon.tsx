import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { buttonAnchorIconVariants } from "./variants";

export type ButtonAnchorIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/** A decorative node beside the label, sized to the button-anchor's `--node-size`. `aria-hidden`. */
export function ButtonAnchorIcon({ render, ...props }: ButtonAnchorIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: buttonAnchorIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
