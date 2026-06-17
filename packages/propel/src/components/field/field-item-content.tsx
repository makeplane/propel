import type * as React from "react";

import { FieldDescription } from "./field-description";
import { FieldLabel } from "./field-label";
import type { InputMagnitude } from "./field-styles";

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
    <div className="flex min-w-0 flex-col gap-1">
      <FieldLabel magnitude={magnitude}>{children}</FieldLabel>
      {description != null ? (
        <FieldDescription magnitude={magnitude}>{description}</FieldDescription>
      ) : null}
    </div>
  );
}
