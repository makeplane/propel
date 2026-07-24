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
  /** Icon rendered beside the label (inline-start by default), e.g. `<Icon icon={Plus} />`. */
  icon?: React.ReactNode;
  /**
   * Which side of the label the icon sits on. The `loading` spinner takes the same slot.
   *
   * @default "start"
   */
  iconPosition?: "start" | "end";
  /** Visible button label. */
  label: string;
  /** Shows a spinner in the icon slot, sets `aria-busy`, and makes the button non-interactive. */
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
 * The ready-made `Button`: grafts Base UI's `Button` behavior onto the styled `Button` element and
 * lays out an optional `icon` beside the label (`iconPosition`), swapping it for the `loading`
 * spinner in the same slot. Content — the label, icon, and `loading` state — is not a variant.
 */
export function Button(props: ButtonProps) {
  const {
    variant,
    size,
    fillType,
    icon,
    iconPosition = "start",
    loading = false,
    disabled,
    type = "button",
    label,
    render,
    nativeButton,
    ...extraProps
  } = props;
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
      {...extraProps}
      type={type}
      nativeButton={nativeButton}
      render={
        <ButtonElement
          variant={variant}
          size={size}
          fillType={fillType}
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
      <ButtonLabel>{label}</ButtonLabel>
      {iconPosition === "end" ? iconSlot : null}
    </BaseButton>
  );
}
