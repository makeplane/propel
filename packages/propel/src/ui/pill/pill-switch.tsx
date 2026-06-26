import { Toggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";

import { pillSwitchVariants, type PillSwitchVariantProps } from "./variants";

export type PillSwitchProps<Value extends string = string> = Omit<
  BaseToggleTypes.Props<Value>,
  "className" | "style"
> &
  PillSwitchVariantProps;

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
