import { Radio as BaseRadio } from "@base-ui/react/radio";

import { Radio as RadioElement, RadioIndicator } from "../../elements/radio";

export type RadioProps = Omit<BaseRadio.Root.Props, "className" | "style">;

/**
 * The ready-made radio option: grafts Base UI's `Radio` behavior onto the styled `Radio` ring and
 * `RadioIndicator` dot. The 16px ring and 8px inner dot follow Figma node 2159-4535; the selected
 * and disabled states come from the primitive. Use `disabled` for a non-editable (read-only)
 * option. Must be rendered inside a `RadioGroup`.
 *
 * @param value - The unique value this option contributes to its `RadioGroup`.
 */
export function Radio(props: RadioProps) {
  return (
    <BaseRadio.Root render={<RadioElement />} {...props}>
      <BaseRadio.Indicator render={<RadioIndicator />} />
    </BaseRadio.Root>
  );
}
