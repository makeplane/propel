import { Avatar as BaseAvatar } from "@base-ui/react/avatar";

import { workspaceAvatarImageVariants } from "./variants";

/** Props for {@link WorkspaceAvatarImage}; 1:1 with Base UI `Avatar.Image`. */
export type WorkspaceAvatarImageProps = Omit<BaseAvatar.Image.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `Avatar.Image` — the workspace logo, cropped to the square frame. */
export function WorkspaceAvatarImage(props: WorkspaceAvatarImageProps) {
  return <BaseAvatar.Image className={workspaceAvatarImageVariants()} {...props} />;
}
