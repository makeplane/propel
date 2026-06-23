import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { toolbarDropdownTriggerIndicatorVariants } from "./variants";

export type ToolbarDropdownTriggerIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The disclosure caret shown at the inline-end of a toolbar dropdown trigger. Sizes its single
 * child to the trigger's `--node-size`. Decorative (the trigger button carries the a11y state), so
 * it is `aria-hidden`. Defaults to a chevron; pass `children` to use a different glyph.
 */
export function ToolbarDropdownTriggerIndicator({
  children,
  ...props
}: ToolbarDropdownTriggerIndicatorProps) {
  return (
    <span aria-hidden className={toolbarDropdownTriggerIndicatorVariants()} {...props}>
      {children ?? <ChevronDown />}
    </span>
  );
}
