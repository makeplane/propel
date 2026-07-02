import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { fieldItemContentVariants } from "./variants";

export type FieldItemContentProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/** The label + description column for a single choice option (checkbox/radio/switch row). */
export function FieldItemContent({ render, ...props }: FieldItemContentProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: fieldItemContentVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
