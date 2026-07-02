import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import {
  type TextAreaMagnitude,
  type TextAreaResize,
  type TextAreaSurface,
  type TextAreaVariantProps,
  textAreaVariants,
} from "./variants";

export type { TextAreaMagnitude, TextAreaResize, TextAreaSurface };

export type TextAreaProps = Omit<useRender.ComponentProps<"textarea">, "className" | "style"> &
  TextAreaVariantProps;

/**
 * The styled multi-line textarea leaf. Base-UI-agnostic — graft the Base UI `Field.Control`
 * behavior in `components` via `<BaseField.Control render={<TextArea/>} />`. Compose it inside a
 * `TextAreaGroup` frame.
 */
export function TextArea({ magnitude, surface, resize, render, ...props }: TextAreaProps) {
  const defaultProps: useRender.ElementProps<"textarea"> = {
    className: textAreaVariants({ magnitude, surface, resize }),
  };
  return useRender({ defaultTagName: "textarea", render, props: mergeProps(defaultProps, props) });
}
