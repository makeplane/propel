import { Select as BaseSelect } from "@base-ui/react/select";

import { selectPositionerVariants } from "./variants";

export type SelectPositionerProps = Omit<BaseSelect.Positioner.Props, "className" | "style">;

export function SelectPositioner(props: SelectPositionerProps) {
  return <BaseSelect.Positioner className={selectPositionerVariants()} {...props} />;
}
