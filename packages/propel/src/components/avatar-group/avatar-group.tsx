import type * as React from "react";

import { type AvatarMagnitude } from "../../ui/avatar";
import {
  AvatarGroup as AvatarGroupRoot,
  type AvatarGroupProps as AvatarGroupRootProps,
} from "../../ui/avatar-group";
import { AvatarGroupContext } from "../avatar/avatar-group-context";

// Figma's "Avatar Groups" component only defines three sizes (Small/Base/Large = 16/20/24px), so
// groups are limited to the matching magnitudes — narrower than a standalone Avatar's full scale.
export type AvatarGroupMagnitude = Extract<AvatarMagnitude, "2xs" | "xs" | "sm">;

export type AvatarGroupProps = AvatarGroupRootProps & {
  /** Shared size for every avatar in the group; an avatar's own `magnitude` overrides it. */
  magnitude: AvatarGroupMagnitude;
  children?: React.ReactNode;
};

/**
 * The ready-made overlapping avatar stack: shares `magnitude` with every `Avatar` inside via
 * context (an avatar's own `magnitude` still wins), composed around the styled `ui/avatar-group`
 * container. Each `Avatar`'s own `border-subtle` is the single ring that separates them.
 */
export function AvatarGroup({ magnitude, children, ...props }: AvatarGroupProps) {
  return (
    <AvatarGroupContext.Provider value={magnitude}>
      <AvatarGroupRoot {...props}>{children}</AvatarGroupRoot>
    </AvatarGroupContext.Provider>
  );
}
