import { Button as BaseButton } from "@base-ui/react/button";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import { PillSpinner } from "./pill-spinner";
import { iconPillVariants, type PillMagnitude } from "./variants";

export type IconPillProps = Omit<BaseButton.Props, "className" | "style" | "children"> & {
  /** Box scale. */
  magnitude: PillMagnitude;
  /** The icon, sized and tinted by the pill. */
  children: React.ReactNode;
  /** Accessible name — required because the content is an icon. */
  "aria-label": string;
  /** Busy state: swaps the icon for a spinner and blocks clicks. */
  loading?: boolean;
};

/** An icon-only square pill. */
export function IconPill({
  magnitude,
  loading = false,
  children,
  type = "button",
  disabled,
  ...props
}: IconPillProps) {
  return (
    <BaseButton
      type={type}
      {...props}
      disabled={disabled || loading}
      focusableWhenDisabled={loading ? true : undefined}
      aria-busy={loading ? true : undefined}
      className={iconPillVariants({ magnitude })}
    >
      {loading ? <PillSpinner /> : <NodeSlot aria-hidden>{children}</NodeSlot>}
    </BaseButton>
  );
}
