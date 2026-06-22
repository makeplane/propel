import { Select as BaseSelect } from "@base-ui/react/select";

import { selectLabelVariants } from "./variants";

export type SelectLabelProps = Omit<BaseSelect.Label.Props, "className" | "style">;

export function SelectLabel(props: SelectLabelProps) {
  return <BaseSelect.Label className={selectLabelVariants()} {...props} />;
}
