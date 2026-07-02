import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { workspaceAvatarImageVariants } from "./variants";

/** Props for {@link WorkspaceAvatarImage}; a styled `<img>`. */
export type WorkspaceAvatarImageProps = Omit<
  useRender.ComponentProps<"img">,
  "className" | "style"
>;

/**
 * The styled workspace logo image, cropped to the square frame. Base-UI-agnostic — graft the
 * `Avatar.Image` behavior in `components` via `<BaseAvatar.Image render={<WorkspaceAvatarImage/>}
 * />`.
 */
export function WorkspaceAvatarImage({ render, ...props }: WorkspaceAvatarImageProps) {
  const defaultProps: useRender.ElementProps<"img"> = {
    className: workspaceAvatarImageVariants(),
  };
  return useRender({ defaultTagName: "img", render, props: mergeProps(defaultProps, props) });
}
