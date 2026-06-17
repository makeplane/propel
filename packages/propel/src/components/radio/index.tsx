import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { cva, cx, type VariantProps } from "class-variance-authority";
import * as React from "react";

// The Figma "Radiobutton" component (node 2159-4535) defines a single 16px control
// with three states — Default (empty ring), Selected (accent ring + 8px inner dot),
// and a non-editable state (muted grey dot). States come from the Base UI primitive's
// data attributes (`data-checked` / `data-disabled`), not from variants.
//
// Note on "read only": Base UI's `readOnly` stamps `aria-readonly` onto the
// `role="radio"` element, which ARIA does not allow on that role (axe
// `aria-allowed-attr`). The non-editable state is therefore expressed via `disabled`,
// which maps to the ARIA-valid `aria-disabled` and keeps the control non-interactive.
//
// Color strategy: the ring stroke and the inner dot both inherit `currentColor`, so
// flipping the Root's text color in one place recolors the whole control.
//   - resting    → `icon/tertiary` (the muted grey from Figma)
//   - selected   → `icon/accent/primary` (the brand accent from Figma)
//   - disabled   → dimmed `icon/disabled`, non-interactive
const radioVariants = cva(
  cx(
    "flex size-4 shrink-0 items-center justify-center rounded-full border-sm border-current bg-layer-1",
    "text-icon-tertiary transition-colors outline-none",
    // Selected uses the accent color for both the ring and the dot.
    "data-[checked]:text-icon-accent-primary",
    // Keyboard focus ring, drawn outside the control so it never clips the dot.
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2",
    // Disabled is dimmed and non-interactive.
    "data-[disabled]:cursor-not-allowed data-[disabled]:text-icon-disabled data-[disabled]:opacity-60",
  ),
);

// Row spacing is a property of the group, not something a consumer should reach in and
// override from outside. `comfortable` is the default 8px rhythm; `compact` sits the rows
// flush (e.g. a settings panel where options read like menu items).
const radioGroupVariants = cva("flex flex-col", {
  variants: {
    density: {
      comfortable: "gap-2",
      compact: "gap-0",
    },
  },
});

export type RadioGroupDensity = NonNullable<VariantProps<typeof radioGroupVariants>["density"]>;

export type RadioGroupProps = Omit<
  React.ComponentProps<typeof BaseRadioGroup>,
  "className" | "render" | "style"
> & {
  /** Spacing between options: `comfortable` (default, 8px) or `compact` (flush). */
  density?: RadioGroupDensity;
};

/**
 * Groups a set of `Radio` options so at most one can be selected at a time (none is selected until
 * a `value`/`defaultValue` is set). Wrap `Radio` children in it and drive the selection with
 * `value`/`defaultValue` + `onValueChange`. Renders a `<div>` with `role="radiogroup"`.
 *
 * @param density - Row spacing; `comfortable` (default) or `compact` (flush).
 */
export function RadioGroup({ density = "comfortable", ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={radioGroupVariants({ density })} {...props} />;
}

export type RadioProps = Omit<
  React.ComponentProps<typeof BaseRadio.Root>,
  "className" | "render" | "style"
>;

/**
 * A single radio option (Base UI `Radio.Root` + `Radio.Indicator`). The 16px ring and 8px inner dot
 * follow Figma node 2159-4535; the selected and disabled states come from the primitive. Use
 * `disabled` for a non-editable (read-only) option — see the module comment above for why
 * `readOnly` is avoided. Must be rendered inside a `RadioGroup`.
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
