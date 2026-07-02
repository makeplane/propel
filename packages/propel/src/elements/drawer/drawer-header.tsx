import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { drawerHeaderVariants } from "./variants";

export type DrawerHeaderProps = Omit<useRender.ComponentProps<"header">, "className" | "style">;

/**
 * The drawer's top region (the Figma header). Lays the title/description heading block at the
 * inline-start and an optional corner close at the inline-end on one baseline. Compose a
 * `DrawerHeaderContent` for the title/description stack.
 */
export function DrawerHeader({ render, ...props }: DrawerHeaderProps) {
  const defaultProps: useRender.ElementProps<"header"> = { className: drawerHeaderVariants() };
  return useRender({ defaultTagName: "header", render, props: mergeProps(defaultProps, props) });
}
