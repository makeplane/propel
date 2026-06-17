import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cx } from "class-variance-authority";
import * as React from "react";

import { CheckboxGlyph } from "./checkbox-glyph";
import { checkboxVariants, type CheckboxTone } from "./checkbox-styles";

export type { CheckboxTone } from "./checkbox-styles";

export type CheckboxProps = Omit<
  React.ComponentProps<typeof BaseCheckbox.Root>,
  "className" | "render" | "style"
> & {
  /** Resting color of the box. `danger` is the Figma "Error" state. */
  tone: CheckboxTone;
  /**
   * Optional text shown beside the box; the whole row becomes the clickable label. Omit it for a
   * bare checkbox (just the box) — in that case give the box an accessible name with `aria-label`
   * or `aria-labelledby`.
   */
  label?: React.ReactNode;
  /**
   * Optional icon shown between the box and the label, matching the Figma "checkbox with label"
   * icon slot. Only rendered when `label` is present. Named `leadingIcon` (not `icon`) to match
   * Button/Input, so a `trailingIcon` can be added later without a breaking rename.
   */
  leadingIcon?: React.ReactNode;
};

export function Checkbox({ tone, label, leadingIcon, id, ...props }: CheckboxProps) {
  // Generate a stable id so an explicit `label` can be associated with the box.
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;

  const box = (
    <BaseCheckbox.Root
      id={checkboxId}
      // No `className`/`style` props (Omit'd above); the box owns its styling so
      // every checkbox in the system looks the same. Base UI renders a real
      // checkbox with `aria-checked` (including `mixed` for indeterminate).
      className={checkboxVariants({ tone })}
      {...props}
    >
      <BaseCheckbox.Indicator
        // Only mounted while checked / indeterminate (no `keepMounted`), so the
        // box is empty when unchecked. The dash wins for the mixed state;
        // otherwise a check. Decorative — the Root carries the a11y state.
        className="flex items-center justify-center"
      >
        <CheckboxGlyph indeterminate={props.indeterminate} />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
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
      {leadingIcon ? (
        <span className="flex size-3.5 shrink-0 items-center justify-center text-icon-secondary">
          {leadingIcon}
        </span>
      ) : null}
      {label}
    </label>
  );
}
