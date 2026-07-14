import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { anchorButtonLabelVariants } from "./variants";

export type AnchorButtonLabelProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The text label inside an `AnchorButton`. Owns the underline (icons stay un-underlined) and mutes
 * with the root chrome while loading — mirrors `ButtonLabel`.
 */
export function AnchorButtonLabel({ render, ...props }: AnchorButtonLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: anchorButtonLabelVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
