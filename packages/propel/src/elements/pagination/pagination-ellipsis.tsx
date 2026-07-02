import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { paginationEllipsisVariants } from "./variants";

export type PaginationEllipsisProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * A non-interactive gap marker between distant page numbers. Renders whatever icon you pass (sized
 * to the slot's `--node-size`, 14px) — never baking a specific glyph in. Decorative, so
 * `aria-hidden`.
 */
export function PaginationEllipsis({ render, ...props }: PaginationEllipsisProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: paginationEllipsisVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
