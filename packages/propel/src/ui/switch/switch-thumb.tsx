import { Switch as BaseSwitch } from "@base-ui/react/switch";

import { switchThumbVariants } from "./variants";

export type SwitchThumbProps = Omit<BaseSwitch.Thumb.Props, "className" | "style">;

/**
 * The switch knob (Base UI `Switch.Thumb`). Rendered inside a `Switch`; it slides between the
 * off/on gutters when the track is checked. Its diameter and travel come from the parent `Switch`'s
 * `magnitude` (published as CSS variables on the track), so the thumb takes no size prop of its
 * own.
 */
export function SwitchThumb(props: SwitchThumbProps) {
  return <BaseSwitch.Thumb className={switchThumbVariants()} {...props} />;
}
