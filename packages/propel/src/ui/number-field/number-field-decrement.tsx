import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

export type NumberFieldDecrementProps = Omit<
  BaseNumberField.Decrement.Props,
  "className" | "style"
>;

/**
 * A behavior wrapper that decrements the number field value when activated. Use as the `render`
 * target of an `IconButton` so the styled primitive's look (and glyph scale) wins via
 * render-composition. Maps 1:1 to `NumberField.Decrement`.
 */
export function NumberFieldDecrement(props: NumberFieldDecrementProps) {
  return <BaseNumberField.Decrement {...props} />;
}
