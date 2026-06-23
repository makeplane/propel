import { Toggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";

import { pillSwitchVariants, type PillMagnitude } from "./variants";

export type PillSwitchProps<Value extends string = string> = Omit<
  BaseToggleTypes.Props<Value>,
  "className" | "style"
> & {
  /** Box scale. `sm` 20px / `md` 24px / `lg` 28px. */
  magnitude: PillMagnitude;
};

/**
 * The toggle pill container. Renders a single Base UI `Toggle` (its pressed state is the selected
 * look); compose a `PillLabel` and optional leading/trailing `PillIcon` inside it.
 */
export function PillSwitch<Value extends string = string>({
  magnitude,
  ...props
}: PillSwitchProps<Value>) {
  return <Toggle className={pillSwitchVariants({ magnitude })} {...props} />;
}
