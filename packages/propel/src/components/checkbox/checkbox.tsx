import * as React from "react";

import {
  Checkbox as CheckboxRoot,
  CheckboxGlyph,
  CheckboxIndicator,
  CheckboxInlineStartNode,
  CheckboxLabel,
  type CheckboxProps as CheckboxRootProps,
} from "../../ui/checkbox";

export type { CheckboxTone } from "../../ui/checkbox";

export type CheckboxProps = CheckboxRootProps & {
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
 * The ready-made checkbox: composes the atomic `Checkbox` box with its `CheckboxIndicator`/glyph,
 * and optionally wraps the row in a clickable `CheckboxLabel` with an icon slot.
 */
export function Checkbox({ tone, label, inlineStartNode, id, ...props }: CheckboxProps) {
  // Generate a stable id so an explicit `label` can be associated with the box.
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;

  const box = (
    <CheckboxRoot id={checkboxId} tone={tone} {...props}>
      <CheckboxIndicator>
        <CheckboxGlyph indeterminate={props.indeterminate} />
      </CheckboxIndicator>
    </CheckboxRoot>
  );

  if (label == null) return box;

  return (
    <CheckboxLabel disabled={props.disabled ?? false} htmlFor={checkboxId}>
      {box}
      {inlineStartNode ? (
        <CheckboxInlineStartNode>{inlineStartNode}</CheckboxInlineStartNode>
      ) : null}
      {label}
    </CheckboxLabel>
  );
}
