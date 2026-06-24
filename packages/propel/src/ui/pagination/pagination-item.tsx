import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { paginationItemVariants } from "./variants";

export type PaginationItemProps = Omit<useRender.ComponentProps<"li">, "className" | "style">;

/** One slot in the pagination list, holding a page button, an arrow button, or the ellipsis. */
export function PaginationItem({ render, ...props }: PaginationItemProps) {
  const defaultProps: useRender.ElementProps<"li"> = { className: paginationItemVariants() };
  return useRender({ defaultTagName: "li", render, props: mergeProps(defaultProps, props) });
}
