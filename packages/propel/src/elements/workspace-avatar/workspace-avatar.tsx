import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type WorkspaceAvatarVariantProps, workspaceAvatarVariants } from "./variants";

export type { WorkspaceAvatarMagnitude } from "./variants";

/** Props for {@link WorkspaceAvatar}; a styled `<span>` plus a `magnitude`. */
export type WorkspaceAvatarProps = Omit<useRender.ComponentProps<"span">, "className" | "style"> &
  WorkspaceAvatarVariantProps;

/**
 * The styled workspace avatar root — a single `<span>` that holds a `WorkspaceAvatarImage` and/or
 * `WorkspaceAvatarFallback`. Base-UI-agnostic — graft the `Avatar.Root` behavior in `components`
 * via `<BaseAvatar.Root render={<WorkspaceAvatar/>} />`. The rounded-square shape distinguishes a
 * workspace from a (circular) person avatar. For the ready-made image+initials avatar, use the
 * `WorkspaceAvatar` from `@plane/propel/components/workspace-avatar`.
 */
export function WorkspaceAvatar({ magnitude, render, ...props }: WorkspaceAvatarProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: workspaceAvatarVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
