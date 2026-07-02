import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ToastStatusIconVariantProps, toastStatusIconVariants } from "./variants";

export type { ToastTone } from "./variants";

export type ToastStatusIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style"> &
  ToastStatusIconVariantProps;

/**
 * The tone-colored status-icon slot at a toast's inline-start. A single styled `<span>` that sizes
 * and colors its bare `<svg>` glyph child (passed as `children`); the tone→glyph mapping is a
 * `components` concern (see `components/toast`).
 */
export function ToastStatusIcon({ tone, render, ...props }: ToastStatusIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: toastStatusIconVariants({ tone }),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
