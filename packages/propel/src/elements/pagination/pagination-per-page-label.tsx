import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { paginationPerPageLabelVariants } from "./variants";

export type PaginationPerPageLabelProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The trailing "per page" text after the selector pill (Figma `50 v per page`). Decorative, so
 * `aria-hidden`.
 */
export function PaginationPerPageLabel({ render, ...props }: PaginationPerPageLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: paginationPerPageLabelVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
