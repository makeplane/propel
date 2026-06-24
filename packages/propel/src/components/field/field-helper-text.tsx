import type * as React from "react";

import { FieldDescription } from "../../ui/field/field-description";
import { FieldError } from "../../ui/field/field-error";
import type { InputMagnitude } from "../../ui/field/variants";

/**
 * The error-or-hint line beneath a field: shows the `FieldError` when there is an error, otherwise
 * the `FieldDescription` hint. A components-tier composition of the two ui parts (each a single
 * element); shared by the ready-made field types so the error-XOR-hint rule lives in one place.
 */
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
