import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { linearProgressValueVariants, type LinearProgressValueVariantProps } from "./variants";

export type LinearProgressValueProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
> &
  LinearProgressValueVariantProps;

/**
 * The styled percentage readout — tinted to match the fill `tone` (per Figma). Base-UI-agnostic —
 * graft in `components` via `<BaseProgress.Value render={<LinearProgressValue/>} />`.
 */
export function LinearProgressValue({ render, tone, ...props }: LinearProgressValueProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: linearProgressValueVariants({ tone }),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
