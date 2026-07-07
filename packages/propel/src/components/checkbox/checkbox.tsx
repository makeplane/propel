import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Check, Minus } from "lucide-react";
import * as React from "react";

import {
  Checkbox as CheckboxElement,
  CheckboxIndeterminateIndicator,
  CheckboxIndicator,
  CheckboxLabel,
  type CheckboxLabelSizing,
} from "../../elements/checkbox";

export type CheckboxProps = Omit<BaseCheckbox.Root.Props, "className" | "style" | "render"> & {
  /**
   * Optional text shown beside the box; the whole row becomes the clickable label. Omit it for a
   * bare checkbox (just the box) — in that case give the box an accessible name with `aria-label`
   * or `aria-labelledby`.
   */
  label?: string;
  /** Width of the clickable label row when `label` is present. */
  sizing?: CheckboxLabelSizing;
  /**
   * Element shown between the box and the label (inline-start), e.g. `<Icon icon={User}
   * tint="secondary" magnitude="sm" />`. Only rendered when `label` is present.
   */
  icon?: React.ReactNode;
};

/**
 * The ready-made checkbox: grafts Base UI checkbox behavior onto the styled `Checkbox` box with its
 * check and indeterminate indicators, and optionally wraps the row in a clickable `CheckboxLabel`
 * with an icon slot.
 */
export function Checkbox({ label, sizing, icon, id, ...props }: CheckboxProps) {
  // Generate a stable id so an explicit `label` can be associated with the box.
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;

  // Only force the generated id when there's a `label` to associate; without one (e.g. inside a
  // `Field`, which manages labeling), pass the caller's `id` through untouched.
  const box = (
    <BaseCheckbox.Root id={label != null ? checkboxId : id} render={<CheckboxElement />} {...props}>
      <BaseCheckbox.Indicator render={<CheckboxIndicator />}>
        <Check aria-hidden />
      </BaseCheckbox.Indicator>
      <BaseCheckbox.Indicator render={<CheckboxIndeterminateIndicator />}>
        <Minus aria-hidden />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );

  if (label == null) return box;

  return (
    <CheckboxLabel htmlFor={checkboxId} sizing={sizing}>
      {box}
      {icon}
      {label}
    </CheckboxLabel>
  );
}
