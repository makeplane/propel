import { type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import { badgeVariants } from "./variants";

export type BadgeMagnitude = NonNullable<VariantProps<typeof badgeVariants>["magnitude"]>;
export type BadgeTone = NonNullable<VariantProps<typeof badgeVariants>["tone"]>;
export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

export type BadgeProps = Omit<React.ComponentProps<"span">, "className" | "style"> & {
  /** The badge label — text, a count, or any inline content. */
  children?: React.ReactNode;
  /** Color/intent of the badge. */
  tone: BadgeTone;
  /** Size of the badge. */
  magnitude: BadgeMagnitude;
  /** Visual treatment. Currently "solid" (filled); "outline" is a planned future value. */
  variant: BadgeVariant;
  /**
   * Node rendered before the label (inline-start). An icon or any node; it is sized to the badge's
   * `--node-size` and inherits the tone's text color. Decorative, kept out of the name.
   */
  inlineStartNode?: React.ReactNode;
  /** Node rendered after the label (inline-end). Sized to the badge's `--node-size`. Decorative. */
  inlineEndNode?: React.ReactNode;
};

export function Badge({
  children,
  tone,
  magnitude,
  variant,
  inlineStartNode,
  inlineEndNode,
  ...props
}: BadgeProps) {
  return (
    <span className={badgeVariants({ tone, magnitude, variant })} {...props}>
      {inlineStartNode ? <NodeSlot aria-hidden>{inlineStartNode}</NodeSlot> : null}
      {children}
      {inlineEndNode ? <NodeSlot aria-hidden>{inlineEndNode}</NodeSlot> : null}
    </span>
  );
}
