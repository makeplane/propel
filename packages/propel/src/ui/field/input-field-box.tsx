import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type InputMagnitude, type InputTone, inputFieldBoxVariants } from "./variants";

export type InputFieldBoxProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> & {
  /** Magnitude scale. `md` | `lg` | `xl`. */
  magnitude: InputMagnitude;
  /** Resting treatment. `neutral` | `danger`. */
  tone: InputTone;
};

/** The bordered box that frames the `InputField` control and its inline slots. */
export function InputFieldBox({ magnitude, tone, render, ...props }: InputFieldBoxProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: inputFieldBoxVariants({ magnitude, tone }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
