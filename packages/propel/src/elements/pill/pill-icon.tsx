import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { pillIconVariants } from "./variants";

export type PillIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * A decorative leading or trailing node slot (the Figma inline-start / inline-end node). Sizes
 * whatever single child is passed to the pill's inherited `--node-size`, so callers pass a bare
 * icon. Decorative (the pill carries the accessible name), so it is `aria-hidden`.
 */
export function PillIcon({ render, ...props }: PillIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: pillIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
