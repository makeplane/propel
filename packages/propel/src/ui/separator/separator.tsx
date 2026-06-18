import { Separator as BaseSeparator } from "@base-ui/react/separator";
import type * as React from "react";

import { separatorVariants } from "./variants";

export type SeparatorProps = Omit<
  React.ComponentProps<typeof BaseSeparator>,
  "className" | "style"
>;

/**
 * A thin rule that visually divides content. Pass `orientation` (`"horizontal"` default |
 * `"vertical"`); Base UI sets `role="separator"` and `aria-orientation` accordingly. Maps 1:1 to
 * Base UI's `Separator`.
 */
export function Separator(props: SeparatorProps) {
  return <BaseSeparator className={separatorVariants()} {...props} />;
}
