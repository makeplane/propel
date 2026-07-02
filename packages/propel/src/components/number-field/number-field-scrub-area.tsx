import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

export type NumberFieldScrubAreaProps = Omit<
  BaseNumberField.ScrubArea.Props,
  "className" | "style"
>;

/** Drag-to-change scrubbing over the field's label region — Base UI behavior, no chrome. */
export function NumberFieldScrubArea(props: NumberFieldScrubAreaProps) {
  return <BaseNumberField.ScrubArea {...props} />;
}
