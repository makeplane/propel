import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menubarTriggerLabelVariants } from "./variants";

export type MenubarTriggerLabelProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/** The label of a menu bar trigger. Truncates instead of overflowing the bar. */
export function MenubarTriggerLabel({ render, ...props }: MenubarTriggerLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: menubarTriggerLabelVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
