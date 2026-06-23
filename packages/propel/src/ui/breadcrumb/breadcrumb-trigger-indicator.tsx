import { ChevronRight } from "lucide-react";
import type * as React from "react";

import { breadcrumbTriggerIndicatorVariants } from "./variants";

export type BreadcrumbTriggerIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The disclosure caret at a `BreadcrumbTrigger`'s inline-end. Points toward the inline-end at rest
 * and rotates down while the menu is open (the trigger carries `group/trigger`). Mirrored under
 * RTL. Decorative (the trigger carries the a11y state), so it is `aria-hidden`. Defaults to a
 * chevron; pass `children` to use a different glyph.
 */
export function BreadcrumbTriggerIndicator({
  children,
  ...props
}: BreadcrumbTriggerIndicatorProps) {
  return (
    <span aria-hidden className={breadcrumbTriggerIndicatorVariants()} {...props}>
      {children ?? <ChevronRight />}
    </span>
  );
}
