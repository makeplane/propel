import { cva } from "class-variance-authority";

// Magnitudes follow the Figma "Badge" Size axis: S → Base → Large. Mapped onto the
// t-shirt scale by their label text size (S 12px, Base 13px, Large 14px), consistent
// with how Avatar names its steps. Height/padding track Figma per step.
//
// "Always the same" per Figma spec (baked into base):
//   pill shape (rounded-full), inline-flex, centered content, gap, font-medium,
//   whitespace-nowrap (single-line text), vertical text-icon alignment via leading-none.
//
// "Depends (adjustable)" axes:
//   - magnitude: S / Base / Large (controls height, padding, text size, node size)
//   - tone: color/sentiment (neutral, grey, brand, info, …)
//   - variant: Solid (potentially outline in future — axis introduced now per spec)
export const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full leading-none font-medium whitespace-nowrap",
  {
    variants: {
      // Figma Size axis. Each step sets height, horizontal padding, text size, and the
      // CSS custom property `--node-size` consumed by inline NodeSlot children.
      magnitude: {
        // S: 18px tall, 4px x-padding, text/12, 14px nodes.
        sm: "h-[18px] px-1 text-12 [--node-size:0.875rem]",
        // Base: 20px tall, 6px x-padding, text/13, 14px nodes.
        md: "h-5 px-1.5 text-13 [--node-size:0.875rem]",
        // Large: 24px tall, 8px x-padding, text/14, 16px nodes.
        lg: "h-6 px-2 text-14 [--node-size:1rem]",
      },
      // Figma Color/sentiment axis. Label-hue tones map to `bg-label-*`/`text-label-*`
      // utilities; semantic tones (brand/info/success/warning/danger) map to the matching
      // subtle background + primary text tokens — no arbitrary hex.
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
      // Figma Variant axis. Currently only "solid" (filled background) exists; "outline"
      // is listed as a potential future value. The axis is introduced now so call sites
      // are forward-compatible.
      variant: {
        solid: "",
      },
    },
  },
);
