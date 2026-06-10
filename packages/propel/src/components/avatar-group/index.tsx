import type * as React from "react";
import { AvatarGroupContext, type AvatarMagnitude } from "../avatar";

// Figma's "Avatar Groups" component only defines three sizes (Small/Base/Large =
// 16/20/24px), so groups are limited to the matching magnitudes — narrower than a
// standalone Avatar's full scale.
export type AvatarGroupMagnitude = Extract<AvatarMagnitude, "2xs" | "xs" | "sm">;

export type AvatarGroupProps = Omit<React.ComponentProps<"div">, "className" | "style"> & {
  /** Shared size for every avatar in the group; an avatar's own `magnitude` overrides it. */
  magnitude: AvatarGroupMagnitude;
};

// Overlapping stack of avatars — mirrors the Figma "Avatar groups" -6px overlap.
// `-space-x-1.5` handles the overlap (negative margin between siblings) and each
// `Avatar`'s own `border-subtle` is the single ring that separates them, matching
// Figma. `magnitude` flows through context so the whole group stays one size.
// None of these reach into the children directly:
//
//   <AvatarGroup magnitude="sm">
//     <Avatar src={a} />
//     <Avatar src={b} />
//   </AvatarGroup>
export function AvatarGroup({ children, magnitude, ...props }: AvatarGroupProps) {
  return (
    <AvatarGroupContext.Provider value={magnitude}>
      <div className="inline-flex items-center -space-x-1.5" {...props}>
        {children}
      </div>
    </AvatarGroupContext.Provider>
  );
}
