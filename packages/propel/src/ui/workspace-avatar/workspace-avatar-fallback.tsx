import { Avatar as BaseAvatar } from "@base-ui/react/avatar";

import {
  type WorkspaceAvatarFallbackVariantProps,
  workspaceAvatarFallbackVariants,
} from "./variants";

export type { WorkspaceAvatarFallbackVariantProps } from "./variants";

/** Props for {@link WorkspaceAvatarFallback}; 1:1 with Base UI `Avatar.Fallback`, plus a `tone`. */
export type WorkspaceAvatarFallbackProps = Omit<BaseAvatar.Fallback.Props, "className" | "style"> &
  WorkspaceAvatarFallbackVariantProps;

/** 1:1 wrapper around Base UI `Avatar.Fallback` — the workspace initials surface. */
export function WorkspaceAvatarFallback({ tone, ...props }: WorkspaceAvatarFallbackProps) {
  return <BaseAvatar.Fallback className={workspaceAvatarFallbackVariants({ tone })} {...props} />;
}
