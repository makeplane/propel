import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";

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
//   - tone: color/sentiment (neutral, grey, brand, info, …)
//   - variant: Solid (outline listed as a potential future value — axis introduced now)
export const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full leading-none font-medium whitespace-nowrap",
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

// The decorative leading icon at the badge's inline-start (the Figma badge icon). Sizes
// its single child to the badge's `--node-size` (shared node-slot class) and inherits
// the tone's text color so the icon tints to match — per the spec, "icon follows the
// badge's size and color".
export const badgeIconVariants = cva(nodeSlotClass);

// The badge's text label. Single-line (the base already sets `whitespace-nowrap`); kept
// as its own region so the label, leading icon, and dismiss action compose as siblings.
export const badgeLabelVariants = cva("min-w-0");

// The optional dismiss/remove action at the badge's inline-end. A button that sizes its
// single child (the dismiss glyph, passed in) to the badge's `--node-size`, inherits the
// tone's text color, and dims slightly until hovered so it reads as secondary to the label.
export const badgeDismissVariants = cva(
  cx(
    nodeSlotClass,
    "-me-0.5 cursor-pointer rounded-full opacity-70",
    "outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-accent-strong",
  ),
);
