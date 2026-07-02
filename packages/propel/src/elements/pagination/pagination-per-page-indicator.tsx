import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { paginationPerPageIndicatorVariants } from "./variants";

export type PaginationPerPageIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The chevron inside the per-page trigger. Renders whatever icon you pass (sized to `--node-size`,
 * 14px) and rotates a half-turn while the menu is open. Decorative — the trigger carries the
 * accessible name and state — so `aria-hidden`.
 */
export function PaginationPerPageIndicator({ render, ...props }: PaginationPerPageIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: paginationPerPageIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
