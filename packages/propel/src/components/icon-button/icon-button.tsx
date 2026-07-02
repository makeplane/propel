import { Button as BaseButton } from "@base-ui/react/button";
import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  IconButton as IconButtonElement,
  type IconButtonProps as IconButtonElementProps,
  IconButtonIcon,
  IconButtonSpinner,
} from "../../elements/icon-button";

export type IconButtonProps = IconButtonElementProps & {
  /**
   * The single node to render (an icon, an avatar, ...), sized to the button's `--node-size`. It is
   * the button's only content; decorative, the accessible name comes from `aria-label`.
   */
  children: React.ReactNode;
  /** Required: icon-only buttons have no visible text, so they must be labeled. */
  "aria-label": string;
  /** Shows a spinner, sets `aria-busy`, and makes the button non-interactive. */
  loading?: boolean;
};

/**
 * The ready-made icon-only button: grafts Base UI's `Button` behavior onto the square `IconButton`
 * box, filling it with an `IconButtonIcon` glyph slot and swapping in an `IconButtonSpinner` while
 * `loading`. It shares Button's design tokens (`prominence`/`tone`/`magnitude`) but is its own
 * component/export. There is no `link` icon button. An `aria-label` is REQUIRED for the accessible
 * name.
 */
export function IconButton({
  children,
  loading = false,
  disabled,
  prominence,
  tone,
  magnitude,
  ...props
}: IconButtonProps) {
  // `loading` mirrors Button: Base UI suppresses activation while keeping the button focusable
  // through `focusableWhenDisabled`; `disabled` remains hard-disabled.
  return (
    <BaseButton
      {...props}
      render={<IconButtonElement prominence={prominence} tone={tone} magnitude={magnitude} />}
      disabled={disabled || loading}
      focusableWhenDisabled={loading ? true : undefined}
      aria-busy={loading ? true : undefined}
    >
      {loading ? (
        <IconButtonSpinner>
          <LoaderCircle />
        </IconButtonSpinner>
      ) : (
        <IconButtonIcon>{children}</IconButtonIcon>
      )}
    </BaseButton>
  );
}
