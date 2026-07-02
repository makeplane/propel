import * as React from "react";

import type { AvatarMagnitude } from "../../elements/avatar";

/**
 * Set by the components `AvatarGroup` so every `Avatar` inside it shares one `magnitude` (an
 * avatar's own `magnitude` still wins). Lives in the components tier: a context is cross-tree
 * coordination — composition — not a single-element `elements` concern.
 */
export const AvatarGroupContext = React.createContext<AvatarMagnitude | undefined>(undefined);
