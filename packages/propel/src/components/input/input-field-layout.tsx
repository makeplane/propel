import { Field as BaseField } from "@base-ui/react/field";
import { cva, cx, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { FieldLabel } from "./field-label";
import { helperVariants, type InputMagnitude, type InputTone } from "./input-styles";

export type SharedFieldProps = {
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
};

const labelGroupVariants = cva("flex flex-col gap-1", {
  variants: {
    orientation: {
      vertical: "w-full",
      horizontal: "min-w-0 flex-1",
    },
  },
});

export function FieldLabelGroup({
  magnitude,
  required,
  label,
  description,
  orientation,
}: {
  magnitude: InputMagnitude;
  required?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  orientation: NonNullable<VariantProps<typeof labelGroupVariants>["orientation"]>;
}) {
  if (label == null && description == null) {
    return null;
  }

  const inset = orientation === "horizontal" && description == null;
  return (
    <div className={labelGroupVariants({ orientation })}>
      {label != null ? (
        <FieldLabel magnitude={magnitude} required={required} inset={inset}>
          {label}
        </FieldLabel>
      ) : null}
      {description != null ? (
        <BaseField.Description className={cx("text-tertiary", helperVariants({ magnitude }))}>
          {description}
        </BaseField.Description>
      ) : null}
    </div>
  );
}

export function FieldHelperText({
  magnitude,
  hint,
  error,
}: {
  magnitude: InputMagnitude;
  hint?: React.ReactNode;
  error?: React.ReactNode;
}) {
  if (error != null) {
    return (
      <BaseField.Error match className={cx("text-danger-primary", helperVariants({ magnitude }))}>
        {error}
      </BaseField.Error>
    );
  }
  if (hint != null) {
    return (
      <BaseField.Description className={cx("text-tertiary", helperVariants({ magnitude }))}>
        {hint}
      </BaseField.Description>
    );
  }
  return null;
}
