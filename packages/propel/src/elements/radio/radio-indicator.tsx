import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { radioIndicatorVariants } from "./variants";

export type RadioIndicatorProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The styled selected dot: an 8px circle filled with the ring's `currentColor`, rendered inside a
 * `Radio`. Base-UI-agnostic — graft `<BaseRadio.Indicator render={<RadioIndicator />} />` in
 * `components`; the primitive mounts it only while the option is checked.
 */
export function RadioIndicator({ render, ...props }: RadioIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: radioIndicatorVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
