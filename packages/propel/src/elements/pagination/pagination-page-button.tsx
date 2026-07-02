import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { paginationPageButtonVariants } from "./variants";

export type PaginationPageButtonProps = Omit<
  useRender.ComponentProps<"button">,
  "className" | "style"
>;

/**
 * A styled page-number button. The current page is marked `aria-current="page"`, which the cva keys
 * the pressed/selected fill off of; pass the page number (or a loading spinner) as `children` and
 * wire `aria-current`/`onClick` through props.
 */
export function PaginationPageButton({ render, ...props }: PaginationPageButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    ...(render == null ? { type: "button" } : null),
    className: paginationPageButtonVariants(),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
