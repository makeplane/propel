import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type WorkspaceAvatarIconVariantProps, workspaceAvatarIconVariants } from "./variants";

/** Props for {@link WorkspaceAvatarIcon}, plus the `magnitude` that sizes its glyph. */
export type WorkspaceAvatarIconProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
> &
  WorkspaceAvatarIconVariantProps;

/**
 * The anonymous workspace-icon content state, shown when a workspace avatar has neither a logo nor
 * initials. A node-slot: it sizes its single child to the magnitude's icon size, so callers pass a
 * bare icon. Bakes no glyph — pass the icon as `children`. Decorative (the `WorkspaceAvatar` root
 * carries the accessible name), so it is `aria-hidden`.
 */
export function WorkspaceAvatarIcon({ magnitude, render, ...props }: WorkspaceAvatarIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: workspaceAvatarIconVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
