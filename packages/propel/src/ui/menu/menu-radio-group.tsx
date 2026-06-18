import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

export type MenuRadioGroupProps = Omit<
  React.ComponentProps<typeof BaseMenu.RadioGroup>,
  "className" | "style"
>;

/** Groups related radio items around a shared value. Wraps `Menu.RadioGroup` 1:1. */
export function MenuRadioGroup(props: MenuRadioGroupProps) {
  return <BaseMenu.RadioGroup {...props} />;
}
