import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { switchThumbVariants } from "./variants";

export type SwitchThumbProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The styled switch knob. Rendered inside a `Switch` track; it slides between the off/on gutters
 * when the track is checked. Its diameter and travel come from the parent `Switch`'s `magnitude`
 * (published as CSS variables on the track), so the thumb takes no size prop of its own.
 * Base-UI-agnostic — graft `<BaseSwitch.Thumb render={<SwitchThumb />} />` in `components`.
 */
export function SwitchThumb({ render, ...props }: SwitchThumbProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: switchThumbVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
