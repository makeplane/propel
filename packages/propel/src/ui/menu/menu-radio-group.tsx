import { Menu as BaseMenu } from "@base-ui/react/menu";

export type MenuRadioGroupProps = Omit<BaseMenu.RadioGroup.Props, "className" | "style">;

/** Groups related radio items around a shared value. Wraps `Menu.RadioGroup` 1:1. */
export function MenuRadioGroup(props: MenuRadioGroupProps) {
  return <BaseMenu.RadioGroup {...props} />;
}
