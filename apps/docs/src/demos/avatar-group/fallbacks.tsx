import { Avatar } from "@makeplane/propel/components/avatar";
import { AvatarGroup } from "@makeplane/propel/components/avatar-group";

export default function FallbacksDemo() {
  return (
    <AvatarGroup magnitude="sm">
      {/* Photo, when a `src` is available. */}
      <Avatar alt="Ada Lovelace" fallback="AL" src="https://i.pravatar.cc/64?img=47" />
      {/* No image — falls back to initials, tinted from the member's name. */}
      <Avatar alt="Grace Hopper" fallback="GH" />
      {/* No image and no initials — falls back to an anonymous person icon. */}
      <Avatar alt="Unassigned member" />
    </AvatarGroup>
  );
}
