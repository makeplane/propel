import * as React from "react";

import { type TabsVariant } from "../../ui/tabs";

/**
 * Set by the components `Tabs` so the `TabsList`/`Tab`s inside share the set's `variant`. Lives in
 * the components tier: a context is cross-tree coordination — composition — not a single-element
 * `ui` concern.
 */
export const TabsVariantContext = React.createContext<TabsVariant>("contained");
