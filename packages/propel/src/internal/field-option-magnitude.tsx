import * as React from "react";

import type { InputMagnitude } from "../elements/field/variants";

// Cascades the field magnitude from a group field (`CheckboxGroupField` / `RadioGroupField`) down to
// its option rows, so an option can omit `magnitude` and inherit the group's. React context is a
// composition concern — never `elements` (rule 7) — and this one is shared by both group fields, so it
// lives here in `internal` (alongside the other shared composition impl).
const FieldOptionMagnitudeContext = React.createContext<InputMagnitude | null>(null);

export function FieldOptionMagnitudeProvider({
  children,
  magnitude,
}: {
  children: React.ReactNode;
  magnitude: InputMagnitude;
}) {
  return (
    <FieldOptionMagnitudeContext.Provider value={magnitude}>
      {children}
    </FieldOptionMagnitudeContext.Provider>
  );
}

export function useFieldOptionMagnitude(magnitude?: InputMagnitude) {
  const resolvedMagnitude = magnitude ?? React.useContext(FieldOptionMagnitudeContext);

  if (resolvedMagnitude == null) {
    throw new Error("Field option components require a magnitude or a parent field composition.");
  }

  return resolvedMagnitude;
}
