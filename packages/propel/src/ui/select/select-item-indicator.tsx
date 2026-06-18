import { Select as BaseSelect } from "@base-ui/react/select";
import { Check } from "lucide-react";
import type * as React from "react";

import { selectItemIndicatorVariants } from "./variants";

export type SelectItemIndicatorProps = Omit<
  React.ComponentProps<typeof BaseSelect.ItemIndicator>,
  "className" | "style"
>;

export function SelectItemIndicator(props: SelectItemIndicatorProps) {
  return (
    <BaseSelect.ItemIndicator className={selectItemIndicatorVariants()} {...props}>
      {props.children ?? <Check aria-hidden className="size-4" />}
    </BaseSelect.ItemIndicator>
  );
}
