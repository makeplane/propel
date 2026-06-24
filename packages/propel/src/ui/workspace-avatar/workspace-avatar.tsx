import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { type VariantProps } from "class-variance-authority";

import { workspaceAvatarVariants } from "./variants";

export type WorkspaceAvatarMagnitude = NonNullable<
  VariantProps<typeof workspaceAvatarVariants>["magnitude"]
>;

/** Props for {@link WorkspaceAvatar} (the Base UI `Avatar.Root`), plus a `magnitude`. */
export type WorkspaceAvatarProps = Omit<BaseAvatar.Root.Props, "className" | "style"> & {
  /** Avatar size. Required — there is no default. */
  magnitude: WorkspaceAvatarMagnitude;
};

/**
 * The styled `Avatar.Root` for a workspace — a single element that holds a `WorkspaceAvatarImage`
 * and/or `WorkspaceAvatarFallback`. Maps 1:1 to Base UI's `Avatar.Root`. The rounded-square shape
 * distinguishes a workspace from a (circular) person avatar. For the ready-made image+initials
 * avatar, use the `WorkspaceAvatar` from `@plane/propel/components/workspace-avatar`.
 */
export function WorkspaceAvatar({ magnitude, ...props }: WorkspaceAvatarProps) {
  return <BaseAvatar.Root className={workspaceAvatarVariants({ magnitude })} {...props} />;
}
