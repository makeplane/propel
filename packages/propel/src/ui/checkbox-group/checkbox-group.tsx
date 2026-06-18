import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import { checkboxGroupVariants } from "./variants";

type CheckboxGroupVariantProps = VariantProps<typeof checkboxGroupVariants>;

export type CheckboxGroupDensity = NonNullable<CheckboxGroupVariantProps["density"]>;

export type CheckboxGroupProps = Omit<
  React.ComponentProps<typeof BaseCheckboxGroup>,
  "className" | "style"
> & {
  /** Spacing between checkbox options. */
  density: CheckboxGroupDensity;
};

/** Groups related checkboxes and submits their selected values as an array. */
export function CheckboxGroup({ density, ...props }: CheckboxGroupProps) {
  return <BaseCheckboxGroup className={checkboxGroupVariants({ density })} {...props} />;
}
