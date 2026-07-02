import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { paginationRangeCurrentVariants } from "./variants";

export type PaginationRangeCurrentProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The emphasized current-range portion (e.g. `1-50`) inside `PaginationRange`, in the primary text
 * color.
 */
export function PaginationRangeCurrent({ render, ...props }: PaginationRangeCurrentProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: paginationRangeCurrentVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
