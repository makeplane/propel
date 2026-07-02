import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { radioVariants } from "./variants";

export type RadioProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The styled radio ring (16px, Figma node 2159-4535). Base-UI-agnostic — graft the radio behavior
 * in `components` via `<BaseRadio.Root render={<Radio />}>` (it supplies `role="radio"`, the
 * selected/disabled state, and keyboard/form support). Render a `RadioIndicator` as its child for
 * the selected dot.
 */
export function Radio({ render, ...props }: RadioProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: radioVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
