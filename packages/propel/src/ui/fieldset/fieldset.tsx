import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";

import { type FieldsetVariantProps, fieldsetVariants } from "./variants";

export type FieldsetProps = Omit<BaseFieldset.Root.Props, "className" | "style"> &
  FieldsetVariantProps;

/** Groups a legend with related controls. */
export function Fieldset({ bordered, ...props }: FieldsetProps) {
  return <BaseFieldset.Root className={fieldsetVariants({ bordered })} {...props} />;
}
