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

// Overlapping stack of avatars — mirrors the Figma "Avatar groups" -6px overlap
// with a white `border/inverse` ring separating them. `-space-x-1.5` handles the
// overlap (negative margin between siblings); `--avatar-ring` is an inherited CSS
// var that tells each `Avatar` to draw its own 1px separator ring; and `magnitude`
// flows through context so the whole group stays one size. None of these reach
// into the children directly:
//
//   <AvatarGroup magnitude="sm">
//     <Avatar src={a} />
//     <Avatar src={b} />
//   </AvatarGroup>
export function AvatarGroup({ children, magnitude, ...props }: AvatarGroupProps) {
  return (
    <AvatarGroupContext.Provider value={magnitude}>
      <div className="inline-flex items-center -space-x-1.5 [--avatar-ring:1px]" {...props}>
        {children}
      </div>
    </AvatarGroupContext.Provider>
  );
}
