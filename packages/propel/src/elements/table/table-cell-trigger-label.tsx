import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tableCellTriggerLabelVariants } from "./variants";

export type TableCellTriggerLabelProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/** The truncating value text inside an editable `TableCellTrigger`. */
export function TableCellTriggerLabel({ render, ...props }: TableCellTriggerLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: tableCellTriggerLabelVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
