import { Button as BaseButton } from "@base-ui/react/button";

import { type ButtonVariantProps, buttonVariants } from "./variants";

export type { ButtonMagnitude, ButtonProminence, ButtonSizing, ButtonTone } from "./variants";

export type ButtonProps = Omit<BaseButton.Props, "className" | "style"> & ButtonVariantProps;

/**
 * A plain accessible action button (`<button>`) built on propel's design tokens. Pick its weight
 * with `prominence` (Figma Type: primary·secondary·tertiary·ghost), the error palette with `tone`,
 * the size with `magnitude`, and full-width with `sizing` — all required, so consumers choose
 * explicitly. For navigation use `AnchorButton` (button look) or `Anchor` (inline link), not a
 * button. `children` is passed through; it is not a variant.
 */
export function Button({
  prominence,
  tone,
  magnitude,
  sizing,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      type={type}
      className={buttonVariants({ prominence, tone, magnitude, sizing })}
      {...props}
    />
  );
}
