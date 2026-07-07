import { Toggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";
import type * as React from "react";

import {
  PillLabel,
  type PillMagnitude,
  PillSwitch as PillSwitchElement,
} from "../../elements/pill";

export type PillSwitchProps<Value extends string = string> = Omit<
  BaseToggleTypes.Props<Value>,
  "children" | "className" | "style"
> & {
  /** Size of the pill. */
  magnitude: PillMagnitude;
  /** Element rendered before the label (inline-start), e.g. `<Icon icon={Tag} />`. */
  startIcon?: React.ReactNode;
  /** Element rendered after the label (inline-end), e.g. `<Icon icon={X} />`. */
  endIcon?: React.ReactNode;
  /** Visible pill label. */
  label: string;
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
  label,
  ...toggleProps
}: PillSwitchProps<Value>) {
  return (
    <Toggle {...toggleProps} render={<PillSwitchElement magnitude={magnitude} />}>
      {startIcon}
      <PillLabel>{label}</PillLabel>
      {endIcon}
    </Toggle>
  );
}
