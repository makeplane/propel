import { CheckboxGlyph, checkboxVariants, type CheckboxTone } from "./checkbox-styles";

export type CheckboxVisualProps = {
  /** Resting color of the box. `danger` is the Figma "Error" state. */
  tone: CheckboxTone;
  /** Whether the box shows as checked. */
  checked?: boolean;
  /** Whether the box shows the indeterminate dash (wins over `checked`). */
  indeterminate?: boolean;
  /** Whether the box shows as disabled. */
  disabled?: boolean;
};

/** A purely presentational copy of the `Checkbox` box for use inside another interactive control. */
export function CheckboxVisual({ tone, checked, indeterminate, disabled }: CheckboxVisualProps) {
  return (
    <span
      aria-hidden
      data-checked={checked && !indeterminate ? "" : undefined}
      data-indeterminate={indeterminate ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={checkboxVariants({ tone })}
    >
      {checked || indeterminate ? <CheckboxGlyph indeterminate={indeterminate} /> : null}
    </span>
  );
}
