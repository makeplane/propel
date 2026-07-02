import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { paginationPerPageVariants } from "./variants";

export type PaginationPerPageProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The per-page region: the selector pill (`PaginationPerPageTrigger`) followed by the trailing
 * `PaginationPerPageLabel`.
 */
export function PaginationPerPage({ render, ...props }: PaginationPerPageProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: paginationPerPageVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
