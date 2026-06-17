import { Field as BaseField } from "@base-ui/react/field";
import { cx } from "class-variance-authority";
import type * as React from "react";

import { FieldHelperText, FieldLabelGroup, type SharedFieldProps } from "./input-field-layout";
import { boxVariants, textAreaMinHeight, textAreaTextVariants } from "./input-styles";

export type TextAreaProps = Omit<
  React.ComponentProps<typeof BaseField.Control>,
  "className" | "render" | "style"
> &
  SharedFieldProps;

/**
 * Multi-line text field built on Base UI `Field`, rendering the control as a `<textarea>`. Vertical
 * layout only.
 */
export function TextArea({
  magnitude,
  tone,
  name,
  label,
  required,
  description,
  hint,
  error,
  disabled,
  ...controlProps
}: TextAreaProps) {
  return (
    <BaseField.Root
      name={name}
      disabled={disabled}
      invalid={tone === "danger" || undefined}
      className="flex w-full flex-col items-start gap-2"
    >
      <FieldLabelGroup
        magnitude={magnitude}
        required={required}
        label={label}
        description={description}
        orientation="vertical"
      />
      <div className="flex w-full flex-col gap-1.5">
        <div className={cx(boxVariants({ tone }), "items-stretch rounded-lg py-2")}>
          <BaseField.Control
            required={required}
            render={<textarea />}
            className={cx(
              "scrollbar-sm min-w-0 flex-1 resize-none overflow-y-auto bg-transparent px-3 text-primary outline-none",
              "placeholder:text-placeholder",
              "disabled:cursor-not-allowed disabled:text-disabled",
              textAreaMinHeight[magnitude],
              textAreaTextVariants({ magnitude }),
            )}
            {...controlProps}
          />
        </div>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </div>
    </BaseField.Root>
  );
}
