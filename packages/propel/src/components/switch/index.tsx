import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cva, cx, type VariantProps } from "class-variance-authority";
import type * as React from "react";

// Magnitudes follow the Figma "Toggle" Size scale (track w×h, px):
//   L 30×18 → lg · M 27×16 → md · S 23×14 → sm.
// The thumb is the track height minus a 1px gap top/bottom; on/off it travels
// from the 1px gutter on one side to the 1px gutter on the other.
const trackVariants = cva(
  cx(
    "relative inline-flex shrink-0 items-center rounded-full p-px transition-colors",
    // Off track = Figma icon/placeholder; on track = accent/primary.
    "bg-icon-placeholder data-[checked]:bg-accent-primary",
    // Unchangeable (disabled or readonly) dims the whole control to 40%,
    // matching Figma's "Unchangeable" states. Disabled also blocks the cursor.
    "data-[readonly]:opacity-40 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40",
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
    defaultVariants: {
      // Figma's default Toggle is Size=M.
      magnitude: "md",
    },
  },
);

// Thumb diameter per magnitude (track height − 2px gap) and the travel distance
// when checked (track width − thumb − 2px of gutters).
const thumbVariants = cva("rounded-full bg-surface-1 shadow-sm transition-transform", {
  variants: {
    magnitude: {
      lg: "size-4 data-[checked]:translate-x-[12px]",
      md: "size-3.5 data-[checked]:translate-x-[11px]",
      sm: "size-3 data-[checked]:translate-x-[9px]",
    },
  },
  defaultVariants: {
    magnitude: "md",
  },
});

export type SwitchMagnitude = NonNullable<VariantProps<typeof trackVariants>["magnitude"]>;

export type SwitchProps = Omit<
  React.ComponentProps<typeof BaseSwitch.Root>,
  "className" | "render" | "style"
> & {
  /**
   * Track + thumb size, from the Figma "Toggle" Size scale:
   * `lg` 30×18, `md` 27×16, `sm` 23×14. Defaults to `md`.
   */
  magnitude?: SwitchMagnitude;
};

/**
 * A switch toggles a single setting on or off. Built on Base UI's `Switch`
 * (so it carries `role="switch"` and full keyboard/form support). Maps to
 * Figma's "Toggle" component.
 *
 * On/off, `disabled`, and `readOnly` are control state from the primitive, not
 * variants — pass them as props (`checked`/`defaultChecked`, `disabled`,
 * `readOnly`). Only the size axis (`magnitude`) is a visual variant.
 */
export function Switch({ magnitude, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root className={trackVariants({ magnitude })} {...props}>
      <BaseSwitch.Thumb className={thumbVariants({ magnitude })} />
    </BaseSwitch.Root>
  );
}
