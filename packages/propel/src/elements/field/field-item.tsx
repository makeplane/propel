import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { fieldItemVariants } from "./variants";

export type FieldItemProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * Groups one checkbox or radio option with its label and optional description. Base-UI-agnostic —
 * graft the Base UI `Field.Item` behavior in `components` via `<BaseField.Item
 * render={<FieldItem/>} />`.
 */
export function FieldItem({ render, ...props }: FieldItemProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: fieldItemVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
