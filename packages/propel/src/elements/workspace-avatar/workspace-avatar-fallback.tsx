import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import {
  type WorkspaceAvatarFallbackVariantProps,
  workspaceAvatarFallbackVariants,
} from "./variants";

/** Props for {@link WorkspaceAvatarFallback}; a styled `<span>` plus a `tone`. */
export type WorkspaceAvatarFallbackProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
> &
  WorkspaceAvatarFallbackVariantProps;

/**
 * The styled workspace initials surface. Base-UI-agnostic — graft the `Avatar.Fallback` behavior in
 * `components` via `<BaseAvatar.Fallback render={<WorkspaceAvatarFallback/>} />`.
 */
export function WorkspaceAvatarFallback({ tone, render, ...props }: WorkspaceAvatarFallbackProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: workspaceAvatarFallbackVariants({ tone }),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
