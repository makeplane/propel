import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { fieldsetDescriptionVariants } from "./variants";

export type FieldsetDescriptionProps = Omit<useRender.ComponentProps<"p">, "className" | "style">;

/** Supporting text shown below the fieldset legend. */
export function FieldsetDescription({ render, ...props }: FieldsetDescriptionProps) {
  const defaultProps: useRender.ElementProps<"p"> = {
    className: fieldsetDescriptionVariants(),
  };
  return useRender({ defaultTagName: "p", render, props: mergeProps(defaultProps, props) });
}
