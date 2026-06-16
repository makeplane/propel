import { cx } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import * as React from "react";
import { getLoadingButtonProps } from "../../internal/loading-button";
import { nodeSlotClass } from "../../internal/node-slot";
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

// `--node-size` per magnitude, from Figma's "Icon button" spec: 14 / 16 / 16 / 20px
// for sm/md/lg/xl. This is the icon-button's own glyph scale, a step larger than the
// text-button node at md (16 vs 14) and xl (20 vs 16). It is set on the button root so
// the node slot and the loading spinner size to it.
const iconButtonNodeSizeByMagnitude: Record<ButtonMagnitude, string> = {
  sm: "[--node-size:0.875rem]", // 14px
  md: "[--node-size:1rem]", // 16px
  lg: "[--node-size:1rem]", // 16px
  xl: "[--node-size:1.25rem]", // 20px
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
  "inlineStartNode" | "inlineEndNode" | "variant" | "emphasis"
> & {
  variant: IconButtonVariant;
  /**
   * The single node to render (an icon, an avatar, ...), sized to the button's
   * `--node-size`. It is the button's only content, so it is `children`; decorative,
   * the accessible name comes from `aria-label`.
   */
  children: React.ReactNode;
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
  children,
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
  // `disabled` is the hard, non-focusable native state. The spinner and the node slot
  // size to `--node-size`, set per magnitude below.
  return (
    <button
      type={type}
      {...getLoadingButtonProps({ loading, disabled, onClick })}
      className={cx(
        // Pass only variant/tone so Button's chrome (background, border, text/icon
        // color, radius) applies, but NOT its text-button geometry. `magnitude` would
        // add a height, min-width and horizontal padding meant for labelled buttons;
        // since cx does not dedupe conflicting utilities, those would beat the square
        // size below and leave the button rectangular. The square `size-N` is the icon
        // button's own geometry, and `--node-size` sizes its glyph.
        buttonVariants({ variant, tone }),
        iconButtonSizeByMagnitude[magnitude],
        iconButtonNodeSizeByMagnitude[magnitude],
      )}
      {...props}
    >
      {loading ? (
        <LoaderCircle aria-hidden className="size-(--node-size) animate-spin" />
      ) : (
        <span aria-hidden className={nodeSlotClass}>
          {children}
        </span>
      )}
    </button>
  );
}
