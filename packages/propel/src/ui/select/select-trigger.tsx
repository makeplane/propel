import { Select as BaseSelect } from "@base-ui/react/select";

import { type SelectTriggerVariantProps, selectTriggerVariants } from "./variants";

export type { SelectTriggerMagnitude } from "./variants";

export type SelectTriggerProps = Omit<BaseSelect.Trigger.Props, "className" | "style"> &
  SelectTriggerVariantProps;

export function SelectTrigger({ magnitude, ...props }: SelectTriggerProps) {
  return <BaseSelect.Trigger className={selectTriggerVariants({ magnitude })} {...props} />;
}
