import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import type * as React from "react";

import { fieldsetVariants } from "./variants";

export type FieldsetProps = Omit<
  React.ComponentProps<typeof BaseFieldset.Root>,
  "className" | "style"
>;

/** Groups a legend with related controls. */
export function Fieldset(props: FieldsetProps) {
  return <BaseFieldset.Root className={fieldsetVariants()} {...props} />;
}
