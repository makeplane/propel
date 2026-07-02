import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { avatarGroupVariants } from "./variants";

export type AvatarGroupProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The overlapping avatar stack — the styled container only (a single `<div>` with the Figma -6px
 * overlap). Compose `Avatar`s inside it. The shared-`magnitude` behavior is the ready-made
 * `components/avatar-group`, which wraps this in the `AvatarGroupContext` provider.
 */
export function AvatarGroup({ render, ...props }: AvatarGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: avatarGroupVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
