import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { breadcrumbTriggerIndicatorVariants } from "./variants";

export type BreadcrumbTriggerIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The disclosure caret inside a menu crumb — sizes its chevron-down child, rotates it while the
 * crumb's menu is open, and shifts from `icon-secondary` to `icon-primary` when that crumb is the
 * active (open) one. Decorative, so it is `aria-hidden`. Composed by `BreadcrumbMenuTrigger`.
 */
export function BreadcrumbTriggerIndicator({ render, ...props }: BreadcrumbTriggerIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: breadcrumbTriggerIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
