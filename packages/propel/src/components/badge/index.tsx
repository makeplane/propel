import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { nodeSlotClass } from "../../internal/node-slot";

// Magnitudes follow the Figma "Badge" Size axis: S → Base → Large. Mapped onto the
// t-shirt scale by their label text size (S 12px, Base 13px, Large 14px), consistent
// with how Avatar names its steps. Height/padding/radius track Figma per step.
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 leading-none font-medium whitespace-nowrap",
  {
    variants: {
      magnitude: {
        // S: 18px tall, 4px x-padding, 4px radius (radius/sm), text/12, 14px icon.
        sm: "h-4.5 rounded-sm px-1 text-caption-md-medium [--node-size:0.875rem]",
        // Base: 20px tall, 6px x-padding, 6px radius (radius/md), text/13, 14px icon.
        md: "h-5 rounded-md px-1.5 text-body-xs-medium [--node-size:0.875rem]",
        // Large: 24px tall, 8px x-padding, 6px radius (radius/md), text/14, 16px icon.
        lg: "h-6 rounded-md px-2 text-body-sm-medium [--node-size:1rem]",
      },
      // The Color axis. Label-hue tones map to the `bg-label-*`/`text-label-*`
      // utilities; semantic tones (brand/info/success/warning/danger) map to the
      // matching subtle background + primary text tokens — no arbitrary hex.
      tone: {
        neutral: "bg-layer-3 text-label-grey-text",
        grey: "bg-label-grey-bg text-label-grey-text",
        brand: "bg-accent-subtle text-accent-primary",
        info: "bg-info-subtle text-info-primary",
        indigo: "bg-label-indigo-bg text-label-indigo-text",
        success: "bg-success-subtle text-success-primary",
        emerald: "bg-label-emerald-bg text-label-emerald-text",
        warning: "bg-warning-subtle text-warning-primary",
        yellow: "bg-label-yellow-bg text-label-yellow-text",
        danger: "bg-danger-subtle text-danger-primary",
        crimson: "bg-label-crimson-bg text-label-crimson-text",
        orange: "bg-label-orange-bg text-label-orange-text",
      },
    },
  },
);

export type BadgeMagnitude = NonNullable<VariantProps<typeof badgeVariants>["magnitude"]>;
export type BadgeTone = NonNullable<VariantProps<typeof badgeVariants>["tone"]>;

export type BadgeProps = Omit<React.ComponentProps<"span">, "className" | "style"> & {
  /** The badge label — text, a count, or any inline content. */
  children?: React.ReactNode;
  /** Color/intent of the badge. */
  tone: BadgeTone;
  /** Size of the badge. */
  magnitude: BadgeMagnitude;
  /**
   * Optional leading icon (e.g. a lucide icon), sized to the magnitude and tinted to
   * the tone. Named `leadingIcon` (not `icon`) to match Button/Input and leave room
   * for a future `trailingIcon`.
   */
  leadingIcon?: React.ReactNode;
};

export function Badge({ children, tone, magnitude, leadingIcon, ...props }: BadgeProps) {
  return (
    <span className={badgeVariants({ tone, magnitude })} {...props}>
      {leadingIcon ? (
        <span aria-hidden className={nodeSlotClass}>
          {leadingIcon}
        </span>
      ) : null}
      {children}
    </span>
  );
}
