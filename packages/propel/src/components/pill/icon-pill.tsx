import { Button as BaseButton } from "@base-ui/react/button";
import { cva, cx } from "class-variance-authority";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import { pillBase, PillSpinner, type PillMagnitude } from "./pill-context";

const iconPillVariants = cva(
  cx(
    pillBase,
    "cursor-pointer border-subtle-1 bg-layer-2 text-icon-secondary",
    "hover:border-strong hover:bg-layer-2-hover",
    "active:border-strong active:bg-layer-2-active",
    "disabled:cursor-not-allowed disabled:border-subtle-1 disabled:bg-layer-transparent disabled:text-icon-disabled",
    "aria-busy:cursor-default aria-busy:border-subtle-1 aria-busy:bg-layer-transparent aria-busy:text-icon-disabled",
  ),
  {
    variants: {
      magnitude: {
        sm: "size-5 [--node-size:0.875rem]",
        md: "size-6 [--node-size:1rem]",
        lg: "size-7 [--node-size:1rem]",
      },
    },
  },
);

export type IconPillProps = Omit<
  React.ComponentProps<typeof BaseButton>,
  "className" | "style" | "children"
> & {
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
