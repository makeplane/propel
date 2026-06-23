import { Button as BaseButton } from "@base-ui/react/button";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import { PillLabel } from "./pill-label";
import { PillSpinner } from "./pill-spinner";
import { pillButtonVariants, type PillMagnitude } from "./variants";

export type { PillMagnitude } from "./variants";

export type PillButtonProps = Omit<BaseButton.Props, "className" | "style"> & {
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
      className={pillButtonVariants({ magnitude })}
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
