import type * as React from "react";

import { navItemChevronVariants } from "./variants";

/** The disclosure chevron for an expandable nav row. */
export function NavItemChevron({
  open = false,
  icon,
}: {
  /** Whether the row is expanded; rotates the chevron 180° when true. */
  open?: boolean;
  /** The chevron glyph, sized to 16px. */
  icon: React.ReactNode;
}) {
  return (
    <span
      aria-hidden
      data-open={open ? "" : undefined}
      className={navItemChevronVariants({ open })}
    >
      {icon}
    </span>
  );
}
