import { Toggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";
import { cx } from "class-variance-authority";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import { labelFontByMagnitude, labelPillSize, PillLabel, type PillMagnitude } from "./pill-shared";

const pillSwitchColors = cx(
  "cursor-pointer border-subtle-1 bg-layer-2 text-secondary",
  "hover:border-strong hover:bg-layer-2-hover",
  "data-pressed:border-strong data-pressed:bg-layer-2-selected data-pressed:text-primary",
  "disabled:cursor-not-allowed disabled:border-subtle-1 disabled:bg-layer-transparent disabled:text-disabled",
);

export type PillSwitchProps<Value extends string = string> = Omit<
  BaseToggleTypes.Props<Value>,
  "className" | "render" | "style"
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
    <Toggle
      className={cx(
        labelPillSize({ magnitude }),
        labelFontByMagnitude[magnitude],
        pillSwitchColors,
      )}
      {...props}
    >
      {inlineStartNode ? <NodeSlot aria-hidden>{inlineStartNode}</NodeSlot> : null}
      <PillLabel>{children}</PillLabel>
      {inlineEndNode ? <NodeSlot aria-hidden>{inlineEndNode}</NodeSlot> : null}
    </Toggle>
  );
}
