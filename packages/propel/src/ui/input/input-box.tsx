import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type InputMagnitude, type InputTone, inputBoxVariants } from "./variants";

export type InputBoxProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> & {
  /** Magnitude scale. `md` | `lg` | `xl`. */
  magnitude: InputMagnitude;
  /** Resting treatment. `neutral` | `danger`. */
  tone: InputTone;
};

/** The bordered box that frames the the input control and its inline slots. */
export function InputBox({ magnitude, tone, render, ...props }: InputBoxProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: inputBoxVariants({ magnitude, tone }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
