import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  IconPill as IconPillElement,
  type IconPillProps as IconPillElementProps,
  PillIcon,
  PillSpinner,
} from "../../ui/pill";

export type IconPillProps = Omit<IconPillElementProps, "children"> & {
  /** The icon, sized and tinted by the pill. */
  children: React.ReactNode;
  /** Busy state: swaps the icon for a spinner and blocks clicks. */
  loading?: boolean;
};

/**
 * The ready-made icon-only pill: composes the `IconPill` container with the icon (or a spinner
 * while `loading`). `loading` disables the button while keeping it focusable (`aria-busy`).
 */
export function IconPill({ loading = false, disabled, children, ...props }: IconPillProps) {
  return (
    <IconPillElement
      {...props}
      disabled={disabled || loading}
      focusableWhenDisabled={loading ? true : undefined}
      aria-busy={loading ? true : undefined}
    >
      {loading ? (
        <PillSpinner>
          <LoaderCircle />
        </PillSpinner>
      ) : (
        <PillIcon>{children}</PillIcon>
      )}
    </IconPillElement>
  );
}
