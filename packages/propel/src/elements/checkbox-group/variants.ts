import { type VariantProps } from "class-variance-authority";

import { optionGroupVariants } from "../../internal/option-group";
import { type StrictVariantProps } from "../../internal/variant-props";

export const checkboxGroupVariants = optionGroupVariants;

export type CheckboxGroupDensity = NonNullable<
  VariantProps<typeof checkboxGroupVariants>["density"]
>;
export type CheckboxGroupVariantProps = StrictVariantProps<typeof checkboxGroupVariants>;
