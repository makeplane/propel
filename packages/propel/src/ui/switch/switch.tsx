import { Switch as BaseSwitch } from "@base-ui/react/switch";

import { type SwitchVariantProps, switchVariants } from "./variants";

export type { SwitchMagnitude, SwitchVariantProps } from "./variants";

export type SwitchProps = Omit<BaseSwitch.Root.Props, "className" | "style"> & SwitchVariantProps;

/**
 * The switch track (Base UI `Switch.Root`). A switch toggles a single setting on or off; the Root
 * carries `role="switch"` and full keyboard/form support. Maps to Figma's "Toggle" component.
 * Render a `SwitchThumb` as its child; the thumb sizes itself from this track's `magnitude`.
 *
 * On/off, `disabled`, and `readOnly` are control state from the primitive, not variants — pass them
 * as props (`checked`/`defaultChecked`, `disabled`, `readOnly`). Only the size axis (`magnitude`)
 * is a visual variant.
 */
export function Switch({ magnitude, ...props }: SwitchProps) {
  return <BaseSwitch.Root className={switchVariants({ magnitude })} {...props} />;
}
