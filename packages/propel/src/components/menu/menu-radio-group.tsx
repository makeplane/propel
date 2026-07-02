import { Menu as BaseMenu } from "@base-ui/react/menu";

export type MenuRadioGroupProps = Omit<BaseMenu.RadioGroup.Props, "className" | "style">;

/** Wraps `MenuRadioItem`s sharing one `value` — Base UI's radio-group state, no element chrome. */
export function MenuRadioGroup(props: MenuRadioGroupProps) {
  return <BaseMenu.RadioGroup {...props} />;
}
