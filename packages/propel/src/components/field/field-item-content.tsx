import type * as React from "react";

import { FieldItemContent as FieldItemContentElement } from "../../elements/field/field-item-content";
import { type InputMagnitude } from "../../elements/field/variants";
import { FieldDescription } from "./field-description";
import { FieldLabel } from "./field-label";

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
