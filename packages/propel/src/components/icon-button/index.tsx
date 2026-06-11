import { cx } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import * as React from "react";
import {
  type ButtonMagnitude,
  type ButtonProps,
  type ButtonTone,
  type ButtonVariant,
  buttonVariants,
} from "../button/index";

// IconButton is its own component, but it shares Button's cva chrome
// (`buttonVariants`). Its box geometry and glyph scale differ from a text button:
// icon buttons are square (a fixed `size-N` box) rather than label-driven, and
// Figma's icon-button glyph sizes run a step larger than the text-button icon at md
// and xl. Both differences live here.

// Icon-only square sizes per magnitude. Figma's "Icon button" Size scale ships
// S/Base/L/XL at 20/24/28/32px, mapped to sm/md/lg/xl. `size-N` fixes both width
// and height so the button is always square; the base `items-center justify-center`
// centers the glyph (no padding needed, the gap falls out of size minus glyph).
const iconButtonSizeByMagnitude: Record<ButtonMagnitude, string> = {
  sm: "size-5",
  md: "size-6",
  lg: "size-7",
  xl: "size-8",
};

// Glyph size per magnitude, from Figma's "Icon button" spec: 14 / 16 / 16 / 20px for
// sm/md/lg/xl. This is the icon-button's own scale, which is a step larger than the
// text-button glyph at md (16 vs 14) and xl (20 vs 16).
const iconButtonGlyphSizeByMagnitude: Record<ButtonMagnitude, string> = {
  sm: "size-3.5", // 14px
  md: "size-4", // 16px
  lg: "size-4", // 16px
  xl: "size-5", // 20px
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
  const iconClass = iconButtonGlyphSizeByMagnitude[magnitude];
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={loading ? undefined : onClick}
      className={cx(
        // Pass only variant/tone so Button's chrome (background, border, text/icon
        // color, radius) applies, but NOT its text-button geometry. `magnitude` would
        // add a height, min-width and horizontal padding meant for labelled buttons;
        // since cx does not dedupe conflicting utilities, those would beat the square
        // size below and leave the button rectangular. The square `size-N` is the icon
        // button's own geometry.
        buttonVariants({ variant, tone }),
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
