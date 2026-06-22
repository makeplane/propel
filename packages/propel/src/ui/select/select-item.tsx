import { Select as BaseSelect } from "@base-ui/react/select";

import { selectItemVariants } from "./variants";

export type SelectItemProps = Omit<BaseSelect.Item.Props, "className" | "style">;

export function SelectItem(props: SelectItemProps) {
  return <BaseSelect.Item className={selectItemVariants()} {...props} />;
}
