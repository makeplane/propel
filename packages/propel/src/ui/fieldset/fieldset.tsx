import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";

import { fieldsetVariants } from "./variants";

export type FieldsetProps = Omit<BaseFieldset.Root.Props, "className" | "style">;

/** Groups a legend with related controls. */
export function Fieldset(props: FieldsetProps) {
  return <BaseFieldset.Root className={fieldsetVariants()} {...props} />;
}
