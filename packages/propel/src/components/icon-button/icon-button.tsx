import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  IconButton as IconButtonElement,
  type IconButtonProps as IconButtonElementProps,
  IconButtonIcon,
  IconButtonSpinner,
} from "../../ui/icon-button";

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
 * The ready-made icon-only button: composes the square `IconButton` with an `IconButtonIcon` glyph
 * slot, swapping in an `IconButtonSpinner` while `loading`. It shares Button's design tokens
 * (`variant`/`tone`/`magnitude`) but is its own component/export. There is no `link` icon button,
 * so `variant` excludes it. An `aria-label` is REQUIRED for the accessible name.
 */
export function IconButton({ children, loading = false, disabled, ...props }: IconButtonProps) {
  // `loading` mirrors Button: Base UI suppresses activation while keeping the button
  // focusable through `focusableWhenDisabled`; `disabled` remains hard-disabled.
  return (
    <IconButtonElement
      {...props}
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
    </IconButtonElement>
  );
}
