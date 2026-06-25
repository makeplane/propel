import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { paginationRangeVariants } from "./variants";

export type PaginationRangeProps = Omit<useRender.ComponentProps<"p">, "className" | "style">;

/**
 * The optional range label shown before the controls (Figma `1-50 of 250`): tertiary, nowrap. The
 * current range inside it is emphasized via `PaginationRangeCurrent`.
 */
export function PaginationRange({ render, ...props }: PaginationRangeProps) {
  const defaultProps: useRender.ElementProps<"p"> = { className: paginationRangeVariants() };
  return useRender({ defaultTagName: "p", render, props: mergeProps(defaultProps, props) });
}
