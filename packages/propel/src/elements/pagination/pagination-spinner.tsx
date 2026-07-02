import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { paginationSpinnerVariants } from "./variants";

export type PaginationSpinnerProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The in-flight indicator a page button shows in place of its number while navigating to it. Spins
 * whatever icon you pass, sized to `--node-size` (14px) and tinted the placeholder color.
 * Decorative, so `aria-hidden`.
 */
export function PaginationSpinner({ render, ...props }: PaginationSpinnerProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: paginationSpinnerVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
