import { Button as BaseButton } from "@base-ui/react/button";

import { type ButtonProps, type ButtonTone, type ButtonVariant } from "../button/index";
import { iconButtonRootVariants } from "./variants";

// Figma "Icon button" Type axis: Primary/Secondary/Tertiary/Error/Error outline/
// Ghost. There is no link icon button, so IconButton drops Button's `link`
// variant (and the link-only `emphasis` axis); it is a fixed square, so it drops
// the `stretch` layout axis too. Its visual axes are `variant` + `tone`, the same
// compound tokens Button uses for everything but link.
export type IconButtonVariant = Exclude<ButtonVariant, "link">;
export type IconButtonTone = ButtonTone;

export type IconButtonRootProps = Omit<ButtonProps, "variant" | "emphasis" | "stretch"> & {
  variant: IconButtonVariant;
};

/**
 * The square button box of the icon-only button: the styled {@link BaseButton} with no baked
 * content. It carries Button's chrome (`variant`/`tone`) plus icon-button geometry (`magnitude`'s
 * square `size-N` box and `--node-size` glyph scale). Compose an `IconButtonIcon` (or
 * `IconButtonSpinner`) inside it. There is no `link` icon button, so `variant` excludes it.
 */
export function IconButtonRoot({
  variant,
  tone,
  magnitude,
  type = "button",
  ...props
}: IconButtonRootProps) {
  return (
    <BaseButton
      type={type}
      // Pass only variant/tone to buttonVariants so Button's chrome (background,
      // border, text/icon color, radius) applies but NOT its text-button geometry;
      // iconButtonRootVariants layers the square `size-N` box and `--node-size`
      // glyph scale per magnitude (see variants.ts for why magnitude is kept separate).
      className={iconButtonRootVariants({ variant, tone, magnitude })}
      {...props}
    />
  );
}
