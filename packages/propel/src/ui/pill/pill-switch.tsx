import { Toggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import { PillLabel } from "./pill-label";
import { pillSwitchVariants, type PillMagnitude } from "./variants";

export type PillSwitchProps<Value extends string = string> = Omit<
  BaseToggleTypes.Props<Value>,
  "className" | "style"
> & {
  /** Box scale. `sm` 20px / `md` 24px / `lg` 28px. */
  magnitude: PillMagnitude;
  /** A 14px node before the label. */
  inlineStartNode?: React.ReactNode;
  /** A 14px node after the label. */
  inlineEndNode?: React.ReactNode;
};

/** A toggle pill. */
export function PillSwitch<Value extends string = string>({
  magnitude,
  inlineStartNode,
  inlineEndNode,
  children,
  ...props
}: PillSwitchProps<Value>) {
  return (
    <Toggle className={pillSwitchVariants({ magnitude })} {...props}>
      {inlineStartNode ? <NodeSlot aria-hidden>{inlineStartNode}</NodeSlot> : null}
      <PillLabel>{children}</PillLabel>
      {inlineEndNode ? <NodeSlot aria-hidden>{inlineEndNode}</NodeSlot> : null}
    </Toggle>
  );
}
