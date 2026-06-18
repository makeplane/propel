import { Field as BaseField } from "@base-ui/react/field";
import type * as React from "react";

import { fieldItemVariants } from "./variants";

export type FieldItemProps = Omit<
  React.ComponentProps<typeof BaseField.Item>,
  "className" | "style"
>;

/** Groups one checkbox or radio option with its label and optional description. */
export function FieldItem(props: FieldItemProps) {
  return <BaseField.Item className={fieldItemVariants()} {...props} />;
}
