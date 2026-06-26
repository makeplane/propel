import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { paginationVariants } from "./variants";

export type PaginationProps = Omit<useRender.ComponentProps<"nav">, "className" | "style">;

/**
 * The pagination landmark: a `<nav>` wrapping the optional per-page region, range label, and the
 * page-control list.
 */
export function Pagination({ render, ...props }: PaginationProps) {
  const defaultProps: useRender.ElementProps<"nav"> = { className: paginationVariants() };
  return useRender({ defaultTagName: "nav", render, props: mergeProps(defaultProps, props) });
}
