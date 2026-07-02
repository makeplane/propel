import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { anchorButtonSpinnerVariants } from "./variants";

export type AnchorButtonSpinnerProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The pending-navigation indicator shown in place of the inline-start node while a navigation is in
 * flight (e.g. a router holding on the link while the next route's data/code loads). A pure slot
 * sized to `--node-size`; callers pass the spinner icon as `children`. Decorative (the root carries
 * `aria-busy`), so it is `aria-hidden`.
 */
export function AnchorButtonSpinner({ render, ...props }: AnchorButtonSpinnerProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: anchorButtonSpinnerVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
