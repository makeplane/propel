import { Select as BaseSelect } from "@base-ui/react/select";

export type SelectItemTextProps = Omit<BaseSelect.ItemText.Props, "className" | "style">;

export function SelectItemText(props: SelectItemTextProps) {
  return <BaseSelect.ItemText {...props} />;
}
