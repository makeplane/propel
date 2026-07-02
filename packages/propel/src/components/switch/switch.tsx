import { Switch as BaseSwitch } from "@base-ui/react/switch";

import { Switch as SwitchElement, type SwitchMagnitude, SwitchThumb } from "../../elements/switch";

export type { SwitchMagnitude } from "../../elements/switch";

export type SwitchProps = Omit<BaseSwitch.Root.Props, "className" | "style"> & {
  /** The switch size axis. */
  magnitude: SwitchMagnitude;
};

/**
 * The ready-made switch: grafts Base UI's `Switch` behavior onto the styled `Switch` track and
 * `SwitchThumb` knob. The track owns the required `magnitude`; the thumb sizes itself from it. Base
 * UI supplies `role="switch"` and full keyboard/form support. Maps to Figma's "Toggle" component.
 *
 * On/off, `disabled`, and `readOnly` are control state from the primitive, not variants — pass them
 * as props (`checked`/`defaultChecked`, `disabled`, `readOnly`). Only the size axis (`magnitude`)
 * is a visual variant.
 */
export function Switch({ magnitude, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root render={<SwitchElement magnitude={magnitude} />} {...props}>
      <BaseSwitch.Thumb render={<SwitchThumb />} />
    </BaseSwitch.Root>
  );
}
