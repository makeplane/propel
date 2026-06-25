import { Select as BaseSelect } from "@base-ui/react/select";

export type SelectScrollUpArrowProps = Omit<BaseSelect.ScrollUpArrow.Props, "className" | "style">;

export function SelectScrollUpArrow(props: SelectScrollUpArrowProps) {
  return <BaseSelect.ScrollUpArrow {...props} />;
}
