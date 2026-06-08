import { cva, cx, type VariantProps } from "class-variance-authority";
import * as React from "react";

// Magnitudes follow the Figma "Badge" Size axis: S → Base → Large. Mapped onto the
// t-shirt scale by their label text size (S 12px, Base 13px, Large 14px), consistent
// with how Avatar names its steps. Height/padding/radius track Figma per step.
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap font-medium leading-none",
  {
    variants: {
      magnitude: {
        // S: 18px tall, 4px x-padding, 4px radius (radius/sm), text/12.
        sm: "h-[18px] rounded-sm px-1 text-12",
        // Base: 20px tall, 6px x-padding, 6px radius (radius/md), text/13.
        md: "h-5 rounded-md px-1.5 text-13",
        // Large: 24px tall, 8px x-padding, 6px radius (radius/md), text/14.
        lg: "h-6 rounded-md px-2 text-14",
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
    // Figma defaults: Color=Neutral, Size=Base.
    defaultVariants: {
      magnitude: "md",
      tone: "neutral",
    },
  },
);

export type BadgeMagnitude = NonNullable<VariantProps<typeof badgeVariants>["magnitude"]>;
export type BadgeTone = NonNullable<VariantProps<typeof badgeVariants>["tone"]>;

// Leading-icon box size per magnitude, from Figma's icon values: 14px for S/Base,
// 16px for Large. The icon inherits the tone's text color via `currentColor`.
const iconSizeByMagnitude: Record<BadgeMagnitude, string> = {
  sm: "size-3.5", // 14px
  md: "size-3.5", // 14px
  lg: "size-4", // 16px
};

export type BadgeProps = Omit<React.ComponentProps<"span">, "className" | "style"> & {
  /** The badge label — text, a count, or any inline content. */
  children?: React.ReactNode;
  /** Color/intent of the badge. */
  tone?: BadgeTone;
  /** Size of the badge. */
  magnitude?: BadgeMagnitude;
  /** Optional leading icon (e.g. a lucide icon), sized to the magnitude and tinted to the tone. */
  icon?: React.ReactNode;
};

export function Badge({ children, tone, magnitude, icon, ...props }: BadgeProps) {
  // Resolve magnitude once so the icon box matches the badge's own scale even when
  // the prop is left at the cva default.
  const effectiveMagnitude = magnitude ?? "md";
  return (
    <span className={badgeVariants({ tone, magnitude })} {...props}>
      {icon != null ? (
        <span
          aria-hidden
          className={cx(
            "inline-flex shrink-0 [&>svg]:size-full",
            iconSizeByMagnitude[effectiveMagnitude],
          )}
        >
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  );
}
