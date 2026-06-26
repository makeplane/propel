import { Select as BaseSelect } from "@base-ui/react/select";

import { type SelectItemVariantProps, selectItemVariants } from "./variants";

export type { SelectItemMagnitude } from "./variants";

export type SelectItemProps = Omit<BaseSelect.Item.Props, "className" | "style"> &
  SelectItemVariantProps;

export function SelectItem({ magnitude, ...props }: SelectItemProps) {
  return <BaseSelect.Item className={selectItemVariants({ magnitude })} {...props} />;
}
