import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { paginationListVariants } from "./variants";

export type PaginationListProps = Omit<useRender.ComponentProps<"ul">, "className" | "style">;

/**
 * The ordered list of page controls: the previous button, page numbers and ellipses, and the next
 * button.
 */
export function PaginationList({ render, ...props }: PaginationListProps) {
  const defaultProps: useRender.ElementProps<"ul"> = { className: paginationListVariants() };
  return useRender({ defaultTagName: "ul", render, props: mergeProps(defaultProps, props) });
}
