import { Check, Minus } from "lucide-react";
import * as React from "react";

import {
  Checkbox as CheckboxElement,
  CheckboxIndeterminateIndicator,
  CheckboxIndicator,
  CheckboxInlineStartNode,
  CheckboxLabel,
  type CheckboxProps as CheckboxElementProps,
} from "../../ui/checkbox";

export type CheckboxProps = CheckboxElementProps & {
  /**
   * Optional text shown beside the box; the whole row becomes the clickable label. Omit it for a
   * bare checkbox (just the box) — in that case give the box an accessible name with `aria-label`
   * or `aria-labelledby`.
   */
  label?: React.ReactNode;
  /**
   * Node shown between the box and the label (inline-start), matching the Figma "checkbox with
   * label" icon slot. Only rendered when `label` is present. Sized to `--node-size` (14px).
   * Decorative, kept out of the name.
   */
  inlineStartNode?: React.ReactNode;
};

/**
 * The ready-made checkbox: composes the atomic `Checkbox` box with its check and indeterminate
 * indicators, and optionally wraps the row in a clickable `CheckboxLabel` with an icon slot.
 */
export function Checkbox({ label, inlineStartNode, id, ...props }: CheckboxProps) {
  // Generate a stable id so an explicit `label` can be associated with the box.
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;

  // Only force the generated id when there's a `label` to associate; without one (e.g. inside a
  // `Field`, which manages labeling), pass the caller's `id` through untouched.
  const box = (
    <CheckboxElement id={label != null ? checkboxId : id} {...props}>
      <CheckboxIndicator>
        <Check aria-hidden />
      </CheckboxIndicator>
      <CheckboxIndeterminateIndicator>
        <Minus aria-hidden />
      </CheckboxIndeterminateIndicator>
    </CheckboxElement>
  );

  if (label == null) return box;

  return (
    <CheckboxLabel htmlFor={checkboxId}>
      {box}
      {inlineStartNode ? (
        <CheckboxInlineStartNode>{inlineStartNode}</CheckboxInlineStartNode>
      ) : null}
      {label}
    </CheckboxLabel>
  );
}
