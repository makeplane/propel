import { Select as BaseSelect } from "@base-ui/react/select";

import { SelectLabel as SelectLabelElement } from "../../elements/select";

export type SelectLabelProps = Omit<BaseSelect.Label.Props, "className" | "render" | "style">;

/**
 * The ready-made select label: grafts Base UI's `Select.Label` behavior — automatic association
 * with the trigger — onto the styled label.
 */
export function SelectLabel(props: SelectLabelProps) {
  return <BaseSelect.Label {...props} render={<SelectLabelElement />} />;
}
