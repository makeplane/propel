import type * as React from "react";

import { fieldsetDescriptionVariants } from "./variants";

export type FieldsetDescriptionProps = Omit<
  React.ComponentPropsWithRef<"p">,
  "className" | "style"
>;

/** Supporting text shown below the fieldset legend. */
export function FieldsetDescription(props: FieldsetDescriptionProps) {
  return <p className={fieldsetDescriptionVariants()} {...props} />;
}
