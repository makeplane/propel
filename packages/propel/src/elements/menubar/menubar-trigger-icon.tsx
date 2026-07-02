import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menubarTriggerIconVariants } from "./variants";

export type MenubarTriggerIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * A decorative leading icon at a menu bar trigger's inline-start. Sizes its single child to the
 * trigger's `--node-size`, so callers pass a bare icon. Decorative (the trigger carries the
 * accessible name), so it is `aria-hidden`. Compose it only when the item has an icon — the
 * designer's "whether items have icons" axis.
 */
export function MenubarTriggerIcon({ render, ...props }: MenubarTriggerIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: menubarTriggerIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
