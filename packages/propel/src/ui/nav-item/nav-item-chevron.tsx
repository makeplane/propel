import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { navItemChevronVariants } from "./variants";

export type NavItemChevronProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** Whether the row is expanded; rotates the chevron a half-turn when true. */
  open?: boolean;
};

/**
 * The disclosure chevron for an expandable nav row. Sizes its single child to 16px and rotates when
 * `open`. Decorative (the row carries the a11y state), so it is `aria-hidden`. Defaults to a
 * chevron; pass `children` to use a different glyph.
 */
export function NavItemChevron({ open = false, children, ...props }: NavItemChevronProps) {
  return (
    <span
      aria-hidden
      data-open={open ? "" : undefined}
      className={navItemChevronVariants({ open })}
      {...props}
    >
      {children ?? <ChevronDown />}
    </span>
  );
}
