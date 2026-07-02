import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { linearProgressVariants } from "./variants";

export type LinearProgressProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled linear-progress frame — the flex row that groups the track and its label/value.
 * Base-UI-agnostic; graft the `progressbar` value model in `components` via `<BaseProgress.Root
 * render={<LinearProgress/>} />`.
 */
export function LinearProgress({ render, ...props }: LinearProgressProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: linearProgressVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
