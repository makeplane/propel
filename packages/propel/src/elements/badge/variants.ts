import { cva, type VariantProps } from "class-variance-authority";

import { type StrictVariantProps } from "../../internal/variant-props";

// Badge is the small rounded pill of inline text (a status tag, a "Paid"/"Free"
// label). Per the designer spec on the Badge issue, every part's static chrome lives
// in cva here so each part stays a single styled element with no `className` at the
// boundary.
//
// "Always the same" (baked into the base of `badgeVariants`):
//   pill shape (rounded-full), inline-flex with centered content, the gap between
//   icon/label/dismiss, font-medium, single-line text (whitespace-nowrap), and the
//   icon-to-text vertical alignment (leading-none).
//
// "Depends (adjustable)" — exposed as required cva variants:
//   - magnitude: S / Base / Large (height, horizontal padding, text size, node size)
//   - tone: color/sentiment (neutral, grey, brand, …)
export const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-sm leading-none font-medium whitespace-nowrap",
  {
    variants: {
      // Figma Size axis. Each step sets height, horizontal padding, text size, and the
      // CSS custom property `--node-size` consumed by the node-slot children.
      magnitude: {
        // S: 18px tall, 4px x-padding, text/12, 14px nodes.
        sm: "h-[18px] px-1 text-12 [--node-size:0.875rem]",
        // Base: 20px tall, 6px x-padding, text/13, 14px nodes.
        md: "h-5 px-1.5 text-13 [--node-size:0.875rem]",
        // Large: 24px tall, 8px x-padding, text/14, 16px nodes.
        lg: "h-6 px-2 text-14 [--node-size:1rem]",
      },
      // Figma Color/sentiment axis — exactly the 11 tones the spec's Color property lists
      // (`danger` = Figma's "Error"; no `info`, the spec defines none). Label-hue tones map to
      // `bg-label-*`/`text-label-*` utilities; semantic tones (brand/success/warning/danger) map
      // to the matching subtle background + primary text tokens — no arbitrary hex.
      tone: {
        neutral: "bg-layer-3 text-label-grey-text",
        grey: "bg-label-grey-bg text-label-grey-text",
        brand: "bg-accent-subtle text-accent-primary",
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

type BadgeVariantConfig = VariantProps<typeof badgeVariants>;
export type BadgeMagnitude = NonNullable<BadgeVariantConfig["magnitude"]>;
export type BadgeTone = NonNullable<BadgeVariantConfig["tone"]>;
export type BadgeVariantProps = StrictVariantProps<typeof badgeVariants>;

// The badge's text label. Single-line (the base already sets `whitespace-nowrap`); kept
// as its own region so the label and leading/trailing icons compose as siblings.
export const badgeLabelVariants = cva("min-w-0");
