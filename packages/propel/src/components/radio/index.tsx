import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { cva, cx } from "class-variance-authority";
import * as React from "react";

// The Figma "Radiobutton" component (node 2159-4535) defines a single 16px control
// with three states — Default (empty ring), Selected (accent ring + 8px inner dot),
// and Read only (muted grey dot). States come from the Base UI primitive's data
// attributes (`data-checked` / `data-disabled` / `data-readonly`), not from variants.
//
// Color strategy: the ring stroke and the inner dot both inherit `currentColor`, so
// flipping the Root's text color in one place recolors the whole control.
//   - resting / read-only → `icon/tertiary` (the muted grey from Figma)
//   - selected            → `icon/accent/primary` (the brand accent from Figma)
// Read-only keeps the grey even when checked because it is non-interactive.
const radioVariants = cva(
  cx(
    "flex size-4 shrink-0 items-center justify-center rounded-full border-sm border-current bg-layer-1",
    "text-icon-tertiary outline-none transition-colors",
    // Selected uses the accent color for both the ring and the dot.
    "data-[checked]:text-icon-accent-primary",
    // Read-only stays muted grey even when selected, since it can't be changed.
    "data-[readonly]:text-icon-tertiary",
    // Keyboard focus ring, drawn outside the control so it never clips the dot.
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2",
    // Disabled is dimmed and non-interactive.
    "data-[disabled]:cursor-not-allowed data-[disabled]:text-icon-disabled data-[disabled]:opacity-60",
  ),
);

export type RadioGroupProps = Omit<
  React.ComponentProps<typeof BaseRadioGroup>,
  "className" | "render" | "style"
>;

/**
 * Groups a set of `Radio` options so exactly one can be selected at a time. Wrap
 * `Radio` children in it and drive the selection with `value`/`defaultValue` +
 * `onValueChange`. Renders a `<div>` with `role="radiogroup"`.
 */
export function RadioGroup(props: RadioGroupProps) {
  return <BaseRadioGroup className="flex flex-col gap-2" {...props} />;
}

export type RadioProps = Omit<
  React.ComponentProps<typeof BaseRadio.Root>,
  "className" | "render" | "style"
>;

/**
 * A single radio option (Base UI `Radio.Root` + `Radio.Indicator`). The 16px ring
 * and 8px inner dot follow Figma node 2159-4535; selection, disabled, and read-only
 * states all come from the primitive. Must be rendered inside a `RadioGroup`.
 *
 * @param value - The unique value this option contributes to its `RadioGroup`.
 */
export function Radio(props: RadioProps) {
  return (
    <BaseRadio.Root className={radioVariants()} {...props}>
      <BaseRadio.Indicator
        // The inner dot: 8px (`size-2`) filled with the Root's `currentColor`, only
        // present while selected (Base UI mounts the Indicator when checked).
        className="size-2 rounded-full bg-current"
      />
    </BaseRadio.Root>
  );
}
