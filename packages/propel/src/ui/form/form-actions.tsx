import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { VariantProps } from "class-variance-authority";

import { formActionsVariants } from "./variants";

type FormActionsVariantProps = Required<VariantProps<typeof formActionsVariants>>;

export type FormActionsProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  FormActionsVariantProps;

/**
 * The actions bar at the bottom of a form (submit plus any secondary actions). Its position is
 * always the same; the `variant` axis selects right-aligned inline buttons (`"inline"`) or
 * full-width stretched buttons (`"stretch"`).
 */
export function FormActions({ variant, render, ...props }: FormActionsProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: formActionsVariants({ variant }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
