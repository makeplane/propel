import * as React from "react";

import { type ToggleMagnitude } from "../../elements/toggle";

/**
 * Set by the components `ToggleGroup` so every `Toggle` inside it shares one `magnitude`. Lives in
 * the components tier: a context is cross-tree coordination — composition — not a single-element
 * `elements` concern.
 */
export const ToggleGroupContext = React.createContext<ToggleMagnitude | undefined>(undefined);
