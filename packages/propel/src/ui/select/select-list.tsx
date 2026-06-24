import { Select as BaseSelect } from "@base-ui/react/select";

export type SelectListProps = Omit<BaseSelect.List.Props, "className" | "style">;

export function SelectList(props: SelectListProps) {
  return <BaseSelect.List {...props} />;
}
