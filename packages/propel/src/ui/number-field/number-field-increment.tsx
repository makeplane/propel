import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

export type NumberFieldIncrementProps = Omit<
  BaseNumberField.Increment.Props,
  "className" | "style"
>;

/**
 * A behavior wrapper that increments the number field value when activated. Use as the `render`
 * target of an `IconButton` so the styled primitive's look (and glyph scale) wins via
 * render-composition. Maps 1:1 to `NumberField.Increment`.
 */
export function NumberFieldIncrement(props: NumberFieldIncrementProps) {
  return <BaseNumberField.Increment {...props} />;
}
