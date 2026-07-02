import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuItemSecondaryTextVariants } from "./variants";

export type MenuItemSecondaryTextProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/** Muted text shown inline after the title (e.g. a translation or a hint). */
export function MenuItemSecondaryText({ render, ...props }: MenuItemSecondaryTextProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: menuItemSecondaryTextVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
