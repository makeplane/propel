import { cx } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import * as React from "react";
import {
  type ButtonMagnitude,
  type ButtonProps,
  type ButtonTone,
  type ButtonVariant,
  buttonVariants,
  iconSizeByMagnitude,
} from "../button/index";

// IconButton is its own component, but it shares Button's design tokens: the same
// cva chrome (`buttonVariants`) and the same per-magnitude glyph scale
// (`iconSizeByMagnitude`). Only the box geometry differs — icon buttons are square
// and padding-driven instead of label-driven — so that lives here.

// Icon-only square sizes per magnitude. Figma's "Icon button" Size scale ships
// S/Base/L/XL at 20/24/28/32px; those map to sm/md/lg/xl. Base is a 24px square
// (size-6) with a 16px glyph and 4px (spacing/1) padding, straight from Figma.
// `xs` is an extra-dense 16px step extrapolated below the Figma scale, mirroring
// the text-button magnitude scale.
const iconButtonSizeByMagnitude: Record<ButtonMagnitude, string> = {
  xs: "size-4 p-0.5",
  sm: "size-5 p-1",
  md: "size-6 p-1",
  lg: "size-7 p-1",
  xl: "size-8 p-1.5",
};

// Figma "Icon button" Type axis: Primary/Secondary/Tertiary/Error/Error outline/
// Ghost. There is no link icon button, so IconButton drops Button's `link`
// variant (and the link-only `emphasis` axis) — its visual axes are
// `variant` + `tone`, the same compound tokens Button uses for everything but link.
export type IconButtonVariant = Exclude<ButtonVariant, "link">;
export type IconButtonTone = ButtonTone;
export type IconButtonMagnitude = ButtonMagnitude;

export type IconButtonProps = Omit<
  ButtonProps,
  "leadingIcon" | "trailingIcon" | "children" | "variant" | "emphasis"
> & {
  variant: IconButtonVariant;
  /** The single icon to render. Decorative — the name comes from `aria-label`. */
  icon: React.ReactNode;
  /** Required: icon-only buttons have no visible text, so they must be labeled. */
  "aria-label": string;
};

/**
 * The icon-only form of {@link Button}: a square button with a single glyph and
 * no label. It shares Button's design tokens (`variant`/`tone`/`magnitude`) but
 * is its own component/export. There is no `link` icon button, so `variant`
 * excludes it. An `aria-label` is REQUIRED for the accessible name.
 */
export function IconButton({
  icon,
  variant,
  tone,
  magnitude,
  loading = false,
  disabled,
  type = "button",
  onClick,
  ...props
}: IconButtonProps) {
  // `loading` mirrors Button: a soft-disabled busy state that shows a spinner and
  // blocks clicks but stays a real, focusable button (`aria-busy`/`aria-disabled`).
  // `disabled` is the hard, non-focusable native state.
  const iconClass = iconSizeByMagnitude[magnitude];
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={loading ? undefined : onClick}
      className={cx(
        buttonVariants({ variant, tone, magnitude }),
        // Override the text-button box with a square, padding-driven one.
        "h-auto min-w-0 px-0",
        iconButtonSizeByMagnitude[magnitude],
      )}
      {...props}
    >
      {loading ? (
        <LoaderCircle aria-hidden className={cx(iconClass, "animate-spin")} />
      ) : (
        <span aria-hidden className={cx("inline-flex shrink-0 [&_svg]:size-full", iconClass)}>
          {icon}
        </span>
      )}
    </button>
  );
}
