import { Field as BaseField } from "@base-ui/react/field";
import type * as React from "react";

import { FieldLabelRequiredMarker } from "./field-label-required-marker";
import { fieldLabelVariants, type InputMagnitude } from "./variants";

export type FieldLabelProps = {
  children: React.ReactNode;
  magnitude: InputMagnitude;
  required?: boolean;
  inset?: boolean;
};

/** The label row: the label text, plus a `FieldLabelRequiredMarker` when `required`. */
export function FieldLabel({ children, magnitude, required, inset }: FieldLabelProps) {
  return (
    <BaseField.Label className={fieldLabelVariants({ magnitude, inset })}>
      {children}
      {required ? <FieldLabelRequiredMarker /> : null}
    </BaseField.Label>
  );
}
