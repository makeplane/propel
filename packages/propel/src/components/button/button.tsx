import { Button as BaseButton } from "@base-ui/react/button";
import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  Button as ButtonElement,
  ButtonLabel,
  type ButtonProps as ButtonElementProps,
} from "../../elements/button";
import { Spinner } from "../../internal/spinner";

export type ButtonProps = Omit<ButtonElementProps, "children"> & {
  /**
   * Set `false` when `render` swaps the underlying tag away from `<button>` (e.g. a `<div>` or an
   * `<a>`): Base UI then adds `role="button"`, tab focus, and Enter/Space activation.
   */
  nativeButton?: boolean;
  /** Element rendered before the label (inline-start), e.g. `<Icon icon={Plus} />`. */
  startIcon?: React.ReactNode;
  /** Element rendered after the label (inline-end), e.g. `<Icon icon={ArrowRight} />`. */
  endIcon?: React.ReactNode;
  /** Visible button label. */
  label: string;
  /** Shows a spinner, sets `aria-busy`, and makes the button non-interactive. */
  loading?: boolean;
};

/**
 * The ready-made `Button`: grafts Base UI's `Button` behavior onto the styled `Button` element and
 * lays out an optional `startIcon`/`endIcon` beside the label plus a `loading` spinner. Content —
 * the label, inline nodes, and `loading` state — is not a variant.
 */
export function Button({
  prominence,
  tone,
  magnitude,
  sizing,
  startIcon,
  endIcon,
  loading = false,
  disabled,
  label,
  render,
  nativeButton,
  ...props
}: ButtonProps) {
  // `loading` is a soft-disabled state: Base UI keeps it focusable via
  // `focusableWhenDisabled` while suppressing activation from pointer and keyboard.
  // A plain `disabled` prop remains the hard, non-focusable native disabled state.
  return (
    <BaseButton
      {...props}
      nativeButton={nativeButton}
      render={
        <ButtonElement
          prominence={prominence}
          tone={tone}
          magnitude={magnitude}
          sizing={sizing}
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
      <ButtonLabel>{label}</ButtonLabel>
      {!loading ? endIcon : null}
    </BaseButton>
  );
}
