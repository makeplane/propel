import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type InputBoxVariantProps, inputBoxVariants } from "./variants";

export type InputBoxProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  InputBoxVariantProps;

/** The bordered box that frames the the input control and its inline slots. */
export function InputBox({ magnitude, render, ...props }: InputBoxProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: inputBoxVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
