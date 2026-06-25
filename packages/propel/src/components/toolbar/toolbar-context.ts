import * as React from "react";

import { type ToolbarDensity } from "../../ui/toolbar";

/**
 * Set by the components `Toolbar` so the controls inside share its `density`. Lives in the
 * components tier: a context is cross-tree coordination — composition — not a single-element `ui`
 * concern.
 */
export const ToolbarDensityContext = React.createContext<ToolbarDensity>("compact");
