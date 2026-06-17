import { Button as BaseButton } from "@base-ui/react/button";
import { cx } from "class-variance-authority";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import { PillLabel } from "./pill-label";
import { labelFontByMagnitude, labelPillSize, type PillMagnitude } from "./pill-shared";
import { PillSpinner } from "./pill-spinner";

export type { PillMagnitude } from "./pill-shared";

const pillButtonColors = cx(
  "cursor-pointer border-subtle-1 bg-layer-2 text-secondary",
  "hover:border-strong hover:bg-layer-2-hover",
  "active:border-strong active:bg-layer-2-active active:text-primary",
  "disabled:cursor-not-allowed disabled:border-subtle-1 disabled:bg-layer-transparent disabled:text-disabled",
  "aria-busy:cursor-default aria-busy:border-subtle-1 aria-busy:bg-layer-transparent aria-busy:text-disabled",
);

export type PillButtonProps = Omit<
  React.ComponentProps<typeof BaseButton>,
  "className" | "style"
> & {
  /** Box scale. `sm` 20px / `md` 24px / `lg` 28px. */
  magnitude: PillMagnitude;
  /** A 14px node before the label. */
  inlineStartNode?: React.ReactNode;
  /** A 14px node after the label. */
  inlineEndNode?: React.ReactNode;
  /** Busy state: swaps the inline-start node for a spinner and blocks clicks. */
  loading?: boolean;
};

/** A pill-shaped button. */
export function PillButton({
  magnitude,
  inlineStartNode,
  inlineEndNode,
  loading = false,
  children,
  type = "button",
  disabled,
  ...props
}: PillButtonProps) {
  return (
    <BaseButton
      type={type}
      {...props}
      disabled={disabled || loading}
      focusableWhenDisabled={loading ? true : undefined}
      aria-busy={loading ? true : undefined}
      className={cx(
        labelPillSize({ magnitude }),
        labelFontByMagnitude[magnitude],
        pillButtonColors,
      )}
    >
      {loading ? (
        <PillSpinner />
      ) : inlineStartNode ? (
        <NodeSlot aria-hidden>{inlineStartNode}</NodeSlot>
      ) : null}
      <PillLabel>{children}</PillLabel>
      {!loading && inlineEndNode ? <NodeSlot aria-hidden>{inlineEndNode}</NodeSlot> : null}
    </BaseButton>
  );
}
