import { cva } from "class-variance-authority";

// Magnitudes follow the Figma "Badge" Size axis: S → Base → Large. Mapped onto the
// t-shirt scale by their label text size (S 12px, Base 13px, Large 14px), consistent
// with how Avatar names its steps. Height/padding/radius track Figma per step.
export const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 leading-none font-medium whitespace-nowrap",
  {
    variants: {
      magnitude: {
        // S: 18px tall, 4px x-padding, 4px radius (radius/sm), text/12, 14px nodes.
        sm: "h-[18px] rounded-sm px-1 text-12 [--node-size:0.875rem]",
        // Base: 20px tall, 6px x-padding, 6px radius (radius/md), text/13, 14px nodes.
        md: "h-5 rounded-md px-1.5 text-13 [--node-size:0.875rem]",
        // Large: 24px tall, 8px x-padding, 6px radius (radius/md), text/14, 16px nodes.
        lg: "h-6 rounded-md px-2 text-14 [--node-size:1rem]",
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
