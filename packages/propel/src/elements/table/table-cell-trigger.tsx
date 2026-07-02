import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tableCellTriggerVariants } from "./variants";

export type TableCellTriggerLayout = "editable" | "action";

export type TableCellTriggerProps = Omit<
  useRender.ComponentProps<"button">,
  "className" | "style" | "type"
> & {
  /** `editable` lays out a value + trailing chevron; `action` centers an icon. */
  layout: TableCellTriggerLayout;
  /** Keeps the active editable cell tinted. @default false */
  selected?: boolean;
};

/**
 * The full-cell `<button>` inside an editable/action cell — a single styled element. Base-UI-
 * agnostic: the ready-made `components/table` grafts the Base UI Menu trigger onto it via `render`
 * (`<BaseMenu.Trigger render={<TableCellTrigger/>} />`, behavior part outer). Carries a
 * `cell-trigger` group so its indicator can dim while disabled.
 */
export function TableCellTrigger({
  layout,
  selected = false,
  render,
  ...props
}: TableCellTriggerProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    type: "button",
    className: tableCellTriggerVariants({ layout, selected }),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
