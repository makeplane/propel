import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { pillSwitchVariants, type PillSwitchVariantProps } from "./variants";

export type PillSwitchProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  PillSwitchVariantProps;

/**
 * The toggle pill container. Renders a `<button>` by default carrying the selected look as its
 * pressed state (the cva styles `data-pressed`); compose a `PillLabel` and optional
 * leading/trailing `PillIcon` inside it. It does NOT embed any toggle behavior, keeping
 * `elements/pill` independent of the Toggle primitive: a switch composition grafts the behavior on
 * in `components` by rendering the styled button as the `Toggle`'s render target — `<Toggle
 * render={<PillSwitch/>} />`.
 */
export function PillSwitch({ magnitude, render, ...props }: PillSwitchProps) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps({ className: pillSwitchVariants({ magnitude }), type: "button" }, props),
  });
}
