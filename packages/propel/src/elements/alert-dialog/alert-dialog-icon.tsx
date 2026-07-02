import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type AlertDialogIconVariantProps, alertDialogIconVariants } from "./variants";

export type { AlertDialogIconTone } from "./variants";

export type AlertDialogIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style"> &
  AlertDialogIconVariantProps;

/**
 * The decorative leading glyph shown at the inline-start of the title. Sizes its single child to
 * `--node-size`, so the caller passes a bare icon (warning, error, info, …). Decorative — the title
 * carries the accessible name — so it is `aria-hidden`.
 */
export function AlertDialogIcon({ tone, render, ...props }: AlertDialogIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: alertDialogIconVariants({ tone }),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
