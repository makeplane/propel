import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { cva } from "class-variance-authority";
import type * as React from "react";

const fieldsetVariants = cva("flex min-w-0 flex-col gap-3");

export type FieldsetProps = Omit<
  React.ComponentProps<typeof BaseFieldset.Root>,
  "className" | "style"
>;

/** Groups a legend with related controls. */
export function Fieldset(props: FieldsetProps) {
  return <BaseFieldset.Root className={fieldsetVariants()} {...props} />;
}
