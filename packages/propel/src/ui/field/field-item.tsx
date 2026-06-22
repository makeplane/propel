import { Field as BaseField } from "@base-ui/react/field";

import { fieldItemVariants } from "./variants";

export type FieldItemProps = Omit<BaseField.Item.Props, "className" | "style">;

/** Groups one checkbox or radio option with its label and optional description. */
export function FieldItem(props: FieldItemProps) {
  return <BaseField.Item className={fieldItemVariants()} {...props} />;
}
