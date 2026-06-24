import { Button as BaseButton } from "@base-ui/react/button";

import { type ButtonVariantProps, buttonVariants } from "./variants";

// Re-exported so `buttonVariants` + its variant-prop types stay part of the button entry's public
// surface (e.g. `icon-button` composes it).
export { buttonVariants } from "./variants";
export type {
  ButtonEmphasis,
  ButtonMagnitude,
  ButtonSizing,
  ButtonTone,
  ButtonVariant,
  ButtonVariantProps,
} from "./variants";

// The variant axes come straight from `ButtonVariantProps` — all required (no `defaultVariants`).
export type ButtonProps = Omit<BaseButton.Props, "className" | "style"> & ButtonVariantProps;

/**
 * A plain accessible button built on propel's design tokens. Pick a look with `variant` (Figma
 * Type), select the error palette with `tone`, and size it with `magnitude` — all required, so
 * consumers choose explicitly. For `variant="link"` only, optionally choose `solid` (blue) or
 * `subtle` (gray) with `emphasis`. Use `sizing="fill"` for full-width placements. `children` is
 * passed through; it is not a variant.
 */
export function Button({
  variant,
  tone,
  magnitude,
  emphasis,
  sizing,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      type={type}
      className={buttonVariants({ variant, tone, magnitude, emphasis, sizing })}
      {...props}
    />
  );
}
