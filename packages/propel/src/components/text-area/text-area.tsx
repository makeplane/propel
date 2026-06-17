import { BaseTextArea, type BaseTextAreaProps } from "../../base/text-area";
import { textAreaVariants, type TextAreaMagnitude, type TextAreaSurface } from "./text-area-styles";

export type { TextAreaMagnitude, TextAreaSurface };

export type TextAreaProps = Omit<BaseTextAreaProps, "className" | "style"> & {
  /** Text size for the textarea value. */
  magnitude: TextAreaMagnitude;
  /** Control presentation for standalone fields or embedded composer surfaces. */
  surface: TextAreaSurface;
};

/** Multi-line native textarea element. Compose it with `Field` for labels and validation. */
export function TextArea({ magnitude, surface, ...props }: TextAreaProps) {
  return <BaseTextArea className={textAreaVariants({ magnitude, surface })} {...props} />;
}
