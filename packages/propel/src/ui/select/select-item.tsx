import { Select as BaseSelect } from "@base-ui/react/select";
import { type VariantProps } from "class-variance-authority";

import { selectItemVariants } from "./variants";

export type SelectItemMagnitude = NonNullable<VariantProps<typeof selectItemVariants>["magnitude"]>;

type SelectItemOwnProps = {
  /** Controls the row height and text size. Required — choose `sm`, `md`, or `lg`. */
  magnitude: SelectItemMagnitude;
};

export type SelectItemProps = Omit<BaseSelect.Item.Props, "className" | "style"> &
  SelectItemOwnProps;

export function SelectItem({ magnitude, ...props }: SelectItemProps) {
  return <BaseSelect.Item className={selectItemVariants({ magnitude })} {...props} />;
}
