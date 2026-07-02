import { Select as BaseSelect } from "@base-ui/react/select";
import type * as React from "react";

export type SelectProps<Value, Multiple extends boolean | undefined = false> = Omit<
  BaseSelect.Root.Props<Value, Multiple>,
  "className" | "style"
> & {
  /** The select's anatomy — a `SelectTrigger` and the popup of items. */
  children?: React.ReactNode;
};

/**
 * The select Root — Base UI's context/state provider (renders no element of its own). A
 * behavior-only role, so it lives in `components` (rules 1a, 2); the styled parts live in
 * `elements/select` and are grafted onto Base UI behavior here.
 */
export function Select<Value, Multiple extends boolean | undefined = false>(
  props: SelectProps<Value, Multiple>,
) {
  return <BaseSelect.Root {...props} />;
}
