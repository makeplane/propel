import {
  Radio as RadioElement,
  RadioIndicator,
  type RadioProps as RadioElementProps,
} from "../../ui/radio";

export type RadioProps = RadioElementProps;

/**
 * The ready-made radio option: composes the atomic `Radio` ring with its `RadioIndicator` dot. The
 * 16px ring and 8px inner dot follow Figma node 2159-4535; the selected and disabled states come
 * from the primitive. Use `disabled` for a non-editable (read-only) option. Must be rendered inside
 * a `RadioGroup`.
 *
 * @param value - The unique value this option contributes to its `RadioGroup`.
 */
export function Radio(props: RadioProps) {
  return (
    <RadioElement {...props}>
      <RadioIndicator />
    </RadioElement>
  );
}
