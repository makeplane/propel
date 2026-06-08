import type * as React from "react";

export type AvatarGroupProps = Omit<React.ComponentProps<"div">, "className">;

// Overlapping stack of avatars — mirrors the Figma "Avatar groups" -6px overlap
// with a white `border/inverse` ring separating them. `-space-x-1.5` handles the
// overlap (negative margin between siblings) and the `*:` child variant rings each
// avatar, so there are no arbitrary `[&>*]` selectors. Children carry their own
// size, so compose with equally-sized `Avatar`s:
//
//   <AvatarGroup>
//     <Avatar magnitude="sm" src={a} />
//     <Avatar magnitude="sm" src={b} />
//   </AvatarGroup>
export function AvatarGroup({ children, ...props }: AvatarGroupProps) {
  return (
    <div className="inline-flex items-center -space-x-1.5 *:ring *:ring-inverse" {...props}>
      {children}
    </div>
  );
}
