import { Button as BaseButton } from "@base-ui/react/button";
import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  PillButton as PillButtonElement,
  type PillButtonProps as PillButtonElementProps,
  PillLabel,
} from "../../elements/pill";
import { Spinner } from "../../internal/spinner";

export type PillButtonProps = Omit<PillButtonElementProps, "children"> & {
  /** Element rendered before the label (inline-start), e.g. `<Icon icon={Tag} />`. */
  startIcon?: React.ReactNode;
  /** Element rendered after the label (inline-end), e.g. `<Icon icon={X} />`. */
  endIcon?: React.ReactNode;
  /** Visible pill label. */
  label: React.ReactNode;
  /** Busy state: swaps the inline-start node for a spinner and blocks clicks. */
  loading?: boolean;
};

/**
 * The ready-made pill button: grafts Base UI's `Button` behavior onto the styled `PillButton`
 * container (behavior outer, the styled button as the render target), with an optional leading node
 * (or a spinner while `loading`), the `PillLabel`, and an optional trailing node. `loading`
 * disables the button while keeping it focusable (`aria-busy`).
 */
export function PillButton({
  magnitude,
  startIcon,
  endIcon,
  loading = false,
  disabled,
  label,
  ...props
}: PillButtonProps) {
  return (
    <BaseButton
      {...props}
      render={<PillButtonElement magnitude={magnitude} />}
      disabled={disabled || loading}
      focusableWhenDisabled={loading ? true : undefined}
      aria-busy={loading ? true : undefined}
    >
      {loading ? (
        <Spinner>
          <LoaderCircle />
        </Spinner>
      ) : (
        startIcon
      )}
      <PillLabel>{label}</PillLabel>
      {!loading ? endIcon : null}
    </BaseButton>
  );
}
