import type * as React from "react";

export type AvatarGroupProps = Omit<React.ComponentProps<"div">, "className">;

// Overlapping stack of avatars. Each child gets a white ring so overlapping
// avatars stay visually separated — mirrors the Figma "Avatar groups" -6px
// overlap with a `border/inverse` ring. Children carry their own size, so
// compose with equally-sized `Avatar`s:
//
//   <AvatarGroup>
//     <Avatar magnitude="sm" src={a} />
//     <Avatar magnitude="sm" src={b} />
//   </AvatarGroup>
export function AvatarGroup({ children, ...props }: AvatarGroupProps) {
  return (
    <div
      className="inline-flex items-center [&>*]:ring [&>*]:ring-inverse [&>*:not(:first-child)]:-ml-1.5"
      {...props}
    >
      {children}
    </div>
  );
}
