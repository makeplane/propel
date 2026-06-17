import { Field as BaseField } from "@base-ui/react/field";
import { cx } from "class-variance-authority";
import type * as React from "react";

import { labelVariants, type InputMagnitude } from "./input-styles";

export type FieldLabelProps = {
  children: React.ReactNode;
  magnitude: InputMagnitude;
  required?: boolean;
  inset?: boolean;
};

/** The label row: the label text and the required `*` asterisk in danger. */
export function FieldLabel({ children, magnitude, required, inset }: FieldLabelProps) {
  return (
    <BaseField.Label
      className={cx("inline-flex items-center gap-0.5", labelVariants({ magnitude, inset }))}
    >
      {children}
      {required ? (
        <span aria-hidden className="text-danger-primary">
          *
        </span>
      ) : null}
    </BaseField.Label>
  );
}
