import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { toolbarMenuTriggerIndicatorVariants } from "./variants";

export type ToolbarMenuTriggerIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The disclosure caret shown at the inline-end of a toolbar menu trigger. Sizes its single child to
 * the trigger's `--node-size`. Decorative (the trigger button carries the a11y state), so it is
 * `aria-hidden`. Defaults to a chevron; pass `children` to use a different glyph.
 */
export function ToolbarMenuTriggerIndicator({
  children,
  ...props
}: ToolbarMenuTriggerIndicatorProps) {
  return (
    <span aria-hidden className={toolbarMenuTriggerIndicatorVariants()} {...props}>
      {children ?? <ChevronDown />}
    </span>
  );
}
