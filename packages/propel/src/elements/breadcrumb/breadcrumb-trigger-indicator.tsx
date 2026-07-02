import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { breadcrumbTriggerIndicatorVariants } from "./variants";

export type BreadcrumbTriggerIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The disclosure caret at a `BreadcrumbTrigger`'s inline-end. Points toward the inline-end at rest
 * and rotates down while the menu is open (the trigger carries `group/trigger`). Mirrored under
 * RTL. A node-slot: it sizes its single child to the indicator size, so callers pass a bare glyph.
 * Decorative (the trigger carries the a11y state), so it is `aria-hidden`.
 */
export function BreadcrumbTriggerIndicator({ render, ...props }: BreadcrumbTriggerIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: breadcrumbTriggerIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
