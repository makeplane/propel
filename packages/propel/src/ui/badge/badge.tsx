import { type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { badgeVariants } from "./variants";

export type BadgeMagnitude = NonNullable<VariantProps<typeof badgeVariants>["magnitude"]>;
export type BadgeTone = NonNullable<VariantProps<typeof badgeVariants>["tone"]>;
export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

export type BadgeProps = Omit<React.ComponentProps<"span">, "className" | "style"> & {
  /** Color/intent of the badge. */
  tone: BadgeTone;
  /** Size of the badge. */
  magnitude: BadgeMagnitude;
  /** Visual treatment. Currently "solid" (filled); "outline" is a planned future value. */
  variant: BadgeVariant;
};

/**
 * The badge pill: the styled inline-flex container. Compose a `BadgeIcon`, `BadgeLabel`, and/or
 * `BadgeDismiss` inside it (or use the ready-made `components/badge` composition). Sets the tone's
 * text color and the magnitude's `--node-size`, which its slot children inherit.
 */
export function Badge({ tone, magnitude, variant, ...props }: BadgeProps) {
  return <span className={badgeVariants({ tone, magnitude, variant })} {...props} />;
}
