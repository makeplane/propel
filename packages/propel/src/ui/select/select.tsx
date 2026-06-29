import { Select as BaseSelect } from "@base-ui/react/select";
import type * as React from "react";

export type SelectProps<Value, Multiple extends boolean | undefined = false> = Omit<
  BaseSelect.Root.Props<Value, Multiple>,
  "className" | "style"
> & {
  /** The select's anatomy — a `SelectTrigger` and the `SelectPopup` of `SelectItem`s. */
  children?: React.ReactNode;
};

export function Select<Value, Multiple extends boolean | undefined = false>(
  props: SelectProps<Value, Multiple>,
) {
  return <BaseSelect.Root {...props} />;
}
