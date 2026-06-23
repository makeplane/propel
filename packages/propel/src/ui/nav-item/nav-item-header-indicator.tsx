import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { navItemHeaderIndicatorVariants } from "./variants";

export type NavItemHeaderIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The disclosure caret inside a `NavItemHeaderToggle`. Points toward the inline-end when collapsed
 * and rotates to point down when the section opens. Decorative (the toggle carries the a11y state),
 * so it is `aria-hidden`. Defaults to a chevron; pass `children` to use a different glyph.
 */
export function NavItemHeaderIndicator({ children, ...props }: NavItemHeaderIndicatorProps) {
  return (
    <span aria-hidden className={navItemHeaderIndicatorVariants()} {...props}>
      {children ?? <ChevronDown />}
    </span>
  );
}
