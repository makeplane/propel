import { Button as BaseButton } from "@base-ui/react/button";
import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  AnchorButton as AnchorButtonElement,
  AnchorButtonLabel,
  type AnchorButtonProps as AnchorButtonElementProps,
} from "../../elements/anchor-button";
import { Spinner } from "../../internal/spinner";

export type { AnchorButtonSize, AnchorButtonVariant } from "../../elements/anchor-button";

export type AnchorButtonProps = Omit<AnchorButtonElementProps, "children"> & {
  /**
   * Set `false` when `render` swaps the underlying tag away from `<button>` (e.g. `render={<a
   * href=… />}` for a real navigation link): Base UI then keeps role, tab focus, and activation
   * semantics right on the rendered tag.
   */
  nativeButton?: boolean;
  /** Icon rendered beside the label (inline-start by default), e.g. `<Icon icon={Plus} />`. */
  icon?: React.ReactNode;
  /**
   * Which side of the label the icon sits on. The `loading` spinner takes the same slot.
   *
   * @default "start"
   */
  iconPosition?: "start" | "end";
  /** Visible action/link label. */
  label: string;
  /** Shows a spinner in the icon slot, sets `aria-busy`, and makes the control non-interactive. */
  loading?: boolean;
  /** Hard, non-focusable native disabled state (`loading` stays focusable instead). */
  disabled?: boolean;
  /**
   * The button's form behavior.
   *
   * @default "button"
   */
  type?: "submit" | "reset" | "button";
};

/**
 * The ready-made interactive element that _looks like_ an inline text link — same conventions as
 * `Button`: it grafts Base UI's `Button` behavior onto the styled `AnchorButton` element and lays
 * out an optional `icon` beside the label (`iconPosition`) plus a `loading` spinner in the same
 * slot. By default it is a `<button>` (an action that reads as a link — a "Show more" toggle, an
 * inline "Edit"); for real navigation pass `render={<a href=… />}` + `nativeButton={false}`. For a
 * link wearing the BUTTON chrome, use `Button` with the same `render` mechanics.
 */
export function AnchorButton({
  variant,
  size,
  icon,
  iconPosition = "start",
  loading = false,
  disabled,
  type = "button",
  label,
  render,
  nativeButton,
  ...props
}: AnchorButtonProps) {
  // `loading` is a soft-disabled state: Base UI keeps it focusable via
  // `focusableWhenDisabled` while suppressing activation from pointer and keyboard.
  // A plain `disabled` prop remains the hard, non-focusable native disabled state.
  const iconSlot = loading ? (
    <Spinner>
      <LoaderCircle />
    </Spinner>
  ) : (
    icon
  );
  return (
    <BaseButton
      {...props}
      type={type}
      nativeButton={nativeButton}
      render={
        <AnchorButtonElement
          variant={variant}
          size={size}
          // The consumer's render swaps the underlying element; the styled part stays the
          // className owner (behavior part outer, styled part as the render target, rule 1a).
          render={render}
        />
      }
      disabled={disabled || loading}
      focusableWhenDisabled={loading ? true : undefined}
      aria-busy={loading ? true : undefined}
    >
      {iconPosition === "start" ? iconSlot : null}
      <AnchorButtonLabel>{label}</AnchorButtonLabel>
      {iconPosition === "end" ? iconSlot : null}
    </BaseButton>
  );
}
