import type * as React from "react";

import {
  PillIcon,
  PillLabel,
  PillSwitch as PillSwitchElement,
  type PillSwitchProps as PillSwitchElementProps,
} from "../../ui/pill";

export type PillSwitchProps<Value extends string = string> = PillSwitchElementProps<Value> & {
  /** A node before the label (inline-start), sized to the pill's `--node-size`. */
  inlineStartNode?: React.ReactNode;
  /** A node after the label (inline-end), sized to the pill's `--node-size`. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made toggle pill: composes the `PillSwitch` container with an optional leading node,
 * the `PillLabel`, and an optional trailing node. The selected look is the container's pressed
 * state.
 */
export function PillSwitch<Value extends string = string>({
  inlineStartNode,
  inlineEndNode,
  children,
  ...props
}: PillSwitchProps<Value>) {
  return (
    <PillSwitchElement {...props}>
      {inlineStartNode ? <PillIcon>{inlineStartNode}</PillIcon> : null}
      <PillLabel>{children}</PillLabel>
      {inlineEndNode ? <PillIcon>{inlineEndNode}</PillIcon> : null}
    </PillSwitchElement>
  );
}
