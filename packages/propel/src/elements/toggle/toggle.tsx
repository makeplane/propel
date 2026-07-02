import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ToggleVariantProps, toggleVariants } from "./variants";

export type ToggleProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  ToggleVariantProps;

/**
 * The styled two-state toggle button (typically wrapping an icon). Base-UI-agnostic — graft the
 * `Toggle` behavior in `components` via `<BaseToggle render={<Toggle magnitude=… />} />`. Only
 * `magnitude` is a visual axis; pressed/disabled are control state Base UI reflects as `data-*`.
 */
export function Toggle({ magnitude, render, ...props }: ToggleProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: toggleVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
