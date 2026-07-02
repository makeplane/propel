import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";

import {
  CheckboxGroup as CheckboxGroupElement,
  type CheckboxGroupProps as CheckboxGroupElementProps,
} from "../../elements/checkbox-group/index";

export type CheckboxGroupProps = Omit<BaseCheckboxGroup.Props, "className" | "style"> &
  Pick<CheckboxGroupElementProps, "density">;

/**
 * The ready-made checkbox group: grafts Base UI's `CheckboxGroup` behavior (the shared
 * selected-values state) onto the styled `elements/checkbox-group` container.
 */
export function CheckboxGroup({ density, ...props }: CheckboxGroupProps) {
  return <BaseCheckboxGroup {...props} render={<CheckboxGroupElement density={density} />} />;
}
