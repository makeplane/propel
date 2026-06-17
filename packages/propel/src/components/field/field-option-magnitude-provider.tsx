import type * as React from "react";

import { FieldOptionMagnitudeContext } from "./field-option-magnitude-context";
import type { InputMagnitude } from "./field-styles";

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
