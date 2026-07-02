import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { breadcrumbTriggerIconVariants } from "./variants";

export type BreadcrumbTriggerIconProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * A decorative leading icon at a `BreadcrumbTrigger`'s inline-start. Sizes its single child to the
 * trigger's `--node-size`, so callers pass a bare icon. Decorative (the trigger carries the
 * accessible name), so it is `aria-hidden`.
 */
export function BreadcrumbTriggerIcon({ render, ...props }: BreadcrumbTriggerIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: breadcrumbTriggerIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
