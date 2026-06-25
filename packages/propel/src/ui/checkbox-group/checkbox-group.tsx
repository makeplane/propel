import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";

import { type CheckboxGroupVariantProps, checkboxGroupVariants } from "./variants";

export type { CheckboxGroupDensity, CheckboxGroupVariantProps } from "./variants";

export type CheckboxGroupProps = Omit<BaseCheckboxGroup.Props, "className" | "style"> &
  CheckboxGroupVariantProps;

/** Groups related checkboxes and submits their selected values as an array. */
export function CheckboxGroup({ density, ...props }: CheckboxGroupProps) {
  return <BaseCheckboxGroup className={checkboxGroupVariants({ density })} {...props} />;
}
