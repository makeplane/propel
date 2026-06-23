import { Button as BaseButton } from "@base-ui/react/button";
import { LoaderCircle } from "lucide-react";
import * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import { type ButtonProps, type ButtonTone, type ButtonVariant } from "../../ui/button/index";
import { iconButtonRootVariants } from "./variants";

// Figma "Icon button" Type axis: Primary/Secondary/Tertiary/Error/Error outline/
// Ghost. There is no link icon button, so IconButton drops Button's `link`
// variant (and the link-only `emphasis` axis) — its visual axes are
// `variant` + `tone`, the same compound tokens Button uses for everything but link.
export type IconButtonVariant = Exclude<ButtonVariant, "link">;
export type IconButtonTone = ButtonTone;
export { type IconButtonMagnitude } from "./variants";

export type IconButtonProps = Omit<ButtonProps, "variant" | "emphasis"> & {
  variant: IconButtonVariant;
  /**
   * The single node to render (an icon, an avatar, ...), sized to the button's `--node-size`. It is
   * the button's only content, so it is `children`; decorative, the accessible name comes from
   * `aria-label`.
   */
  children: React.ReactNode;
  /** Required: icon-only buttons have no visible text, so they must be labeled. */
  "aria-label": string;
  /** Shows a spinner, sets `aria-busy`, and makes the button non-interactive. */
  loading?: boolean;
};

/**
 * The icon-only form of {@link Button}: a square button with a single glyph and no label. It shares
 * Button's design tokens (`variant`/`tone`/`magnitude`) but is its own component/export. There is
 * no `link` icon button, so `variant` excludes it. An `aria-label` is REQUIRED for the accessible
 * name.
 */
export function IconButton({
  children,
  variant,
  tone,
  magnitude,
  loading = false,
  disabled,
  type = "button",
  ...props
}: IconButtonProps) {
  // `loading` mirrors Button: Base UI suppresses activation while keeping the
  // button focusable through `focusableWhenDisabled`; `disabled` remains hard-disabled.
  return (
    <BaseButton
      type={type}
      {...props}
      disabled={disabled || loading}
      focusableWhenDisabled={loading ? true : undefined}
      aria-busy={loading ? true : undefined}
      // Pass only variant/tone to buttonVariants so Button's chrome (background,
      // border, text/icon color, radius) applies but NOT its text-button geometry;
      // iconButtonRootVariants layers the square `size-N` box and `--node-size`
      // glyph scale per magnitude (see variants.ts for why magnitude is kept separate).
      className={iconButtonRootVariants({ variant, tone, magnitude })}
    >
      {loading ? (
        <LoaderCircle aria-hidden className="size-(--node-size) animate-spin" />
      ) : (
        <NodeSlot aria-hidden>{children}</NodeSlot>
      )}
    </BaseButton>
  );
}
