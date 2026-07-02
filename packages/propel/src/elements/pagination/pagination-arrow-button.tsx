import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { paginationArrowButtonVariants } from "./variants";

export type PaginationArrowButtonProps = Omit<
  useRender.ComponentProps<"button">,
  "className" | "style"
>;

/**
 * A styled prev/next arrow button. Applies `paginationArrowButtonVariants()`; pass the
 * (directional, RTL-mirrored) arrow icon as `children` and wire `aria-label`/`disabled`/`onClick`
 * through props.
 */
export function PaginationArrowButton({ render, ...props }: PaginationArrowButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    ...(render == null ? { type: "button" } : null),
    className: paginationArrowButtonVariants(),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
