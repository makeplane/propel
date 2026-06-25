import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { anchorButtonIconVariants } from "./variants";

export type AnchorButtonIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/** A decorative node beside the label, sized to the anchor-button's `--node-size`. `aria-hidden`. */
export function AnchorButtonIcon({ render, ...props }: AnchorButtonIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: anchorButtonIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
