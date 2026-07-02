import * as React from "react";

import { type TabsAppearance } from "../../elements/tabs";

/**
 * Set by the components `Tabs` so the `TabsList`/`Tab`s inside share the set's `appearance`. Lives
 * in the components tier: a context is cross-tree coordination — composition — not a single-element
 * `elements` concern.
 */
export const TabsAppearanceContext = React.createContext<TabsAppearance>("contained");
