import { Button as BaseButton } from "@base-ui/react/button";

import { type ButtonVariantProps, buttonVariants } from "./variants";

// Re-exported so `buttonVariants` + its variant-prop types stay part of the button entry's public
// surface (e.g. `icon-button` composes it).
export { buttonVariants } from "./variants";
export type {
  ButtonEmphasis,
  ButtonMagnitude,
  ButtonStretch,
  ButtonTone,
  ButtonVariant,
  ButtonVariantProps,
} from "./variants";
export { ButtonIcon, type ButtonIconProps } from "./button-icon";
export { ButtonLabel, type ButtonLabelProps } from "./button-label";
export { ButtonSpinner, type ButtonSpinnerProps } from "./button-spinner";

// The variant axes come straight from `ButtonVariantProps` (required where there is no default,
// optional where there is — `emphasis`/`stretch`).
export type ButtonProps = Omit<BaseButton.Props, "className" | "style"> & ButtonVariantProps;

/**
 * A plain accessible button built on propel's design tokens. Pick a look with `variant` (Figma
 * Type), select the error palette with `tone`, and size it with `magnitude` — all required, so
 * consumers choose explicitly. For `variant="link"` only, optionally choose `solid` (blue) or
 * `subtle` (gray) with `emphasis`. Use `stretch="full"` for full-width placements. `children` is
 * passed through; it is not a variant.
 */
export function Button({
  variant,
  tone,
  magnitude,
  emphasis,
  stretch,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      type={type}
      className={buttonVariants({ variant, tone, magnitude, emphasis, stretch })}
      {...props}
    />
  );
}
