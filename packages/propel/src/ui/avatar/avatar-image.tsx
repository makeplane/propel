import { Avatar as BaseAvatar } from "@base-ui/react/avatar";

import { avatarImageVariants } from "./variants";

/** Props for {@link AvatarImage}; 1:1 with Base UI `Avatar.Image`. */
export type AvatarImageProps = Omit<BaseAvatar.Image.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `Avatar.Image`. */
export function AvatarImage(props: AvatarImageProps) {
  return <BaseAvatar.Image className={avatarImageVariants()} {...props} />;
}
