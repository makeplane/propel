import type * as React from "react";

import { fieldsetDescriptionVariants } from "./variants";

export type FieldsetDescriptionProps = Omit<
  React.ComponentPropsWithRef<"p">,
  "className" | "style"
> & {
  /** The supporting description text shown below the legend. */
  children?: React.ReactNode;
};

/** Supporting text shown below the fieldset legend. */
export function FieldsetDescription(props: FieldsetDescriptionProps) {
  return <p className={fieldsetDescriptionVariants()} {...props} />;
}
