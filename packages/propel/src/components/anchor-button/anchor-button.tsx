import { Button as BaseButton } from "@base-ui/react/button";
import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  AnchorButton as AnchorButtonElement,
  AnchorButtonLabel,
  type AnchorButtonProps as AnchorButtonElementProps,
} from "../../elements/anchor-button";
import { Spinner } from "../../internal/spinner";

export type { AnchorButtonMagnitude, AnchorButtonProminence } from "../../elements/anchor-button";

export type AnchorButtonProps = Omit<AnchorButtonElementProps, "children"> & {
  /**
   * Set `false` when `render` swaps the underlying tag away from `<button>` (e.g. `render={<a
   * href=… />}` for a real navigation link): Base UI then keeps role, tab focus, and activation
   * semantics right on the rendered tag.
   */
  nativeButton?: boolean;
  /** Element rendered before the label (inline-start), e.g. `<Icon icon={Plus} />`. */
  startIcon?: React.ReactNode;
  /** Element rendered after the label (inline-end), e.g. `<Icon icon={ArrowUpRight} />`. */
  endIcon?: React.ReactNode;
  /** Visible action/link label. */
  label: string;
  /** Shows a spinner, sets `aria-busy`, and makes the control non-interactive. */
  loading?: boolean;
};

/**
 * The ready-made interactive element that _looks like_ an inline text link — same conventions as
 * `Button`: it grafts Base UI's `Button` behavior onto the styled `AnchorButton` element and lays
 * out an optional `startIcon`/`endIcon` beside the label plus a `loading` spinner. By default it is
 * a `<button>` (an action that reads as a link — a "Show more" toggle, an inline "Edit"); for real
 * navigation pass `render={<a href=… />}` + `nativeButton={false}`. For a link wearing the BUTTON
 * chrome, use `Button` with the same `render` mechanics.
 */
export function AnchorButton({
  prominence,
  magnitude,
  startIcon,
  endIcon,
  loading = false,
  disabled,
  label,
  render,
  nativeButton,
  ...props
}: AnchorButtonProps) {
  // `loading` is a soft-disabled state: Base UI keeps it focusable via
  // `focusableWhenDisabled` while suppressing activation from pointer and keyboard.
  // A plain `disabled` prop remains the hard, non-focusable native disabled state.
  return (
    <BaseButton
      {...props}
      nativeButton={nativeButton}
      render={
        <AnchorButtonElement
          prominence={prominence}
          magnitude={magnitude}
          // The consumer's render swaps the underlying element; the styled part stays the
          // className owner (behavior part outer, styled part as the render target, rule 1a).
          render={render}
        />
      }
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
      <AnchorButtonLabel>{label}</AnchorButtonLabel>
      {!loading ? endIcon : null}
    </BaseButton>
  );
}
