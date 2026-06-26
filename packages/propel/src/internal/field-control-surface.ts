import { cva, type VariantProps } from "class-variance-authority";

/**
 * The shared bordered field-control surface (Figma's input "box"): a `layer-2` fill with a
 * `border-sm` that rests `subtle` and lights to `accent-strong` + a soft ring on focus. Before this
 * it was re-spelled in every bordered control — `InputFieldBox`, `TextAreaFieldBox`,
 * `SelectTrigger`, `ComboboxInputGroup`, `AutocompleteInputGroup`, `NumberFieldGroup`,
 * `OTPFieldInput` — so it lives here once. Each control composes this and adds only its own
 * geometry (radius, padding, min-width, magnitude) and interaction deltas (hover, transition, the
 * disabled selector).
 *
 * - `tone` — the resting border: `neutral` (subtle) or `danger` (strong). Structural `border-sm` +
 *   `bg-layer-2` are always on, so a `danger` surface keeps the box, only recoloring the border.
 * - `focus` — which pseudo the accent border+ring keys off: `within` for a box wrapping a separate
 *   focusable control (input/textarea/combobox/autocomplete/number), `visible` for a control that
 *   is itself focusable (the select trigger), `self` for a bare focusable cell (the otp digit), or
 *   `none` to suppress the accent ring entirely (the input/textarea `danger` state stays danger on
 *   focus; otp `danger` pairs `none` here with its own danger-colored ring).
 */
export const fieldControlSurfaceVariants = cva("border-sm bg-layer-2", {
  variants: {
    tone: {
      neutral: "border-subtle",
      danger: "border-danger-strong",
    },
    focus: {
      within:
        "focus-within:border-accent-strong focus-within:ring-2 focus-within:ring-accent-strong/20",
      visible:
        "focus-visible:border-accent-strong focus-visible:ring-2 focus-visible:ring-accent-strong/20",
      self: "focus:border-accent-strong focus:ring-2 focus:ring-accent-strong/20",
      none: "",
    },
  },
});

export type FieldControlSurfaceVariantProps = VariantProps<typeof fieldControlSurfaceVariants>;

/** The resting-border tone shared by every bordered field control. */
export type FieldControlTone = NonNullable<FieldControlSurfaceVariantProps["tone"]>;
