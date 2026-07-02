import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type SelectTriggerVariantProps, selectTriggerVariants } from "./variants";

export type { SelectTriggerMagnitude } from "./variants";

export type SelectTriggerProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  SelectTriggerVariantProps;

/**
 * The styled select trigger button — wraps the selected value + trailing icon in one flex row.
 * Base-UI-agnostic — graft the select behavior in `components` via `<BaseSelect.Trigger
 * render={<SelectTrigger/>} />`.
 */
export function SelectTrigger({ magnitude, render, ...props }: SelectTriggerProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: selectTriggerVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
