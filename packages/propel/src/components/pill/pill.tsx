import { Button as BaseButton } from "@base-ui/react/button";
import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  PillButton as PillButtonElement,
  type PillButtonProps as PillButtonElementProps,
  PillLabel,
} from "../../elements/pill";
import { Icon } from "../../internal/icon";
import { Spinner } from "../../internal/spinner";

export type PillButtonProps = PillButtonElementProps & {
  /** A node before the label (inline-start), sized to the pill's `--node-size`. */
  startIcon?: React.ReactNode;
  /** A node after the label (inline-end), sized to the pill's `--node-size`. */
  endIcon?: React.ReactNode;
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
  children,
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
      ) : startIcon ? (
        <Icon>{startIcon}</Icon>
      ) : null}
      <PillLabel>{children}</PillLabel>
      {!loading && endIcon ? <Icon>{endIcon}</Icon> : null}
    </BaseButton>
  );
}
