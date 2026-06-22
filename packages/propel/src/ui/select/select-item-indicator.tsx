import { Select as BaseSelect } from "@base-ui/react/select";
import { Check } from "lucide-react";

import { selectItemIndicatorVariants } from "./variants";

export type SelectItemIndicatorProps = Omit<BaseSelect.ItemIndicator.Props, "className" | "style">;

export function SelectItemIndicator(props: SelectItemIndicatorProps) {
  return (
    <BaseSelect.ItemIndicator className={selectItemIndicatorVariants()} {...props}>
      {props.children ?? <Check aria-hidden className="size-4" />}
    </BaseSelect.ItemIndicator>
  );
}
