import { Avatar as BaseAvatar } from "@base-ui/react/avatar";

import { type AvatarFallbackVariantProps, avatarFallbackVariants } from "./variants";

export type { AvatarFallbackTone } from "./variants";

/** Props for {@link AvatarFallback}; 1:1 with Base UI `Avatar.Fallback`, plus a `tone`. */
export type AvatarFallbackProps = Omit<BaseAvatar.Fallback.Props, "className" | "style"> &
  AvatarFallbackVariantProps;

/** 1:1 wrapper around Base UI `Avatar.Fallback`. */
export function AvatarFallback({ tone, ...props }: AvatarFallbackProps) {
  return <BaseAvatar.Fallback className={avatarFallbackVariants({ tone })} {...props} />;
}
