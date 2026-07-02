import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

export type NumberFieldScrubAreaCursorProps = Omit<
  BaseNumberField.ScrubAreaCursor.Props,
  "className" | "style"
>;

/** The virtual cursor shown while scrubbing; pass your cursor svg as children. */
export function NumberFieldScrubAreaCursor(props: NumberFieldScrubAreaCursorProps) {
  return <BaseNumberField.ScrubAreaCursor {...props} />;
}
