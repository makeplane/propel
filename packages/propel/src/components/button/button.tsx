import { Button as BaseButton } from "@base-ui/react/button";
import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  Button as ButtonElement,
  ButtonLabel,
  type ButtonProps as ButtonElementProps,
} from "../../elements/button";
import { Icon } from "../../internal/icon";
import { Spinner } from "../../internal/spinner";

export type ButtonProps = ButtonElementProps & {
  /**
   * Set `false` when `render` swaps the underlying tag away from `<button>` (e.g. a `<div>` or an
   * `<a>`): Base UI then adds `role="button"`, tab focus, and Enter/Space activation.
   */
  nativeButton?: boolean;
  /**
   * Node rendered before the label (inline-start). An icon, avatar, or any node; it is sized to the
   * button's `--node-size`. Decorative, kept out of the name.
   */
  startIcon?: React.ReactNode;
  /**
   * Node rendered after the label (inline-end). An icon, avatar, or any node; it is sized to the
   * button's `--node-size`. Decorative, kept out of the name.
   */
  endIcon?: React.ReactNode;
  /** Shows a spinner, sets `aria-busy`, and makes the button non-interactive. */
  loading?: boolean;
};

/**
 * The ready-made `Button`: grafts Base UI's `Button` behavior onto the styled `Button` element and
 * lays out an optional `startIcon`/`endIcon` beside the label plus a `loading` spinner. Content —
 * `children`, the inline nodes, `loading` — is not a variant.
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
  children,
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
      ) : startIcon ? (
        <Icon>{startIcon}</Icon>
      ) : null}
      <ButtonLabel>{children}</ButtonLabel>
      {!loading && endIcon ? <Icon>{endIcon}</Icon> : null}
    </BaseButton>
  );
}
