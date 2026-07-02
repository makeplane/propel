import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type RadioGroupVariantProps, radioGroupVariants } from "./variants";

export type { RadioGroupDensity } from "./variants";

export type RadioGroupProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  RadioGroupVariantProps;

/**
 * The styled radio group frame. It carries the row-spacing axis (`density`). Base-UI-agnostic —
 * graft the group behavior in `components` via `<BaseRadioGroup render={<RadioGroup
 * density="comfortable" />}>` (single-select state + roving focus). Renders a `radiogroup` once
 * grafted.
 */
export function RadioGroup({ density, render, ...props }: RadioGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: radioGroupVariants({ density }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
