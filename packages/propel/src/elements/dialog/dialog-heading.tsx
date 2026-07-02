import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { dialogHeadingVariants } from "./variants";

export type DialogHeadingProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The heading block inside a `DialogHeader`: stacks the `DialogTitle` over an optional
 * `DialogDescription` with a tight gap, sitting at the header's inline-start opposite the close
 * button. Holding the title/description together as one block keeps them aligned to the start while
 * the close stays pinned to the inline-end corner.
 */
export function DialogHeading({ render, ...props }: DialogHeadingProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: dialogHeadingVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
