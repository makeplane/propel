import * as React from "react";

import { type ButtonGroupButtonMagnitude } from "../../elements/button-group";

/**
 * Set by the components `ButtonGroup` so every `ButtonGroupButton` inside it shares one
 * `magnitude`. Lives in the components tier: a context is cross-tree coordination — composition —
 * not a single-element `elements` concern.
 */
export const ButtonGroupContext = React.createContext<ButtonGroupButtonMagnitude | undefined>(
  undefined,
);
