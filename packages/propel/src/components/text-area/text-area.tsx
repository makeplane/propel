import { Field as BaseField } from "@base-ui/react/field";
import type * as React from "react";

import {
  TextArea as TextAreaElement,
  type TextAreaMagnitude,
  type TextAreaResize,
  type TextAreaSurface,
} from "../../elements/text-area/text-area";

export type { TextAreaMagnitude, TextAreaResize, TextAreaSurface };

type BaseFieldControlProps = BaseField.Control.Props;
// `Field.Control` is input-shaped; restore the textarea-only native attrs (rows, cols, wrap…) minus
// the keys Field.Control already owns.
type NativeTextAreaProps = Omit<
  React.ComponentProps<"textarea">,
  keyof BaseFieldControlProps | "children" | "className" | "style"
>;

export type TextAreaProps = Omit<BaseFieldControlProps, "className" | "style" | "render"> &
  NativeTextAreaProps & {
    /** Text size for the textarea value. */
    magnitude: TextAreaMagnitude;
    /** Control presentation for standalone fields or embedded composer surfaces. */
    surface: TextAreaSurface;
    /** Controls whether the user can resize the textarea (none, vertical, both). */
    resize: TextAreaResize;
    /** The default value of the textarea. Use when uncontrolled. */
    defaultValue?: React.ComponentProps<"textarea">["defaultValue"];
    /** The value of the textarea. Use when controlled. */
    value?: React.ComponentProps<"textarea">["value"];
  };

/**
 * Multi-line text field that automatically works inside `Field`. Base UI's `Field.Control` behavior
 * grafted onto the styled `elements` `TextArea` element (rule 1a) — behavior part outer, styled
 * part as the render target. Base UI ships no textarea control, so `Field.Control` renders the
 * styled `<textarea>` directly (this replaces the former `base/text-area` wrapper).
 */
export function TextArea({ magnitude, surface, resize, ...props }: TextAreaProps) {
  return (
    <BaseField.Control
      {...props}
      render={<TextAreaElement magnitude={magnitude} surface={surface} resize={resize} />}
    />
  );
}
