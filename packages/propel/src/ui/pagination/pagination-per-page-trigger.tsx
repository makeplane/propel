import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { perPageTriggerVariants } from "./variants";

export type PaginationPerPageTriggerProps = Omit<
  useRender.ComponentProps<"button">,
  "className" | "style"
>;

/**
 * The per-page selector pill, styled as a `layer-3` Menu trigger. Compose a `Menu.Trigger` through
 * the `render` prop; pass the visible size, the `sr-only` label, and the chevron as `children`.
 */
export function PaginationPerPageTrigger({ render, ...props }: PaginationPerPageTriggerProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    ...(render == null ? { type: "button" } : null),
    className: perPageTriggerVariants(),
  };

  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps(props, defaultProps),
  });
}
