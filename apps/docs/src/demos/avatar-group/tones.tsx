import { Avatar } from "@makeplane/propel/components/avatar";
import { AvatarGroup } from "@makeplane/propel/components/avatar-group";

export default function TonesDemo() {
  return (
    <AvatarGroup magnitude="sm">
      <Avatar alt="Design" fallback="DS" />
      <Avatar alt="Engineering" fallback="EN" />
      <Avatar alt="Product" fallback="PR" />
      <Avatar alt="Research" fallback="RS" />
      <Avatar alt="Marketing" fallback="MK" />
    </AvatarGroup>
  );
}
