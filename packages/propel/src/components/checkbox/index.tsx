import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { Check, Minus } from "lucide-react";
import * as React from "react";

// The box follows the Figma "Checkbox" component: a single 16px square
// (`size-4`) with a 4px radius (`rounded-sm`) and a 1px border. There is only
// one size in Figma, so there is no `magnitude` axis.
const checkboxVariants = cva(
  cx(
    // `align-top` keeps the inline-level box anchored to the top of its line box
    // so it does NOT move vertically when the check/dash indicator mounts. An
    // empty `inline-flex` element and one with a flex child baseline-align to the
    // surrounding text differently; pinning the alignment makes the box geometry
    // identical across unchecked / checked / indeterminate (no shift).
    "inline-flex size-4 shrink-0 items-center justify-center rounded-sm border-sm align-top",
    "outline-none transition-colors",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1",
    // Unchecked: just the tone-specific border (see the `tone` variants).
    // Checked / indeterminate: the accent-primary fill is identical for every
    // tone, so it lives here in the base rather than the tone variants. This
    // keeps a tone-less `CheckboxVisual` from rendering a white check on no fill.
    // A white icon sits on top. Base UI exposes these via `data-*` attributes.
    "data-[checked]:border-transparent data-[checked]:bg-accent-primary data-[checked]:text-icon-on-color",
    "data-[indeterminate]:border-transparent data-[indeterminate]:bg-accent-primary data-[indeterminate]:text-icon-on-color",
    // Disabled: muted border/fill and no pointer; overrides the checked fill.
    "data-[disabled]:cursor-not-allowed data-[disabled]:border-disabled data-[disabled]:bg-transparent",
    "data-[disabled]:data-[checked]:border-transparent data-[disabled]:data-[checked]:bg-layer-disabled data-[disabled]:data-[checked]:text-icon-disabled",
    "data-[disabled]:data-[indeterminate]:border-transparent data-[disabled]:data-[indeterminate]:bg-layer-disabled data-[disabled]:data-[indeterminate]:text-icon-disabled",
  ),
  {
    variants: {
      tone: {
        // Neutral: resting `icon-tertiary` border while unchecked. The checked
        // fill is the shared accent-primary defined in the base above.
        neutral: "border-icon-tertiary",
        // The Figma "Error" state: only the *unchecked* border turns danger/red.
        // Once checked the fill is the same accent blue as every other tone (the
        // base `data-[checked]`/`data-[indeterminate]` rules above).
        danger: "border-danger-strong",
      },
    },
  },
);

type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;

export type CheckboxTone = NonNullable<CheckboxVariantProps["tone"]>;

// The check / dash glyph for the box, shared by the interactive Checkbox and the
// presentational CheckboxVisual.
function CheckboxGlyph({ indeterminate }: { indeterminate?: boolean }) {
  return indeterminate ? (
    <Minus aria-hidden className="size-3" />
  ) : (
    <Check aria-hidden className="size-3" />
  );
}

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

/**
 * A purely presentational copy of the `Checkbox` box — same tokens and states, but a
 * non-interactive `<span>` with no `role`/focus. Use it when a checkbox *appearance*
 * is needed inside another interactive control (e.g. a menu `menuitemcheckbox` row),
 * where nesting a real checkbox would be an ARIA `nested-interactive` violation. The
 * parent control owns the state and the a11y semantics.
 */
export function CheckboxVisual({ tone, checked, indeterminate, disabled }: CheckboxVisualProps) {
  return (
    <span
      aria-hidden
      // Mirror Base UI's data attributes so `checkboxVariants` styles the box the same
      // way it does the interactive Checkbox.
      data-checked={checked && !indeterminate ? "" : undefined}
      data-indeterminate={indeterminate ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={checkboxVariants({ tone })}
    >
      {checked || indeterminate ? <CheckboxGlyph indeterminate={indeterminate} /> : null}
    </span>
  );
}

export type CheckboxProps = Omit<
  React.ComponentProps<typeof BaseCheckbox.Root>,
  "className" | "render" | "style"
> & {
  /** Resting color of the box. `danger` is the Figma "Error" state. */
  tone: CheckboxTone;
  /**
   * Optional text shown beside the box; the whole row becomes the clickable
   * label. Omit it for a bare checkbox (just the box) — in that case give the
   * box an accessible name with `aria-label` or `aria-labelledby`.
   */
  label?: React.ReactNode;
  /**
   * Optional leading icon shown between the box and the label, matching the Figma
   * "checkbox with label" icon slot. Only rendered when `label` is present.
   */
  icon?: React.ReactNode;
};

export function Checkbox({ tone, label, icon, id, ...props }: CheckboxProps) {
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
      {icon ? (
        <span className="flex size-3.5 shrink-0 items-center justify-center text-icon-secondary">
          {icon}
        </span>
      ) : null}
      {label}
    </label>
  );
}
