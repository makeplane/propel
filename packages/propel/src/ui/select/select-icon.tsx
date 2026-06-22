import { Select as BaseSelect } from "@base-ui/react/select";
import { ChevronsUpDown } from "lucide-react";

import { selectIconVariants } from "./variants";

export type SelectIconProps = Omit<BaseSelect.Icon.Props, "className" | "style">;

export function SelectIcon(props: SelectIconProps) {
  return (
    <BaseSelect.Icon className={selectIconVariants()} {...props}>
      {props.children ?? <ChevronsUpDown aria-hidden className="size-4" />}
    </BaseSelect.Icon>
  );
}
