import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { AvatarGroupContext, type AvatarMagnitude } from "../../ui/avatar";
import { avatarGroupVariants } from "./variants";

// Figma's "Avatar Groups" component only defines three sizes (Small/Base/Large =
// 16/20/24px), so groups are limited to the matching magnitudes — narrower than a
// standalone Avatar's full scale.
export type AvatarGroupMagnitude = Extract<AvatarMagnitude, "2xs" | "xs" | "sm">;

export type AvatarGroupProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> & {
  /** Shared size for every avatar in the group; an avatar's own `magnitude` overrides it. */
  magnitude: AvatarGroupMagnitude;
};

// Overlapping stack of avatars — mirrors the Figma "Avatar groups" -6px overlap.
// `-space-x-1.5` handles the overlap (negative margin between siblings) and each
// `Avatar`'s own `border-subtle` is the single ring that separates them, matching
// Figma. `magnitude` flows through context so the whole group stays one size.
export function AvatarGroup({ magnitude, render, ...props }: AvatarGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: avatarGroupVariants() };
  return (
    <AvatarGroupContext.Provider value={magnitude}>
      {useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) })}
    </AvatarGroupContext.Provider>
  );
}
