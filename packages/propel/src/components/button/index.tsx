export * from "./button";
// Re-export the atomic button's parts and variant axis types so the full button surface is
// importable from this convenience. (cvas + the cva-props bundle stay private to `elements`.)
export {
  ButtonLabel,
  type ButtonLabelProps,
  type ButtonFillType,
  type ButtonSize,
  type ButtonVariant,
} from "../../elements/button";
