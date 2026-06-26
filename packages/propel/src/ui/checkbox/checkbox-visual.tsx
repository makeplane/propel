import { CheckboxGlyph } from "./checkbox-glyph";
import { checkboxIndicatorVariants, checkboxVariants, type CheckboxVariantProps } from "./variants";

export type CheckboxVisualProps = {
  /** Whether the box shows as checked. */
  checked?: boolean;
  /** Whether the box shows the indeterminate dash (wins over `checked`). */
  indeterminate?: boolean;
  /** Whether the box shows as disabled. */
  disabled?: boolean;
} & CheckboxVariantProps;

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
      {checked || indeterminate ? (
        <span className={checkboxIndicatorVariants()}>
          <CheckboxGlyph indeterminate={indeterminate} />
        </span>
      ) : null}
    </span>
  );
}
