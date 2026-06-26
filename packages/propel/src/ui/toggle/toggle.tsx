import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";

import { type ToggleVariantProps, toggleVariants } from "./variants";

export type ToggleProps<Value extends string = string> = Omit<
  BaseToggleTypes.Props<Value>,
  "className" | "style"
> &
  ToggleVariantProps;

/**
 * A two-state button (pressed / not pressed) — typically wrapping an icon. Built on Base UI's
 * `Toggle`; pressed/disabled are control state. Only `magnitude` is a visual axis. Maps 1:1 to
 * `Toggle`.
 */
export function Toggle<Value extends string = string>({ magnitude, ...props }: ToggleProps<Value>) {
  return <BaseToggle className={toggleVariants({ magnitude })} {...props} />;
}
