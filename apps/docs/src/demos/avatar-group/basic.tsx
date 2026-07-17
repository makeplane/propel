import { Avatar } from "@makeplane/propel/components/avatar";
import { AvatarGroup } from "@makeplane/propel/components/avatar-group";

export default function BasicDemo() {
  return (
    <AvatarGroup magnitude="sm">
      <Avatar alt="Ada Lovelace" fallback="AL" src="https://i.pravatar.cc/64?img=47" />
      <Avatar alt="Grace Hopper" fallback="GH" src="https://i.pravatar.cc/64?img=32" />
      <Avatar alt="Linus Torvalds" fallback="LT" />
      <Avatar alt="4 more members" fallback="+4" />
    </AvatarGroup>
  );
}
