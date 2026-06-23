import { ChevronDown } from "lucide-react";
import * as React from "react";

import { ToolbarDensityContext } from "./toolbar-context";
import { dropdownTriggerIndicatorVariants } from "./variants";

export type ToolbarDropdownTriggerIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The disclosure caret shown at the inline-end of a toolbar dropdown trigger. Decorative (the
 * trigger button carries the a11y state), so it is `aria-hidden`. Defaults to a chevron; pass
 * `children` to use a different glyph.
 */
export function ToolbarDropdownTriggerIndicator({
  children,
  ...props
}: ToolbarDropdownTriggerIndicatorProps) {
  const density = React.useContext(ToolbarDensityContext);
  return (
    <span aria-hidden className={dropdownTriggerIndicatorVariants({ density })} {...props}>
      {children ?? <ChevronDown />}
    </span>
  );
}
