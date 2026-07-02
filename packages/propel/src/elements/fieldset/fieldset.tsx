import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type FieldsetVariantProps, fieldsetVariants } from "./variants";

export type FieldsetProps = Omit<useRender.ComponentProps<"fieldset">, "className" | "style"> &
  FieldsetVariantProps;

/**
 * The styled `<fieldset>` container that groups a legend with related controls. Base-UI-agnostic —
 * graft the fieldset behavior in `components` via `<BaseFieldset.Root render={<Fieldset/>} />`.
 */
export function Fieldset({ bordered, render, ...props }: FieldsetProps) {
  const defaultProps: useRender.ElementProps<"fieldset"> = {
    className: fieldsetVariants({ bordered }),
  };
  return useRender({ defaultTagName: "fieldset", render, props: mergeProps(defaultProps, props) });
}
