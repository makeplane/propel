import { Select as BaseSelect } from "@base-ui/react/select";
import { ChevronsUpDown } from "lucide-react";
import type * as React from "react";

import { selectIconVariants } from "./select-styles";

export type SelectIconProps = Omit<
  React.ComponentProps<typeof BaseSelect.Icon>,
  "className" | "render" | "style"
>;

export function SelectIcon(props: SelectIconProps) {
  return (
    <BaseSelect.Icon className={selectIconVariants()} {...props}>
      {props.children ?? <ChevronsUpDown aria-hidden className="size-4" />}
    </BaseSelect.Icon>
  );
}
