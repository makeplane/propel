import { Field as BaseField } from "@base-ui/react/field";
import * as React from "react";

type BaseFieldControlProps = React.ComponentProps<typeof BaseField.Control>;

type NativeTextAreaProps = Omit<
  React.ComponentProps<"textarea">,
  keyof BaseFieldControlProps | "children" | "className" | "style"
>;

export type BaseTextAreaProps = Omit<BaseFieldControlProps, "render"> &
  NativeTextAreaProps & {
    /** The default value of the textarea. Use when uncontrolled. */
    defaultValue?: React.ComponentProps<"textarea">["defaultValue"];
    /** The value of the textarea. Use when controlled. */
    value?: React.ComponentProps<"textarea">["value"];
  };

/**
 * A native textarea element that automatically works with Field. Renders a `<textarea>` element.
 *
 * Adapted from Base UI Input.
 */
export const BaseTextArea = React.forwardRef<HTMLElement, BaseTextAreaProps>(
  function BaseTextArea(props, forwardedRef) {
    return <BaseField.Control ref={forwardedRef} render={<textarea />} {...props} />;
  },
);

if (process.env.NODE_ENV !== "production") {
  BaseTextArea.displayName = "BaseTextArea";
}
