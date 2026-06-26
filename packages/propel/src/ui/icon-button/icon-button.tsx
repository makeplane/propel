import { Button as BaseButton } from "@base-ui/react/button";

import { iconButtonVariants, type IconButtonVariantProps } from "./variants";

export type IconButtonProps = Omit<BaseButton.Props, "className" | "style"> &
  IconButtonVariantProps;

/**
 * The square button box of the icon-only button: the styled Base UI `Button` with no baked content.
 * It owns its chrome (`prominence`/`tone`) and geometry (`magnitude`'s square `size-N` box and
 * `--node-size` glyph scale) through `iconButtonVariants` — independent of `Button`. There is no
 * `link` icon button. Compose an `IconButtonIcon` (or `IconButtonSpinner`) inside it.
 */
export function IconButton({
  prominence,
  tone,
  magnitude,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <BaseButton
      type={type}
      className={iconButtonVariants({ prominence, tone, magnitude })}
      {...props}
    />
  );
}
