import { Toggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";
import type * as React from "react";

import {
  PillIcon,
  PillLabel,
  type PillMagnitude,
  PillSwitch as PillSwitchElement,
} from "../../elements/pill";

export type PillSwitchProps<Value extends string = string> = Omit<
  BaseToggleTypes.Props<Value>,
  "className" | "style"
> & {
  /** Size of the pill. */
  magnitude: PillMagnitude;
  /** A node before the label (inline-start), sized to the pill's `--node-size`. */
  inlineStartNode?: React.ReactNode;
  /** A node after the label (inline-end), sized to the pill's `--node-size`. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made toggle pill: grafts Base UI's `Toggle` behavior onto the styled `PillSwitch`
 * container (behavior outer, the styled button as the render target), with an optional leading
 * node, the `PillLabel`, and an optional trailing node. The selected look is the container's
 * pressed state.
 */
export function PillSwitch<Value extends string = string>({
  magnitude,
  inlineStartNode,
  inlineEndNode,
  children,
  ...toggleProps
}: PillSwitchProps<Value>) {
  return (
    <Toggle {...toggleProps} render={<PillSwitchElement magnitude={magnitude} />}>
      {inlineStartNode ? <PillIcon>{inlineStartNode}</PillIcon> : null}
      <PillLabel>{children}</PillLabel>
      {inlineEndNode ? <PillIcon>{inlineEndNode}</PillIcon> : null}
    </Toggle>
  );
}
