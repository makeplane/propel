import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  PillButton as PillButtonElement,
  type PillButtonProps as PillButtonElementProps,
  PillIcon,
  PillLabel,
  PillSpinner,
} from "../../ui/pill";

export type PillButtonProps = PillButtonElementProps & {
  /** A node before the label (inline-start), sized to the pill's `--node-size`. */
  inlineStartNode?: React.ReactNode;
  /** A node after the label (inline-end), sized to the pill's `--node-size`. */
  inlineEndNode?: React.ReactNode;
  /** Busy state: swaps the inline-start node for a spinner and blocks clicks. */
  loading?: boolean;
};

/**
 * The ready-made pill button: composes the `PillButton` container with an optional leading node (or
 * a spinner while `loading`), the `PillLabel`, and an optional trailing node. `loading` disables
 * the button while keeping it focusable (`aria-busy`).
 */
export function PillButton({
  inlineStartNode,
  inlineEndNode,
  loading = false,
  disabled,
  children,
  ...props
}: PillButtonProps) {
  return (
    <PillButtonElement
      {...props}
      disabled={disabled || loading}
      focusableWhenDisabled={loading ? true : undefined}
      aria-busy={loading ? true : undefined}
    >
      {loading ? (
        <PillSpinner>
          <LoaderCircle />
        </PillSpinner>
      ) : inlineStartNode ? (
        <PillIcon>{inlineStartNode}</PillIcon>
      ) : null}
      <PillLabel>{children}</PillLabel>
      {!loading && inlineEndNode ? <PillIcon>{inlineEndNode}</PillIcon> : null}
    </PillButtonElement>
  );
}
