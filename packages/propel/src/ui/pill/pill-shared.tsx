import { type VariantProps } from "class-variance-authority";

import { labelPillSize } from "./variants";

export { labelPillSize, pillBase } from "./variants";

export type PillMagnitude = NonNullable<VariantProps<typeof labelPillSize>["magnitude"]>;

export const labelFontByMagnitude: Record<PillMagnitude, string> = {
  sm: "text-12",
  md: "text-13",
  lg: "text-body-sm-regular",
};
