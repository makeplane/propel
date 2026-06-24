import { Select as BaseSelect } from "@base-ui/react/select";
import { type VariantProps } from "class-variance-authority";

import { selectTriggerVariants } from "./variants";

export type SelectTriggerMagnitude = NonNullable<
  VariantProps<typeof selectTriggerVariants>["magnitude"]
>;

type SelectTriggerOwnProps = {
  /** Controls the trigger height and text/icon size. Required — choose `sm`, `md`, or `lg`. */
  magnitude: SelectTriggerMagnitude;
};

export type SelectTriggerProps = Omit<BaseSelect.Trigger.Props, "className" | "style"> &
  SelectTriggerOwnProps;

export function SelectTrigger({ magnitude, ...props }: SelectTriggerProps) {
  return <BaseSelect.Trigger className={selectTriggerVariants({ magnitude })} {...props} />;
}
