import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { avatarFallbackVariants } from "./variants";

/** Props for {@link AvatarFallback}; 1:1 with Base UI `Avatar.Fallback`, plus a `tone`. */
export type AvatarFallbackProps = Omit<
  React.ComponentProps<typeof BaseAvatar.Fallback>,
  "className" | "style"
> & {
  /** Initials surface color. `none` (default) is the anonymous/icon state. */
  tone?: NonNullable<VariantProps<typeof avatarFallbackVariants>["tone"]>;
};

/** 1:1 wrapper around Base UI `Avatar.Fallback`. */
export function AvatarFallback({ tone = "none", ...props }: AvatarFallbackProps) {
  return <BaseAvatar.Fallback className={avatarFallbackVariants({ tone })} {...props} />;
}
