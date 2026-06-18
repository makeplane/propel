import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { rootVariants } from "./variants";

// The Figma "Tabs" component defines two visual treatments. `contained` wraps
// the tabs in a pill and lifts the active tab onto a raised card; `underline`
// keeps the tabs flat and slides a dark bar under the active one.
export type TabsVariant = NonNullable<VariantProps<typeof rootVariants>["variant"]>;

export const TabsVariantContext = React.createContext<TabsVariant>("contained");
