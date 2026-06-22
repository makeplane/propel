import * as React from "react";

import type { ToggleMagnitude } from "./variants";

/**
 * Set by `ToggleGroup` so every `Toggle` inside it shares one `magnitude`, keeping a group
 * consistently sized. A `Toggle`'s own `magnitude` prop takes precedence. Lives with `Toggle`
 * because `Toggle` is the consumer; `ToggleGroup` provides it.
 */
export const ToggleGroupContext = React.createContext<ToggleMagnitude | undefined>(undefined);
