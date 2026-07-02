import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type FieldsetLegendVariantProps, fieldsetLegendVariants } from "./variants";

export type FieldsetLegendProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  FieldsetLegendVariantProps;

/**
 * The styled label for a `Fieldset`. Base-UI-agnostic — graft the legend behavior in `components`
 * via `<BaseFieldset.Legend render={<FieldsetLegend/>} />`.
 */
export function FieldsetLegend({ magnitude, render, ...props }: FieldsetLegendProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: fieldsetLegendVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
