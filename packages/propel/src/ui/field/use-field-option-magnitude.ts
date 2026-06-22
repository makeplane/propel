import * as React from "react";

import { FieldOptionMagnitudeContext } from "./field-option-magnitude-context";
import type { InputMagnitude } from "./variants";

export function useFieldOptionMagnitude(magnitude?: InputMagnitude) {
  const contextMagnitude = React.useContext(FieldOptionMagnitudeContext);
  const resolvedMagnitude = magnitude ?? contextMagnitude;

  if (resolvedMagnitude == null) {
    throw new Error("Field option components require a magnitude or a parent field composition.");
  }

  return resolvedMagnitude;
}
