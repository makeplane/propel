import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  Button as ButtonElement,
  ButtonIcon,
  ButtonLabel,
  type ButtonProps as ButtonElementProps,
  ButtonSpinner,
} from "../../ui/button";

export type ButtonProps = ButtonElementProps & {
  /**
   * Node rendered before the label (inline-start). An icon, avatar, or any node; it is sized to the
   * button's `--node-size`. Decorative, kept out of the name.
   */
  inlineStartNode?: React.ReactNode;
  /**
   * Node rendered after the label (inline-end). An icon, avatar, or any node; it is sized to the
   * button's `--node-size`. Decorative, kept out of the name.
   */
  inlineEndNode?: React.ReactNode;
  /** Shows a spinner, sets `aria-busy`, and makes the button non-interactive. */
  loading?: boolean;
};

/**
 * The ready-made `Button`: composes the atomic `Button` and lays out an optional
 * `inlineStartNode`/`inlineEndNode` beside the label plus a `loading` spinner. Content —
 * `children`, the inline nodes, `loading` — is not a variant.
 */
export function Button({
  inlineStartNode,
  inlineEndNode,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  // `loading` is a soft-disabled state: Base UI keeps it focusable via
  // `focusableWhenDisabled` while suppressing activation from pointer and keyboard.
  // A plain `disabled` prop remains the hard, non-focusable native disabled state.
  return (
    <ButtonElement
      {...props}
      disabled={disabled || loading}
      focusableWhenDisabled={loading ? true : undefined}
      aria-busy={loading ? true : undefined}
    >
      {loading ? (
        <ButtonSpinner>
          <LoaderCircle />
        </ButtonSpinner>
      ) : inlineStartNode ? (
        <ButtonIcon>{inlineStartNode}</ButtonIcon>
      ) : null}
      <ButtonLabel>{children}</ButtonLabel>
      {!loading && inlineEndNode ? <ButtonIcon>{inlineEndNode}</ButtonIcon> : null}
    </ButtonElement>
  );
}
