import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type * as React from "react";

import type { SwitchMagnitude } from "./switch";
import { thumbVariants } from "./variants";

export type SwitchThumbProps = Omit<
  React.ComponentProps<typeof BaseSwitch.Thumb>,
  "className" | "style"
> & {
  /** Must match the parent `Switch`'s `magnitude` so the thumb travel lines up with the track. */
  magnitude: SwitchMagnitude;
};

/**
 * The switch knob (Base UI `Switch.Thumb`). Rendered inside a `Switch`; it slides between the
 * off/on gutters when the track is checked. Pass the same `magnitude` as the parent `Switch`.
 */
export function SwitchThumb({ magnitude, ...props }: SwitchThumbProps) {
  return <BaseSwitch.Thumb className={thumbVariants({ magnitude })} {...props} />;
}
