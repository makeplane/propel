import { cva, cx, type VariantProps } from "class-variance-authority";

/**
 * The shared bordered field-control surface (Figma's input "box"): a `layer-2` fill with a
 * `border-sm` that rests `subtle` and lights to `accent-strong` + a soft ring on focus. Before this
 * it was re-spelled in every bordered control — `InputFieldBox`, `TextAreaFieldBox`,
 * `SelectTrigger`, `ComboboxInputGroup`, `AutocompleteInputGroup`, `NumberFieldGroup`,
 * `OTPFieldInput` — so it lives here once. Each control composes this and adds only its own
 * geometry (radius, padding, min-width, magnitude) and interaction deltas (hover, transition, the
 * disabled selector).
 *
 * The error look isn't a prop: the surface rests at the `subtle` border and recolors to `danger`
 * off Base UI's validity state — `data-invalid` when the surface IS the focusable control (select
 * trigger, otp digit) or `:has([data-invalid])` when it WRAPS one (input/textarea/combobox/
 * autocomplete/number). `Field.Root` propagates `data-invalid` to its control, so danger follows
 * field validity with no prop to thread.
 *
 * - `focus` — which pseudo the accent border+ring keys off: `within` for a box wrapping a separate
 *   focusable control (input/textarea/combobox/autocomplete/number), `visible` for a control that
 *   is itself focusable (the select trigger), `self` for a bare focusable cell (the otp digit), or
 *   `none`. Danger wins on focus: an invalid surface keeps its danger border and shows a danger
 *   ring instead of the accent one.
 */
export const fieldControlSurfaceVariants = cva(
  cx(
    "border-sm border-subtle bg-layer-2",
    "has-[[data-invalid]]:border-danger-strong data-invalid:border-danger-strong",
  ),
  {
    variants: {
      focus: {
        within: cx(
          "focus-within:border-accent-strong focus-within:ring-2 focus-within:ring-accent-strong/20",
          "has-[[data-invalid]]:focus-within:border-danger-strong has-[[data-invalid]]:focus-within:ring-danger-strong/20",
        ),
        visible: cx(
          "focus-visible:border-accent-strong focus-visible:ring-2 focus-visible:ring-accent-strong/20",
          "data-invalid:focus-visible:border-danger-strong data-invalid:focus-visible:ring-danger-strong/20",
        ),
        self: cx(
          "focus:border-accent-strong focus:ring-2 focus:ring-accent-strong/20",
          "data-invalid:focus:border-danger-strong data-invalid:focus:ring-danger-strong/20",
        ),
        none: "",
      },
    },
  },
);

export type FieldControlSurfaceVariantProps = VariantProps<typeof fieldControlSurfaceVariants>;
