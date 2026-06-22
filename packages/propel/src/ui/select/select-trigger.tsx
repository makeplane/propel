import { Select as BaseSelect } from "@base-ui/react/select";

import { selectTriggerVariants } from "./variants";

export type SelectTriggerProps = Omit<BaseSelect.Trigger.Props, "className" | "style">;

export function SelectTrigger(props: SelectTriggerProps) {
  return <BaseSelect.Trigger className={selectTriggerVariants()} {...props} />;
}
