import { Field as BaseField } from "@base-ui/react/field";
import { cx } from "class-variance-authority";
import type * as React from "react";

import { FieldHelperText, FieldLabelGroup, type SharedFieldProps } from "./input-field-layout";
import { boxVariants, controlTextVariants, iconSlotClass } from "./input-styles";

export type { InputMagnitude, InputTone } from "./input-styles";

export type InputProps = Omit<
  React.ComponentProps<typeof BaseField.Control>,
  "className" | "render" | "style"
> &
  SharedFieldProps & {
    /** Label placement: `vertical` (label above) | `horizontal` (label beside). */
    orientation: "vertical" | "horizontal";
    /** A 16px lucide icon rendered before the control. */
    leadingIcon?: React.ReactNode;
    /** A 16px lucide icon rendered after the control. */
    trailingIcon?: React.ReactNode;
  };

/**
 * Single-line text field built on Base UI `Field`. Supports leading/trailing icon slots and a
 * `horizontal` orientation where the label sits beside the control.
 */
export function Input({
  magnitude,
  tone,
  orientation,
  name,
  label,
  required,
  description,
  hint,
  error,
  leadingIcon,
  trailingIcon,
  disabled,
  ...controlProps
}: InputProps) {
  const horizontal = orientation === "horizontal";
  return (
    <BaseField.Root
      name={name}
      disabled={disabled}
      invalid={tone === "danger" || undefined}
      className={cx("flex gap-2", horizontal ? "flex-row items-start" : "flex-col items-start")}
    >
      <FieldLabelGroup
        magnitude={magnitude}
        required={required}
        label={label}
        description={description}
        orientation={orientation}
      />
      <div className={cx("flex flex-col", horizontal ? "min-w-0 flex-1 gap-2" : "w-full gap-1.5")}>
        <div
          className={cx(
            boxVariants({ tone }),
            "rounded-md px-3",
            magnitude === "md" ? "py-1.5" : magnitude === "lg" ? "py-2" : "py-3",
          )}
        >
          {leadingIcon ? (
            <span aria-hidden className={iconSlotClass}>
              {leadingIcon}
            </span>
          ) : null}
          <BaseField.Control
            required={required}
            className={cx(
              "min-w-0 flex-1 bg-transparent text-primary outline-none",
              "placeholder:text-placeholder",
              "disabled:cursor-not-allowed disabled:text-disabled",
              controlTextVariants({ magnitude }),
            )}
            {...controlProps}
          />
          {trailingIcon ? (
            <span aria-hidden className={iconSlotClass}>
              {trailingIcon}
            </span>
          ) : null}
        </div>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </div>
    </BaseField.Root>
  );
}
