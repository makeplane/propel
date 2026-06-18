import type * as React from "react";

import { FieldDescription } from "./field-description";
import { FieldError } from "./field-error";
import type { InputMagnitude } from "./variants";

export function FieldHelperText({
  magnitude,
  hint,
  error,
}: {
  magnitude: InputMagnitude;
  hint?: React.ReactNode;
  error?: React.ReactNode;
}) {
  return (
    <>
      <FieldError magnitude={magnitude} match={error != null}>
        {error}
      </FieldError>
      {error == null && hint != null ? (
        <FieldDescription magnitude={magnitude}>{hint}</FieldDescription>
      ) : null}
    </>
  );
}
