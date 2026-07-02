import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type CheckboxGroupVariantProps, checkboxGroupVariants } from "./variants";

export type { CheckboxGroupDensity } from "./variants";

export type CheckboxGroupProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  CheckboxGroupVariantProps;

/**
 * The styled checkbox-group container. Base-UI-agnostic — graft the group behavior (the shared
 * selected-values state) in `components` via `<BaseCheckboxGroup render={<CheckboxGroup/>} />`.
 */
export function CheckboxGroup({ density, render, ...props }: CheckboxGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: checkboxGroupVariants({ density }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
