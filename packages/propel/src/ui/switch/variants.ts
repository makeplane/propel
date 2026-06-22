import { cva, cx } from "class-variance-authority";

// Magnitudes follow the Figma "Toggle" Size scale (track w×h, px):
//   L 30×18 → lg · M 27×16 → md · S 23×14 → sm.
// The thumb is the track height minus a 1px gap top/bottom; on/off it travels
// from the 1px gutter on one side to the 1px gutter on the other.
export const trackVariants = cva(
  cx(
    "relative inline-flex shrink-0 items-center rounded-full p-px transition-colors",
    // Off track = Figma icon/placeholder; on track = accent/primary.
    "bg-icon-placeholder data-checked:bg-accent-primary",
    // Unchangeable (disabled or readonly) dims the whole control to 40%,
    // matching Figma's "Unchangeable" states. Disabled also blocks the cursor.
    "data-disabled:cursor-not-allowed data-disabled:opacity-40 data-readonly:opacity-40",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong",
  ),
  {
    variants: {
      magnitude: {
        lg: "h-[18px] w-[30px]",
        md: "h-4 w-[27px]",
        sm: "h-[14px] w-[23px]",
      },
    },
  },
);

// Thumb diameter per magnitude (track height − 2px gap) and the travel distance
// when checked (track width − thumb − 2px of gutters).
// The thumb stays white in every theme and in both on/off states. `surface-1`
// is white in light mode but flips dark in dark mode, so the thumb pins to the
// on-color token (the white-on-tone color) regardless of checked state.
export const thumbVariants = cva(
  "rounded-full bg-on-color shadow-raised-100 transition-transform",
  {
    variants: {
      magnitude: {
        lg: "size-4 data-checked:translate-x-[12px]",
        md: "size-3.5 data-checked:translate-x-[11px]",
        sm: "size-3 data-checked:translate-x-[9px]",
      },
    },
  },
);
