import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { anchorButtonLabelVariants } from "./variants";

export type AnchorButtonLabelProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The text label inside an `AnchorButton`. Dims while the parent is `aria-busy` (loading), reading
 * the `group` class on the root — mirrors `ButtonLabel`.
 */
export function AnchorButtonLabel({ render, ...props }: AnchorButtonLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: anchorButtonLabelVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
