import { cx } from "class-variance-authority";
import type * as React from "react";

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
      className={cx(
        "flex size-4 shrink-0 items-center justify-center text-icon-placeholder [&>svg]:size-full",
        "transition-transform data-open:rotate-180 rtl:-scale-x-100",
      )}
    >
      {icon}
    </span>
  );
}
