import { Button as BaseButton } from "@base-ui/react/button";
import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  IconButton as IconButtonElement,
  type IconButtonProps as IconButtonElementProps,
} from "../../elements/icon-button";
import { Icon } from "../../internal/icon";
import { Spinner } from "../../internal/spinner";

export type IconButtonProps = IconButtonElementProps & {
  /**
   * Set `false` when `render` swaps the underlying tag away from `<button>` (e.g. an `<a>`): Base
   * UI then adds `role`, tab focus, and Enter/Space activation as appropriate.
   */
  nativeButton?: boolean;
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
  render,
  nativeButton,
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
      nativeButton={nativeButton}
      render={
        <IconButtonElement
          prominence={prominence}
          tone={tone}
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
        <Icon>{children}</Icon>
      )}
    </BaseButton>
  );
}
