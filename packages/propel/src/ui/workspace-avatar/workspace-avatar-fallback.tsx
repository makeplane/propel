import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { type VariantProps } from "class-variance-authority";

import { workspaceAvatarFallbackVariants } from "./variants";

/** Props for {@link WorkspaceAvatarFallback}; 1:1 with Base UI `Avatar.Fallback`, plus a `tone`. */
export type WorkspaceAvatarFallbackProps = Omit<
  BaseAvatar.Fallback.Props,
  "className" | "style"
> & {
  /** Initials surface color. `none` (default) is the anonymous/icon state. */
  tone?: NonNullable<VariantProps<typeof workspaceAvatarFallbackVariants>["tone"]>;
};

/** 1:1 wrapper around Base UI `Avatar.Fallback` — the workspace initials surface. */
export function WorkspaceAvatarFallback({ tone = "none", ...props }: WorkspaceAvatarFallbackProps) {
  return <BaseAvatar.Fallback className={workspaceAvatarFallbackVariants({ tone })} {...props} />;
}
