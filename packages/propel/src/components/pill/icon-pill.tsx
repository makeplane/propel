import { Button as BaseButton } from "@base-ui/react/button";
import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  IconPill as IconPillElement,
  type IconPillProps as IconPillElementProps,
} from "../../elements/pill";
import { Spinner } from "../../internal/spinner";

export type IconPillProps = Omit<IconPillElementProps, "children"> & {
  /** The icon element, usually `<Icon icon={...} />`. */
  icon: React.ReactNode;
  /** Required: icon-only pills have no visible text, so they must be labeled. */
  "aria-label": string;
  /** Busy state: swaps the icon for a spinner and blocks clicks. */
  loading?: boolean;
};

/**
 * The ready-made icon-only pill: grafts Base UI's `Button` behavior onto the square `IconPill`
 * container (behavior outer, the styled button as the render target), filling it with the icon (or
 * a spinner while `loading`). `loading` disables the button while keeping it focusable
 * (`aria-busy`). An `aria-label` is required for the accessible name.
 */
export function IconPill({ magnitude, loading = false, disabled, icon, ...props }: IconPillProps) {
  return (
    <BaseButton
      {...props}
      render={<IconPillElement magnitude={magnitude} />}
      disabled={disabled || loading}
      focusableWhenDisabled={loading ? true : undefined}
      aria-busy={loading ? true : undefined}
    >
      {loading ? (
        <Spinner>
          <LoaderCircle />
        </Spinner>
      ) : (
        icon
      )}
    </BaseButton>
  );
}
