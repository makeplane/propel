import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { numberFieldGroupVariants } from "./variants";

export type NumberFieldGroupProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled bordered group wrapping the decrement / input / increment controls. Base-UI-agnostic —
 * graft in `components` via `<BaseNumberField.Group render={<NumberFieldGroup/>} />`.
 */
export function NumberFieldGroup({ render, ...props }: NumberFieldGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: numberFieldGroupVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
