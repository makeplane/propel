import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { linearProgressValueVariants } from "./variants";

export type LinearProgressValueProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The styled percentage readout — a neutral number (the semantic tone lives on the fill, not on the
 * number). Base-UI-agnostic — graft in `components` via `<BaseProgress.Value
 * render={<LinearProgressValue/>} />`.
 */
export function LinearProgressValue({ render, ...props }: LinearProgressValueProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: linearProgressValueVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
