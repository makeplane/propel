import { Select as BaseSelect } from "@base-ui/react/select";

export type SelectValueProps = Omit<BaseSelect.Value.Props, "className" | "style">;

export function SelectValue(props: SelectValueProps) {
  return <BaseSelect.Value {...props} />;
}
