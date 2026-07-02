import type * as React from "react";

import type { InputMagnitude } from "../../elements/field/variants";
import { FieldDescription } from "./field-description";
import { FieldError } from "./field-error";

/**
 * The error-or-hint line beneath a field: shows the `FieldError` when there is an error, otherwise
 * the `FieldDescription` hint. With no explicit `error`, the `FieldError` renders unmatched so Base
 * UI's own error channel stays open — validity messages and external `Form` `errors` for this field
 * display (and clear) automatically. A components-tier composition of the two elements parts;
 * shared by the ready-made field types so the error-XOR-hint rule lives in one place.
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
      {error != null ? (
        <FieldError magnitude={magnitude} match>
          {error}
        </FieldError>
      ) : (
        <FieldError magnitude={magnitude} />
      )}
      {error == null && hint != null ? (
        <FieldDescription magnitude={magnitude}>{hint}</FieldDescription>
      ) : null}
    </>
  );
}
