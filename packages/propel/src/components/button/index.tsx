export * from "./button";
// Re-export the atomic button's parts, variant types, and `buttonVariants` so the full button
// surface is importable from this convenience.
export {
  ButtonIcon,
  type ButtonIconProps,
  ButtonLabel,
  type ButtonLabelProps,
  ButtonSpinner,
  type ButtonSpinnerProps,
  type ButtonMagnitude,
  type ButtonSizing,
  type ButtonTone,
  type ButtonProminence,
  buttonVariants,
} from "../../ui/button";
