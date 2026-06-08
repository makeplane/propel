import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { Check, Minus } from "lucide-react";
import * as React from "react";

// The box follows the Figma "Checkbox" component: a single 16px square
// (`size-4`) with a 4px radius (`rounded-sm`) and a 1px border. There is only
// one size in Figma, so there is no `magnitude` axis.
const checkboxVariants = cva(
  cx(
    "inline-flex size-4 shrink-0 items-center justify-center rounded-sm border-sm",
    "outline-none transition-colors",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1",
    // Unchecked: just the border. Checked / indeterminate: a tone-specific fill
    // (see the `tone` variants) with a white icon. Base UI exposes these via
    // `data-*` state attributes. Only the shared border/text live here.
    "data-[checked]:border-transparent data-[checked]:text-icon-on-color",
    "data-[indeterminate]:border-transparent data-[indeterminate]:text-icon-on-color",
    // Disabled: muted border/fill and no pointer; overrides the checked fill.
    "data-[disabled]:cursor-not-allowed data-[disabled]:border-disabled data-[disabled]:bg-transparent",
    "data-[disabled]:data-[checked]:border-transparent data-[disabled]:data-[checked]:bg-layer-disabled data-[disabled]:data-[checked]:text-icon-disabled",
    "data-[disabled]:data-[indeterminate]:border-transparent data-[disabled]:data-[indeterminate]:bg-layer-disabled data-[disabled]:data-[indeterminate]:text-icon-disabled",
  ),
  {
    variants: {
      tone: {
        // Neutral: resting border while unchecked; accent fill once checked.
        neutral:
          "border-strong data-[checked]:bg-accent-primary data-[indeterminate]:bg-accent-primary",
        // The Figma "Error" state: a danger border while unchecked; danger fill
        // once checked.
        danger:
          "border-danger-strong data-[checked]:bg-danger-primary data-[indeterminate]:bg-danger-primary",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;

export type CheckboxTone = NonNullable<CheckboxVariantProps["tone"]>;

export type CheckboxProps = Omit<
  React.ComponentProps<typeof BaseCheckbox.Root>,
  "className" | "render" | "style"
> & {
  /** Resting color of the box. `danger` is the Figma "Error" state. */
  tone?: CheckboxTone;
  /** Optional text shown beside the box; the whole row becomes the label. */
  label?: React.ReactNode;
};

export function Checkbox({ tone, label, id, ...props }: CheckboxProps) {
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
        // Kept mounted in every state (`keepMounted`) so the check/dash can
        // transition in and out. The dash wins for the mixed state; otherwise a
        // check. Decorative — the Root carries the a11y state.
        className="flex items-center justify-center"
        keepMounted
      >
        {props.indeterminate ? (
          <Minus aria-hidden className="size-3" />
        ) : (
          <Check aria-hidden className="size-3" />
        )}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );

  if (label == null) return box;

  return (
    <label
      className={cx(
        "inline-flex items-center gap-2 text-13 text-secondary",
        props.disabled ? "cursor-not-allowed" : "cursor-pointer",
      )}
      htmlFor={checkboxId}
    >
      {box}
      {label}
    </label>
  );
}
