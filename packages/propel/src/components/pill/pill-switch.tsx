import { Toggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";
import type * as React from "react";

import {
  PillLabel,
  type PillMagnitude,
  PillSwitch as PillSwitchElement,
} from "../../elements/pill";
import { Icon } from "../../internal/icon";

export type PillSwitchProps<Value extends string = string> = Omit<
  BaseToggleTypes.Props<Value>,
  "className" | "style"
> & {
  /** Size of the pill. */
  magnitude: PillMagnitude;
  /** A node before the label (inline-start), sized to the pill's `--node-size`. */
  startIcon?: React.ReactNode;
  /** A node after the label (inline-end), sized to the pill's `--node-size`. */
  endIcon?: React.ReactNode;
};

/**
 * The ready-made toggle pill: grafts Base UI's `Toggle` behavior onto the styled `PillSwitch`
 * container (behavior outer, the styled button as the render target), with an optional leading
 * node, the `PillLabel`, and an optional trailing node. The selected look is the container's
 * pressed state.
 */
export function PillSwitch<Value extends string = string>({
  magnitude,
  startIcon,
  endIcon,
  children,
  ...toggleProps
}: PillSwitchProps<Value>) {
  return (
    <Toggle {...toggleProps} render={<PillSwitchElement magnitude={magnitude} />}>
      {startIcon ? <Icon>{startIcon}</Icon> : null}
      <PillLabel>{children}</PillLabel>
      {endIcon ? <Icon>{endIcon}</Icon> : null}
    </Toggle>
  );
}
