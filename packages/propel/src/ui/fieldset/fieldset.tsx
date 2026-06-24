import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import type { VariantProps } from "class-variance-authority";

import { fieldsetVariants } from "./variants";

type FieldsetVariantProps = VariantProps<typeof fieldsetVariants>;

export type FieldsetProps = Omit<BaseFieldset.Root.Props, "className" | "style"> & {
  /** Whether a visible border wraps the group. */
  bordered: NonNullable<FieldsetVariantProps["bordered"]>;
};

/** Groups a legend with related controls. */
export function Fieldset({ bordered, ...props }: FieldsetProps) {
  return <BaseFieldset.Root className={fieldsetVariants({ bordered })} {...props} />;
}
