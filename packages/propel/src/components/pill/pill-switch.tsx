import { Toggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";
import type * as React from "react";

import {
  PillIcon,
  PillLabel,
  type PillMagnitude,
  PillSwitch as PillSwitchElement,
} from "../../ui/pill";

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
 * The ready-made toggle pill: composes the styled `PillSwitch` container with `Toggle` behavior
 * (the styled button stays the outer element, the `Toggle` is grafted via `render`), an optional
 * leading node, the `PillLabel`, and an optional trailing node. The selected look is the
 * container's pressed state.
 */
export function PillSwitch<Value extends string = string>({
  magnitude,
  inlineStartNode,
  inlineEndNode,
  render,
  children,
  ...toggleProps
}: PillSwitchProps<Value>) {
  return (
    <PillSwitchElement magnitude={magnitude} render={<Toggle render={render} {...toggleProps} />}>
      {inlineStartNode ? <PillIcon>{inlineStartNode}</PillIcon> : null}
      <PillLabel>{children}</PillLabel>
      {inlineEndNode ? <PillIcon>{inlineEndNode}</PillIcon> : null}
    </PillSwitchElement>
  );
}
