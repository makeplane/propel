import { Field as BaseField } from "@base-ui/react/field";
import { cva, cx } from "class-variance-authority";
import type * as React from "react";

const fieldItemVariants = cva(
  cx(
    "flex min-w-0 items-start gap-2 rounded-sm px-2 py-1 text-primary transition-colors",
    "data-disabled:cursor-not-allowed data-disabled:opacity-60",
    "not-data-disabled:hover:bg-layer-transparent-hover",
  ),
);

export type FieldItemProps = Omit<
  React.ComponentProps<typeof BaseField.Item>,
  "className" | "render" | "style"
>;

/** Groups one checkbox or radio option with its label and optional description. */
export function FieldItem(props: FieldItemProps) {
  return <BaseField.Item className={fieldItemVariants()} {...props} />;
}
