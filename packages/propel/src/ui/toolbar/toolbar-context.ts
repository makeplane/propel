import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { toolbarVariants } from "./variants";

export type ToolbarElevation = NonNullable<VariantProps<typeof toolbarVariants>["elevation"]>;
export type ToolbarDensity = NonNullable<VariantProps<typeof toolbarVariants>["density"]>;

export const ToolbarDensityContext = React.createContext<ToolbarDensity>("compact");
