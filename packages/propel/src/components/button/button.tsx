import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import { Button as ButtonRoot, type ButtonProps as ButtonRootProps } from "../../ui/button";

export type ButtonProps = ButtonRootProps & {
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
    <ButtonRoot
      {...props}
      disabled={disabled || loading}
      focusableWhenDisabled={loading ? true : undefined}
      aria-busy={loading ? true : undefined}
    >
      {loading ? (
        <LoaderCircle aria-hidden className="size-(--node-size) animate-spin" />
      ) : inlineStartNode ? (
        <NodeSlot aria-hidden>{inlineStartNode}</NodeSlot>
      ) : null}
      {children}
      {!loading && inlineEndNode ? <NodeSlot aria-hidden>{inlineEndNode}</NodeSlot> : null}
    </ButtonRoot>
  );
}
