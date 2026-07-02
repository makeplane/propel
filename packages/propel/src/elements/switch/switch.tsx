import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type SwitchVariantProps, switchVariants } from "./variants";

export type { SwitchMagnitude } from "./variants";

export type SwitchProps = Omit<useRender.ComponentProps<"span">, "className" | "style"> &
  SwitchVariantProps;

/**
 * The styled switch track. It carries the size axis (`magnitude`) and publishes the thumb's
 * diameter/travel as CSS variables. Base-UI-agnostic — graft the switch behavior in `components`
 * via `<BaseSwitch.Root render={<Switch magnitude="md" />}>` (it supplies `role="switch"` and full
 * keyboard/form support). Render a `SwitchThumb` as its child; the thumb sizes itself from this
 * track's `magnitude`.
 *
 * On/off, `disabled`, and `readOnly` are control state from the primitive, not variants. Only the
 * size axis (`magnitude`) is a visual variant.
 */
export function Switch({ magnitude, render, ...props }: SwitchProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: switchVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
