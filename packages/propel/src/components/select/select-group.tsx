import { Select as BaseSelect } from "@base-ui/react/select";

export type SelectGroupProps = Omit<BaseSelect.Group.Props, "className" | "style">;

/** Groups related options under a `SelectGroupLabel`. */
export function SelectGroup(props: SelectGroupProps) {
  return <BaseSelect.Group {...props} />;
}
