import type * as React from "react";

import { FieldLabelGroup as FieldLabelGroupContainer } from "../../elements/field/field-label-group";
import {
  type FieldLabelGroupVariantProps,
  type InputMagnitude,
} from "../../elements/field/variants";
import { FieldDescription } from "./field-description";
import { FieldLabel } from "./field-label";

export type FieldLabelGroupProps = FieldLabelGroupVariantProps & {
  magnitude: InputMagnitude;
  required?: boolean;
  label?: string;
  description?: React.ReactNode;
};

/**
 * The ready-made label/description block of a field: lays out an optional `FieldLabel` and
 * `FieldDescription` inside the `FieldLabelGroup` container. Renders nothing when both are absent.
 */
export function FieldLabelGroup({
  magnitude,
  required,
  label,
  description,
  orientation,
}: FieldLabelGroupProps) {
  if (label == null && description == null) {
    return null;
  }
  const inset = orientation === "horizontal" && description == null;
  return (
    <FieldLabelGroupContainer orientation={orientation}>
      {label != null ? (
        <FieldLabel magnitude={magnitude} required={required} inset={inset}>
          {label}
        </FieldLabel>
      ) : null}
      {description != null ? (
        <FieldDescription magnitude={magnitude}>{description}</FieldDescription>
      ) : null}
    </FieldLabelGroupContainer>
  );
}
