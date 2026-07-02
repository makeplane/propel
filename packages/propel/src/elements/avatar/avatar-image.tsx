import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { avatarImageVariants } from "./variants";

/** Props for {@link AvatarImage}. */
export type AvatarImageProps = Omit<useRender.ComponentProps<"img">, "className" | "style">;

/**
 * The styled avatar image. Base-UI-agnostic — graft the Base UI `Avatar.Image` load-status behavior
 * in `components` via `<BaseAvatar.Image render={<AvatarImage/>} />`.
 */
export function AvatarImage({ render, ...props }: AvatarImageProps) {
  const defaultProps: useRender.ElementProps<"img"> = { className: avatarImageVariants() };
  return useRender({ defaultTagName: "img", render, props: mergeProps(defaultProps, props) });
}
