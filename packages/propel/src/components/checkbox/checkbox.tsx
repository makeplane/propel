import { cx } from "class-variance-authority";
import * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import {
  Checkbox as CheckboxRoot,
  CheckboxGlyph,
  CheckboxIndicator,
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
 * and optionally wraps the row in a clickable `label` with an icon slot.
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
    <label
      // Figma "Checkbox with label" (node 1274:109) wraps the row in a clickable
      // chip: `px-2 py-1` (8px/4px) padding and a `rounded-sm` corner, with a
      // transparent-layer hover background (hover state 1276:15 →
      // `bg-layer-transparent-hover`). The standalone box owns its own styling.
      className={cx(
        "inline-flex items-center gap-2 rounded-sm px-2 py-1 text-13 text-secondary transition-colors",
        props.disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-layer-transparent-hover",
      )}
      htmlFor={checkboxId}
    >
      {box}
      {inlineStartNode ? (
        <NodeSlot aria-hidden className="text-icon-secondary [--node-size:0.875rem]">
          {inlineStartNode}
        </NodeSlot>
      ) : null}
      {label}
    </label>
  );
}
