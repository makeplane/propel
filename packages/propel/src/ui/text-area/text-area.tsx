import { BaseTextArea, type BaseTextAreaProps } from "../../base/text-area";
import {
  textAreaVariants,
  type TextAreaMagnitude,
  type TextAreaResize,
  type TextAreaSurface,
} from "./variants";

export type { TextAreaMagnitude, TextAreaResize, TextAreaSurface };

export type TextAreaProps = Omit<BaseTextAreaProps, "className" | "style"> & {
  /** Text size for the textarea value. */
  magnitude: TextAreaMagnitude;
  /** Control presentation for standalone fields or embedded composer surfaces. */
  surface: TextAreaSurface;
  /** Controls whether the user can resize the textarea (none, vertical, both). */
  resize: TextAreaResize;
};

/** Multi-line native textarea element. Compose it with `Field` for labels and validation. */
export function TextArea({ magnitude, surface, resize, ...props }: TextAreaProps) {
  return <BaseTextArea className={textAreaVariants({ magnitude, surface, resize })} {...props} />;
}
