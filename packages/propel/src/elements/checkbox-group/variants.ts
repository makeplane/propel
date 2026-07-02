import { cva, type VariantProps } from "class-variance-authority";

import { type StrictVariantProps } from "../../internal/variant-props";

export const checkboxGroupVariants = cva("flex flex-col", {
  variants: {
    density: {
      comfortable: "gap-2",
      compact: "gap-0",
    },
  },
});

export type CheckboxGroupDensity = NonNullable<
  VariantProps<typeof checkboxGroupVariants>["density"]
>;
export type CheckboxGroupVariantProps = StrictVariantProps<typeof checkboxGroupVariants>;
