import { Select as BaseSelect } from "@base-ui/react/select";
import type * as React from "react";

import { selectItemVariants } from "./select-styles";

export type SelectItemProps = Omit<
  React.ComponentProps<typeof BaseSelect.Item>,
  "className" | "render" | "style"
>;

export function SelectItem(props: SelectItemProps) {
  return <BaseSelect.Item className={selectItemVariants()} {...props} />;
}
