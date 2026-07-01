import type * as React from "react";

import { checkboxLabelVariants } from "./variants";

export type CheckboxLabelProps = Omit<
  React.ComponentPropsWithoutRef<"label">,
  "className" | "style"
> & {
  /** The row's contents — a `Checkbox`, an optional `CheckboxInlineStartNode`, and the label text. */
  children?: React.ReactNode;
};

/**
 * The clickable row chip that wraps a `Checkbox` box with an optional `CheckboxInlineStartNode` and
 * the label text, matching the Figma "Checkbox with label" component. Associate it with the box via
 * `htmlFor` so clicking anywhere in the row toggles the box. The row reads its disabled look off
 * the wrapped `Checkbox` (which carries `data-disabled`) via `:has()`, so it takes no `disabled`
 * prop.
 */
export function CheckboxLabel(props: CheckboxLabelProps) {
  return <label className={checkboxLabelVariants()} {...props} />;
}
