import {
  Switch as SwitchRoot,
  type SwitchProps as SwitchRootProps,
  SwitchThumb,
} from "../../ui/switch";

export type { SwitchMagnitude } from "../../ui/switch";

export type SwitchProps = SwitchRootProps;

/**
 * The ready-made switch: composes the atomic `Switch` track with its `SwitchThumb`. The track owns
 * the required `magnitude`; the thumb sizes itself from it. Built on Base UI's `Switch` (so it
 * carries `role="switch"` and full keyboard/form support). Maps to Figma's "Toggle" component.
 *
 * On/off, `disabled`, and `readOnly` are control state from the primitive, not variants — pass them
 * as props (`checked`/`defaultChecked`, `disabled`, `readOnly`). Only the size axis (`magnitude`)
 * is a visual variant.
 */
export function Switch({ magnitude, ...props }: SwitchProps) {
  return (
    <SwitchRoot magnitude={magnitude} {...props}>
      <SwitchThumb />
    </SwitchRoot>
  );
}
