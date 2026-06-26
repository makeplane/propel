import type * as React from "react";

import { FieldDescription } from "./field-description";
import { FieldLabel } from "./field-label";
import { fieldItemContentVariants, type InputMagnitude } from "./variants";

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
    <div className={fieldItemContentVariants()}>
      <FieldLabel magnitude={magnitude} inset={false}>
        {children}
      </FieldLabel>
      {description != null ? (
        <FieldDescription magnitude={magnitude}>{description}</FieldDescription>
      ) : null}
    </div>
  );
}
