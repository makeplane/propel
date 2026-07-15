import { Button as BaseButton } from "@base-ui/react/button";
import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  type PillButtonEmphasis,
  PillButton as PillButtonElement,
  type PillButtonProps as PillButtonElementProps,
  PillLabel,
} from "../../elements/pill";
import { Spinner } from "../../internal/spinner";

export type { PillButtonEmphasis };

export type PillButtonProps = Omit<PillButtonElementProps, "children" | "emphasis"> & {
  /** Fill treatment. Defaults to `outline` (≈ Button secondary). `soft` ≈ Button tertiary. */
  emphasis?: PillButtonEmphasis;
  /** Element rendered before the label (inline-start), e.g. `<Icon icon={Tag} />`. */
  startIcon?: React.ReactNode;
  /** Element rendered after the label (inline-end), e.g. `<Icon icon={X} />`. */
  endIcon?: React.ReactNode;
  /** Visible pill label. */
  label: string;
  /** Busy state: hides start/end icons, shows a spinner after the label, and blocks clicks. */
  loading?: boolean;
};

/**
 * The ready-made pill button: grafts Base UI's `Button` behavior onto the styled `PillButton`
 * container (behavior outer, the styled button as the render target), with an optional leading
 * node, the `PillLabel`, an optional trailing node, and a trailing spinner while `loading`.
 * `loading` disables the button while keeping it focusable (`aria-busy`).
 */
export function PillButton({
  magnitude,
  emphasis = "outline",
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
      render={<PillButtonElement magnitude={magnitude} emphasis={emphasis} />}
      disabled={disabled || loading}
      focusableWhenDisabled={loading ? true : undefined}
      aria-busy={loading ? true : undefined}
    >
      {!loading ? startIcon : null}
      <PillLabel>{label}</PillLabel>
      {loading ? (
        <Spinner>
          <LoaderCircle />
        </Spinner>
      ) : (
        endIcon
      )}
    </BaseButton>
  );
}
