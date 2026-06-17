import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

export const checkboxGroupVariants = cva("flex flex-col", {
  variants: {
    density: {
      comfortable: "gap-2",
      compact: "gap-0",
    },
  },
});

type CheckboxGroupVariantProps = VariantProps<typeof checkboxGroupVariants>;

export type CheckboxGroupDensity = NonNullable<CheckboxGroupVariantProps["density"]>;

export type CheckboxGroupProps = Omit<
  React.ComponentProps<typeof BaseCheckboxGroup>,
  "className" | "render" | "style"
> & {
  /** Spacing between checkbox options. */
  density: CheckboxGroupDensity;
};

/** Groups related checkboxes and submits their selected values as an array. */
export function CheckboxGroup({ density, ...props }: CheckboxGroupProps) {
  return <BaseCheckboxGroup className={checkboxGroupVariants({ density })} {...props} />;
}
