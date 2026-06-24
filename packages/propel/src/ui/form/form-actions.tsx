import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import { formActionsVariants } from "./variants";

type FormActionsVariantProps = Required<VariantProps<typeof formActionsVariants>>;

export type FormActionsProps = Omit<React.ComponentPropsWithoutRef<"div">, "className" | "style"> &
  FormActionsVariantProps;

/**
 * The actions bar at the bottom of a form (submit plus any secondary actions). Its position is
 * always the same; the `variant` axis selects right-aligned inline buttons (`"inline"`) or
 * full-width stretched buttons (`"stretch"`).
 */
export function FormActions({ variant, ...props }: FormActionsProps) {
  return <div className={formActionsVariants({ variant })} {...props} />;
}
