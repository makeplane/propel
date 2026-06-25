import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type InputTone, textAreaFieldBoxVariants } from "./variants";

export type TextAreaFieldBoxProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> & {
  /** Resting treatment. `neutral` | `danger`. */
  tone: InputTone;
};

/** The bordered box that frames the `TextAreaField` control. */
export function TextAreaFieldBox({ tone, render, ...props }: TextAreaFieldBoxProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: textAreaFieldBoxVariants({ tone }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
