import { cva, cx } from "class-variance-authority";

// Magnitudes follow the Figma "Toggle" Size scale (track w×h, px):
//   L 30×18 → lg · M 27×16 → md · S 23×14 → sm.
// The thumb is the track height minus a 1px gap top/bottom; on/off it travels
// from the 1px gutter on one side to the 1px gutter on the other.
//
// `magnitude` lives on the track only. Each magnitude publishes the thumb's
// diameter and checked-state travel as CSS variables (`--switch-thumb-size`,
// `--switch-thumb-travel`); the thumb reads them off its parent track rather
// than taking its own size prop — the node-slot philosophy applied to the knob,
// so the track stays the single source of the size axis.
export const switchVariants = cva(
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
        lg: "h-[18px] w-[30px] [--switch-thumb-size:1rem] [--switch-thumb-travel:12px]",
        md: "h-4 w-[27px] [--switch-thumb-size:0.875rem] [--switch-thumb-travel:11px]",
        sm: "h-[14px] w-[23px] [--switch-thumb-size:0.75rem] [--switch-thumb-travel:9px]",
      },
    },
  },
);

// The sliding knob. Its diameter (track height − 2px gap) and checked-state
// travel (track width − thumb − 2px of gutters) both come from the track's
// per-magnitude CSS variables, so the thumb has no size axis of its own.
// In RTL the thumb travels toward the inline-start edge, so the translate is
// negated. The thumb stays white in every theme and in both on/off states:
// `on-color` is the white-on-tone token, which holds across the theme flip.
export const switchThumbVariants = cva(
  cx(
    "size-(--switch-thumb-size) rounded-full bg-on-color shadow-raised-100 transition-transform",
    "data-checked:translate-x-(--switch-thumb-travel)",
    "rtl:data-checked:-translate-x-(--switch-thumb-travel)",
  ),
);
