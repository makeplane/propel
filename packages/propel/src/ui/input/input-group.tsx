import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type InputGroupVariantProps, inputGroupVariants } from "./variants";

export type InputGroupProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  InputGroupVariantProps;

/** The bordered group that frames the input control and its inline slots. */
export function InputGroup({ magnitude, render, ...props }: InputGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: inputGroupVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
