import { Field as BaseField } from "@base-ui/react/field";
import type * as React from "react";

import { fieldLabelVariants, type InputMagnitude } from "./variants";

export type FieldLabelProps = {
  children: React.ReactNode;
  magnitude: InputMagnitude;
  required?: boolean;
  inset?: boolean;
};

/** The label row: the label text and the required `*` asterisk in danger. */
export function FieldLabel({ children, magnitude, required, inset }: FieldLabelProps) {
  return (
    <BaseField.Label className={fieldLabelVariants({ magnitude, inset })}>
      {children}
      {required ? (
        <span aria-hidden className="text-danger-primary">
          *
        </span>
      ) : null}
    </BaseField.Label>
  );
}
