import { Avatar } from "@makeplane/propel/components/avatar";
import { AvatarGroup } from "@makeplane/propel/components/avatar-group";

export default function TonesDemo() {
  return (
    <AvatarGroup magnitude="sm">
      <Avatar alt="Design" fallback="DS" tone="orange" />
      <Avatar alt="Engineering" fallback="EN" tone="indigo" />
      <Avatar alt="Product" fallback="PR" tone="emerald" />
      <Avatar alt="Research" fallback="RS" tone="purple" />
      <Avatar alt="Marketing" fallback="MK" tone="pink" />
    </AvatarGroup>
  );
}
