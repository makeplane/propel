import { Field as BaseField } from "@base-ui/react/field";
import type * as React from "react";

import type { InputProps } from "../input/index";
import { FieldHelperText } from "./field-helper-text";
import { FieldLabelGroup } from "./field-label-group";
import {
  iconSlotClass,
  type InputMagnitude,
  type InputTone,
  inputFieldBoxVariants,
  inputFieldContentVariants,
  inputFieldRootVariants,
} from "./field-styles";
import { InputFieldControl } from "./input-field-control";

export type { InputMagnitude, InputTone } from "./field-styles";

export type InputFieldProps = Omit<InputProps, "magnitude"> & {
  /** Magnitude scale. `md` | `lg` | `xl`. */
  magnitude: InputMagnitude;
  /** Resting treatment. `neutral` | `danger` (the Figma "error" state). */
  tone: InputTone;
  /** Label text shown above (or beside) the control. */
  label?: React.ReactNode;
  /** Marks the field required: adds a `*` asterisk and sets `required`. */
  required?: boolean;
  /** Supporting text shown directly below the label. */
  description?: React.ReactNode;
  /** Helper text shown below the control. Replaced by `error` when an error is set. */
  hint?: React.ReactNode;
  /** Error text shown below the control. Overrides `hint`; pair with `tone="danger"`. */
  error?: React.ReactNode;
  /** Label placement: `vertical` (label above) | `horizontal` (label beside). */
  orientation: "vertical" | "horizontal";
  /** A 16px node rendered at the inline start of the control. */
  inlineStartNode?: React.ReactNode;
  /** A 16px node rendered at the inline end of the control. */
  inlineEndNode?: React.ReactNode;
};

/**
 * Single-line text field built on Base UI `Field`. Supports inline start/end slots and a
 * `horizontal` orientation where the label sits beside the control.
 */
export function InputField({
  magnitude,
  tone,
  orientation,
  name,
  label,
  required,
  description,
  hint,
  error,
  inlineStartNode,
  inlineEndNode,
  disabled,
  ...controlProps
}: InputFieldProps) {
  return (
    <BaseField.Root
      name={name}
      disabled={disabled}
      invalid={tone === "danger" || undefined}
      className={inputFieldRootVariants({ orientation })}
    >
      <FieldLabelGroup
        magnitude={magnitude}
        required={required}
        label={label}
        description={description}
        orientation={orientation}
      />
      <div className={inputFieldContentVariants({ orientation })}>
        <div className={inputFieldBoxVariants({ magnitude, tone })}>
          {inlineStartNode ? (
            <span aria-hidden className={iconSlotClass}>
              {inlineStartNode}
            </span>
          ) : null}
          <InputFieldControl required={required} magnitude={magnitude} {...controlProps} />
          {inlineEndNode ? (
            <span aria-hidden className={iconSlotClass}>
              {inlineEndNode}
            </span>
          ) : null}
        </div>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </div>
    </BaseField.Root>
  );
}
