import type * as React from "react";

import { FieldDescription } from "../../ui/field/field-description";
import { FieldItemContent as FieldItemContentElement } from "../../ui/field/field-item-content";
import { FieldLabel } from "../../ui/field/field-label";
import { type InputMagnitude } from "../../ui/field/variants";

/** The label + description column for a single choice option (checkbox/radio/switch row). */
export function FieldItemContent({
  children,
  description,
  magnitude,
}: {
  children: React.ReactNode;
  description?: React.ReactNode;
  magnitude: InputMagnitude;
}) {
  return (
    <FieldItemContentElement>
      <FieldLabel magnitude={magnitude} inset={false}>
        {children}
      </FieldLabel>
      {description != null ? (
        <FieldDescription magnitude={magnitude}>{description}</FieldDescription>
      ) : null}
    </FieldItemContentElement>
  );
}
