import type * as React from "react";

import { checkboxLabelVariants, type CheckboxLabelDisabled } from "./variants";

export type CheckboxLabelProps = Omit<
  React.ComponentPropsWithoutRef<"label">,
  "className" | "style"
> & {
  /** Whether the row reads as disabled (drops the pointer cursor and hover background). */
  disabled: CheckboxLabelDisabled;
};

/**
 * The clickable row chip that wraps a `Checkbox` box with an optional `CheckboxInlineStartNode` and
 * the label text, matching the Figma "Checkbox with label" component. Associate it with the box via
 * `htmlFor` so clicking anywhere in the row toggles the box.
 */
export function CheckboxLabel({ disabled, ...props }: CheckboxLabelProps) {
  return <label className={checkboxLabelVariants({ disabled })} {...props} />;
}
