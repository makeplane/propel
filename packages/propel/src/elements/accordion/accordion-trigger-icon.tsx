import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { accordionTriggerIconVariants } from "./variants";

export type AccordionTriggerIconProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * A decorative leading icon at the trigger's inline-start (the Figma header icon). Sizes its single
 * child to the trigger's `--node-size`, so callers pass a bare icon. Decorative (the trigger
 * carries the accessible name), so it is `aria-hidden`.
 */
export function AccordionTriggerIcon({ render, ...props }: AccordionTriggerIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: accordionTriggerIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
