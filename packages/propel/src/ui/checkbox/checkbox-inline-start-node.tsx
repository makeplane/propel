import type * as React from "react";

import { checkboxInlineStartNodeVariants } from "./variants";

export type CheckboxInlineStartNodeProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The decorative icon slot between the box and the label text (Figma "checkbox with label" icon
 * slot). Sizes its single child to `--node-size` (14px); pass a bare icon. Decorative — the box and
 * label carry the accessible name — so it is `aria-hidden`.
 */
export function CheckboxInlineStartNode(props: CheckboxInlineStartNodeProps) {
  return <span aria-hidden className={checkboxInlineStartNodeVariants()} {...props} />;
}
